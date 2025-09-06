"use client";

import { useSyncBoardColumns, useReorderColumns } from "@/lib/hooks/useColumns";
import {
  createContext,
  useContext,
  useEffect,
  useRef,
  useState,
  useCallback,
} from "react";

export type Task = {
  id: string;
  title: string;
  description?: string;
  status: "TODO" | "IN_PROGRESS" | "REVIEW" | "DONE" | "BLOCKED";
  priority?: number;
  dueDate?: string;
  createdAt: string;
  updatedAt: string;
  columnId: string;
  createdBy: {
    id: string;
    name?: string;
    image?: string;
  };
  assignees: Array<{
    id: string;
    role?: string;
    user?: {
      id: string;
      name?: string;
      image?: string;
    };
    team?: {
      id: string;
      name: string;
      image: string;
    };
  }>;
};

export type Column = {
  id: string;
  name: string;
  order: number;
  createdAt: string;
  updatedAt: string;
  taskIds: string[];
  tasks: Array<Task>;
};

export type ColumnsContextType = {
  columns: Array<Column>;
  setColumns: (columns: Array<Column>) => void;
  moveTask: (
    taskId: string,
    toColumnId: string,
    fromColumnId: string,
    newIndex: number
  ) => void;
  addTask: (task: Task, columnId: string, index?: number) => void;
  updateTask: (taskId: string, updates: Partial<Task>) => void;
  tasksMap: Map<string, Task>;
  isSyncing: boolean;
  deleteTask: (taskId: string) => void;
  moveColumn: (fromIndex: number, toIndex: number) => void;
};

const ColumnsContext = createContext<ColumnsContextType | null>(null);

