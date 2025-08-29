"use client";

import { useSyncBoardColumns } from "@/lib/hooks/useColumns";
import { createContext, useContext, useEffect, useRef, useState } from "react";

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
    pendingColumnChangesRef: new Set<string>(),
  });

  const syncBoardColumns = useSyncBoardColumns();

  useEffect(() => {
    if (initialColumns && initialColumns.length > 0) {
      const hasPendingChanges = 
        pendingUpdatesRef.current.pendingNewTasksRef.size > 0 ||
        pendingUpdatesRef.current.pendingUpdatedTasksRef.size > 0 ||
        pendingUpdatesRef.current.pendingColumnChangesRef.size > 0;
      
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

  const updateTask = (taskId: string, updates: Partial<Task>) => {
    const task = tasksMap.get(taskId);
    if (!task) return;

    const updatedTask = {
      ...task,
      ...updates,
      updatedAt: new Date().toISOString(),
    };
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
  };

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
          tasks: col.tasks.filter((t) => t.id !== taskId),
          taskIds: col.taskIds.filter((id) => id !== taskId),
          updatedAt: now,
        };
      });

      return columnsWithTaskRemoved.map((col) => {
        if (col.id !== toColumnId) return col;

        const newTasks = [...col.tasks];
        const newTaskIds = [...col.taskIds];

        newTasks.splice(newIndex, 0, task);
        newTaskIds.splice(newIndex, 0, taskId);

        return {
          ...col,
          tasks: newTasks,
          taskIds: newTaskIds,
          updatedAt: now,
        };
      });
    });

    pendingUpdatesRef.current.pendingColumnChangesRef.add(fromColumnId);
    pendingUpdatesRef.current.pendingColumnChangesRef.add(toColumnId);
  };

  const syncChanges = async () => {
    if (
      pendingUpdatesRef.current.pendingNewTasksRef.size === 0 &&
      pendingUpdatesRef.current.pendingUpdatedTasksRef.size === 0 &&
      pendingUpdatesRef.current.pendingColumnChangesRef.size === 0
    )
      return;

    const currentColumns = columnsRef.current;

    const syncData = {
      newTasks: Array.from(pendingUpdatesRef.current.pendingNewTasksRef.values()).map((task) => {
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
      columnChanges: Array.from(pendingUpdatesRef.current.pendingColumnChangesRef)
        .map((columnId) => {
          const column = currentColumns.find((col) => col.id === columnId);
          if (!column) return null;

          return {
            id: columnId,
            taskIds: column.taskIds.filter((id) => !id.startsWith("tmp_")),
          };
        })
        .filter(Boolean),
    };

    pendingUpdatesRef.current.pendingNewTasksRef.clear();
    pendingUpdatesRef.current.pendingUpdatedTasksRef.clear();
    pendingUpdatesRef.current.pendingColumnChangesRef.clear();

    syncBoardColumns.mutate(syncData as any);
  };

  useEffect(() => {
    const timeoutId = setTimeout(syncChanges, 2000);
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
      }}
    >
      {children}
    </ColumnsContext.Provider>
  );
}

export function useColumnsContext() {
  return useContext(ColumnsContext);
}