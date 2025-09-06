import gql from "graphql-tag";

export const CREATE_USER = gql`
  mutation CreateUser($name: String!, $email: String!, $password: String!) {
    createUser(name: $name, email: $email, password: $password)
  }
`;

export const GET_CURRENT_USER = gql`
  query GetCurrentUser {
    getCurrentUser {
      id
      name
      email
      image
      bio
      createdAt
      updatedAt
    }
  }
`;

export const GET_CURRENT_USER_TEAMS = gql`
  query GetCurrentUserTeams {
    getCurrentUserTeams {
      id
      name
      image
      description
      teamLead {
        id
        name
        email
        image
      }
      members {
        id
        role
        user {
          id
          name
          email
          image
        }
      }
      projects {
        id
        project {
          id
          name
          slug
        }
      }
    }
  }
`;

export const UPDATE_USER = gql`
  mutation UpdateUser(
    $name: String
    $email: String
    $bio: String
    $image: String
  ) {
    updateUser(name: $name, email: $email, bio: $bio, image: $image)
  }
`;

export const GET_USER_BY_EMAIL = gql`
  query GetUserByEmail($email: String!) {
    getUserByEmail(email: $email) {
      id
      email
      image
      name
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
  query GetUserProjects {
    getUserProjects {
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
    $deletedTasks: [DeletedTaskInput]!
  ) {
    syncBoardColumns(
      newTasks: $newTasks
      updatedTasks: $updatedTasks
      columnChanges: $columnChanges
      deletedTasks: $deletedTasks
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

export const GET_TASK_BY_ID = gql`
  query GetTaskById($id: String!) {
    getTaskById(id: $id) {
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
      createdAt
      updatedAt
    }
  }
`;

export const UPDATE_TASK = gql`
  mutation UpdateTask($taskId: String!, $updates: UpdateTaskInput!) {
    updateTask(taskId: $taskId, updates: $updates)
  }
`;

export const GET_TEAMS_BY_PROJECT = gql`
  query GetTeamsForProject($slug: String!) {
    getTeamsForProject(slug: $slug) {
      id
      name
      image
      description
      teamLead {
        id
        name
        email
        image
      }
      members {
        id
        user {
          id
          name
          email
          image
        }
      }
      createdAt
      updatedAt
    }
  }
`;

export const REORDER_COLUMNS = gql`
  mutation ReorderColumns($columnOrders: [ColumnOrderInput!]!) {
    reorderColumns(columnOrders: $columnOrders)
  }
`;

export const DELETE_COLUMN = gql`
  mutation DeleteColumn($columnId: String!) {
    deleteColumn(columnId: $columnId)
  }
`;

export const GET_COMMENTS_BY_TASK_ID = gql`
  query GetCommentsByTaskId($taskId: String!) {
    getCommentsByTaskId(taskId: $taskId) {
      id
      content
      createdAt
      updatedAt
      createdBy {
        id
        name
        email
        image
      }
    }
  }
`;

export const CREATE_COMMENT = gql`
  mutation CreateComment($taskId: String!, $content: String!) {
    createComment(taskId: $taskId, content: $content)
  }
`;

export const CREATE_TEAM = gql`
  mutation CreateTeam($name: String!, $description: String, $image: String) {
    createTeam(name: $name, description: $description, image: $image)
  }
`;

export const ADD_MEMBER_TO_TEAM = gql`
  mutation AddMemberToTeam($teamId: String!, $userId: String!) {
    addMemberToTeam(teamId: $teamId, userId: $userId)
  }
`;

export const ADD_TEAM_TO_PROJECT = gql`
  mutation AddTeamToProject($teamId: String!, $projectSlug: String!) {
    addTeamToProject(teamId: $teamId, projectSlug: $projectSlug)
  }
`;