export default function ColumnsContextProvider({
  children,
  initialColumns = [],
}: {
  children: React.ReactNode;
  initialColumns?: Array<Column>;
}) {
  const [columns, setColumns] = useState<Array<Column>>(initialColumns);
  const columnsRef = useRef<Array<Column>>(initialColumns);
  const [tasksMap, setTasksMap] = useState<Map<string, Task>>(new Map());
  const pendingUpdatesRef = useRef({
    pendingNewTasksRef: new Map<string, Task>(),
    pendingUpdatedTasksRef: new Set<string>(),
    deletedTasksRef: new Set<string>(),
    pendingColumnChangesRef: new Set<string>(),
  });

  const syncBoardColumns = useSyncBoardColumns();
  const reorderColumns = useReorderColumns();

  useEffect(() => {
    if (initialColumns && initialColumns.length > 0) {
      const hasPendingChanges =
        pendingUpdatesRef.current.pendingNewTasksRef.size > 0 ||
        pendingUpdatesRef.current.pendingUpdatedTasksRef.size > 0 ||
        pendingUpdatesRef.current.pendingColumnChangesRef.size > 0 ||
        pendingUpdatesRef.current.deletedTasksRef.size > 0;

      if (!hasPendingChanges) {
        setColumns(initialColumns);
      }
    }
  }, [initialColumns]);

  useEffect(() => {
    columnsRef.current = columns;
    setTasksMap((prev) => {
      const newTasksMap = new Map(prev);
      columns.forEach((col) => {
        col.tasks.forEach((task) => {
          newTasksMap.set(task.id, task);
        });
      });
      return newTasksMap;
    });
  }, [columns]);

  const updateTask = useCallback(
    (taskId: string, updates: Partial<Task>) => {
      const task = tasksMap.get(taskId);
      if (!task) return;

      const updatedTask = {
        ...task,
        ...updates,
        updatedAt: new Date().toISOString(),
      };

      setTasksMap((prev) => new Map(prev).set(taskId, updatedTask));

      if (taskId.startsWith("tmp_")) {
        pendingUpdatesRef.current.pendingNewTasksRef.set(taskId, updatedTask);
      } else {
        pendingUpdatesRef.current.pendingUpdatedTasksRef.add(taskId);
      }

      setColumns((prev) =>
        prev.map((col) => ({
          ...col,
          tasks: col.tasks.map((t) => (t.id === taskId ? updatedTask : t)),
        }))
      );
    },
    [tasksMap]
  );

  const addTask = (task: Task, columnId: string, index?: number) => {
    setTasksMap((prev) => new Map(prev).set(task.id, task));
    pendingUpdatesRef.current.pendingNewTasksRef.set(task.id, task);

    setColumns((prev) =>
      prev.map((col) => {
        if (col.id !== columnId) return col;

        const newTasks = [...col.tasks];
        const newTaskIds = [...col.taskIds];

        const insertIndex = index !== undefined ? index : col.tasks.length;
        newTasks.splice(insertIndex, 0, task);
        newTaskIds.splice(insertIndex, 0, task.id);

        return {
          ...col,
          tasks: newTasks,
          taskIds: newTaskIds,
        };
      })
    );
    pendingUpdatesRef.current.pendingColumnChangesRef.add(columnId);
  };

  function deleteTask(taskId: string) {
    const task = tasksMap.get(taskId);
    if (!task) return;

    if (!taskId.startsWith("tmp_")) {
      pendingUpdatesRef.current.deletedTasksRef.add(taskId);
    }

    setTasksMap((prev) => {
      const newMap = new Map(prev);
      newMap.delete(taskId);
      return newMap;
    });

    pendingUpdatesRef.current.pendingNewTasksRef.delete(taskId);
    pendingUpdatesRef.current.pendingUpdatedTasksRef.delete(taskId);

    setColumns((prev) =>
      prev.map((col) => {
        if (!col.tasks.some((t) => t.id === taskId)) return col;
        pendingUpdatesRef.current.pendingColumnChangesRef.add(col.id);

        return {
          ...col,
          tasks: col.tasks.filter((t) => t.id !== taskId),
          taskIds: col.taskIds.filter((id) => id !== taskId),
        };
      })
    );
  }

  const moveTask = (
    taskId: string,
    toColumnId: string,
    fromColumnId: string,
    newIndex: number
  ) => {
    const task = tasksMap.get(taskId);
    if (!task) return;

    task.columnId = toColumnId;
    setTasksMap((prev) => new Map(prev).set(taskId, task));
    pendingUpdatesRef.current.pendingUpdatedTasksRef.add(taskId);

    setColumns((prev) => {
      const now = new Date().toISOString();

      const columnsWithTaskRemoved = prev.map((col) => {
        if (col.id !== fromColumnId) return col;

        return {
          ...col,
          taskIds: col.taskIds.filter((id) => id !== taskId),
          updatedAt: now,
        };
      });

      return columnsWithTaskRemoved.map((col) => {
        if (col.id !== toColumnId) return col;

        const newTaskIds = [...col.taskIds];
        newTaskIds.splice(newIndex, 0, taskId);


        return {
          ...col,
          taskIds: newTaskIds,
          updatedAt: now,
        };
      });
    });

    pendingUpdatesRef.current.pendingColumnChangesRef.add(fromColumnId);
    pendingUpdatesRef.current.pendingColumnChangesRef.add(toColumnId);
  };

  const moveColumn = (fromIndex: number, toIndex: number) => {
    setColumns((prev) => {
      const newColumns = [...prev];
      const [movedColumn] = newColumns.splice(fromIndex, 1);
      newColumns.splice(toIndex, 0, movedColumn);

      const updatedColumns = newColumns.map((col, index) => ({
        ...col,
        order: index,
        updatedAt: new Date().toISOString(),
      }));

      const columnOrders = updatedColumns.map((col) => ({
        id: col.id,
        order: col.order,
      }));

      reorderColumns.mutate({ columnOrders });

      return updatedColumns;
    });
  };

  const syncChanges = async () => {
    if (
      pendingUpdatesRef.current.pendingNewTasksRef.size === 0 &&
      pendingUpdatesRef.current.pendingUpdatedTasksRef.size === 0 &&
      pendingUpdatesRef.current.pendingColumnChangesRef.size === 0 &&
      pendingUpdatesRef.current.deletedTasksRef.size === 0
    )
      return;

    const currentColumns = columnsRef.current;

    const syncData = {
      newTasks: Array.from(
        pendingUpdatesRef.current.pendingNewTasksRef.values()
      ).map((task) => {
        return {
          tempId: task.id,
          title: task.title,
          description: task.description || "",
          status: task.status,
          priority: task.priority || 0,
          dueDate: task.dueDate || null,
          columnId: task.columnId,
        };
      }),
      updatedTasks: Array.from(pendingUpdatesRef.current.pendingUpdatedTasksRef)
        .map((taskId) => {
          const task = tasksMap.get(taskId);
          if (!task) return null;

          return {
            id: taskId,
            updates: {
              title: task.title,
              description: task.description || "",
              status: task.status,
              priority: task.priority || 0,
              dueDate: task.dueDate || null,
              columnId: task.columnId,
            },
          };
        })
        .filter(Boolean),
      columnChanges: Array.from(
        pendingUpdatesRef.current.pendingColumnChangesRef
      )
        .map((columnId) => {
          const column = currentColumns.find((col) => col.id === columnId);
          if (!column) return null;

          return {
            id: columnId,
            order: column.order,
            taskIds: column.taskIds.filter((id) => !id.startsWith("tmp_")),
          };
        })
        .filter(Boolean),
      deletedTasks: Array.from(pendingUpdatesRef.current.deletedTasksRef)
        .map((taskId) => {
          let task = null;
          for (const column of currentColumns) {
            task = column.tasks.find((t) => t.id === taskId);
            if (task) break;
          }

          if (!task) return null;

          return {
            id: taskId,
            columnId: task.columnId,
          };
        })
        .filter(Boolean),
    };

    pendingUpdatesRef.current.pendingNewTasksRef.clear();
    pendingUpdatesRef.current.pendingUpdatedTasksRef.clear();
    pendingUpdatesRef.current.pendingColumnChangesRef.clear();
    pendingUpdatesRef.current.deletedTasksRef.clear();

    syncBoardColumns.mutate(syncData as any);
  };

  useEffect(() => {
    const hasPendingChanges =
      pendingUpdatesRef.current.pendingNewTasksRef.size > 0 ||
      pendingUpdatesRef.current.pendingUpdatedTasksRef.size > 0 ||
      pendingUpdatesRef.current.pendingColumnChangesRef.size > 0 ||
      pendingUpdatesRef.current.deletedTasksRef.size > 0;

    if (!hasPendingChanges) return;

    const timeoutId = setTimeout(syncChanges, 3000);
    return () => clearTimeout(timeoutId);
  }, [columns]);

  return (
    <ColumnsContext.Provider
      value={{
        columns,
        setColumns,
        moveTask,
        addTask,
        updateTask,
        tasksMap,
        isSyncing: syncBoardColumns.isPending,
        deleteTask,
        moveColumn,
      }}
    >
      {children}
    </ColumnsContext.Provider>
  );
}

export function useColumnsContext() {
  return useContext(ColumnsContext);
}