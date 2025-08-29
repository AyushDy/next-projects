import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation Mutation($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password) {
      name
      email
      id
    }
  }
`;

export const CREATE_PROJECT = gql`
  mutation CreateProject(
    $name: String!
    $slug: String!
    $visibility: ProjectVisibility!
    $createBoard: Boolean
    $createTeam: Boolean
    $description: String
  ) {
    createProject(
      name: $name
      slug: $slug
      visibility: $visibility
      createBoard: $createBoard
      createTeam: $createTeam
      description: $description
    )
  }
`;

export const CREATE_BOARD = gql`
  mutation CreateBoard(
    $name: String!
    $projectId: String!
    $description: String
    $teamId: String
  ) {
    createBoard(
      name: $name
      projectId: $projectId
      description: $description
      teamId: $teamId
    )
  }
`;

export const DELETE_BOARD = gql`
  mutation DeleteBoard($boardId: String!) {
    deleteBoard(boardId: $boardId)
  }
`;

export const GET_BOARD_COLUMNS = gql`
  query GetBoardColumns($boardId: String!) {
    getBoardColumns(boardId: $boardId) {
      id
      name
      order
      taskIds
      tasks {
        id
        title
        description
        status
        priority
        dueDate
        createdBy {
          id
          name
          email
          image
        }
        assignees {
          id
          role
          assigneeUser {
            id
            name
            email
            image
          }
          assigneeTeam {
            id
            name
            image
          }
        }
      }
    }
  }
`;

export const GET_USER_PROJECTS = gql`
  query GetUserProjects($userId: String!) {
    getUserProjects(userId: $userId) {
      id
      name
      slug
      description
      visibility
      owner {
        id
        name
        email
        image
      }
    }
  }
`;

export const GET_PROJECT_BY_SLUG = gql`
  query GetProjectBySlug($slug: String!) {
    getProjectBySlug(slug: $slug) {
      id
      name
    }
  }
`;

export const GET_PROJECT_BOARDS_BY_SLUG = gql`
  query GetProjectBoardsBySlug($slug: String!) {
    getProjectBoardsBySlug(slug: $slug) {
      id
      name
      description
      columns {
        id
        name
      }
      teams {
        team {
          name
          image
          teamLead {
            name
            id
          }
        }
      }
      isArchived
      isDefault
    }
  }
`;

export const DELETE_PROJECT = gql`
  mutation DeleteProject($slug: String!) {
    deleteProject(slug: $slug)
  }
`;

export const CREATE_TASK = gql`
  mutation CreateTask($title: String!, $columnId: String!) {
    createTask(title: $title, columnId: $columnId)
  }
`;

export const MOVE_TASK = gql`
  mutation moveTask(
    $taskId: String!
    $fromColumnId: String!
    $toColumnId: String!
    $newIndex: Int!
  ) {
    moveTask(
      taskId: $taskId
      fromColumnId: $fromColumnId
      toColumnId: $toColumnId
      newIndex: $newIndex
    )
  }
`;

export const SYNC_BOARD_COLUMNS = gql`
  mutation SyncBoardColumns(
    $newTasks: [TaskInput]!
    $updatedTasks: [UpdatedTaskInput]!
    $columnChanges: [ColumnChangesInput]!
  ) {
    syncBoardColumns(
      newTasks: $newTasks
      updatedTasks: $updatedTasks
      columnChanges: $columnChanges
    )
  }
`;

export const ADD_BOARD_COLUMN = gql`
  mutation AddBoardColumn($boardId: String!, $name: String!, $order: Int!) {
    addBoardColumn(boardId: $boardId, name: $name, order: $order)
  }
`;

export const IS_SLUG_UNIQUE = gql`
  query Query($slug: String!) {
    isUniqueProjectSlug(slug: $slug)
  }
`;
