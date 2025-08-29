import gql from "graphql-tag";

export const typeDefs = gql`
  type Query {
    getUserProjects(userId: String!): [Project!]
    getProjectBySlug(slug: String!): Project
    getProjectBoardsBySlug(slug: String!): [Board!]
    getBoardColumns(boardId: String!): [BoardColumn!]
    isUniqueProjectSlug(slug: String!): Boolean!
  }

  type Mutation {
    createUser(
      name: String!
      email: String!
      password: String!
      image: String
      bio: String
    ): User
    login(email: String!, password: String!): Boolean
    createProject(
      name: String!
      slug: String
      description: String
      visibility: ProjectVisibility!
      createBoard: Boolean
      createTeam: Boolean
    ): Boolean
    createBoard(
      name: String!
      description: String
      projectId: String!
      teamId: String
    ): Boolean
    createTask(title: String!, description: String, columnId: String!): Boolean
    moveTask(
      taskId: String!
      fromColumnId: String!
      toColumnId: String!
      newIndex: Int!
    ): Boolean
    deleteBoard(boardId: String!): Boolean
    deleteProject(slug: String!): Boolean
    syncBoardColumns(
      newTasks: [TaskInput]!
      updatedTasks: [UpdatedTaskInput]!
      columnChanges: [ColumnChangesInput]!
    ): Boolean
    addBoardColumn(boardId: String!, order: Int!, name: String! ): Boolean
  }

  input TaskInput {
    tempId: String!
    title: String!
    description: String
    status: TaskStatus!
    priority: Int
    dueDate: String
    columnId: String!
  }

  input UpdateTaskInput {
    title: String!
    description: String
    status: TaskStatus!
    priority: Int
    dueDate: String
    columnId: String!
  }

  input UpdatedTaskInput {
    id: String!
    updates: UpdateTaskInput!
  }

  input ColumnChangesInput {
    id: String!
    taskIds: [String!]!
  }

  enum TeamMemberRole {
    MEMBER
    LEAD
    ADMIN
  }

  enum TaskStatus {
    TODO
    IN_PROGRESS
    REVIEW
    DONE
    BLOCKED
  }

  enum ProjectVisibility {
    PUBLIC
    PRIVATE
  }

  type User {
    id: ID!
    name: String
    email: String
    image: String
    bio: String
    createdAt: String
    updatedAt: String
    teams: [TeamMember!]
    ownerProjects: [Project!]
    ledTeams: [Team!]
    createdTasks: [Task!]
    projects: [ProjectMember!]
  }

  type Team {
    id: ID!
    name: String!
    image: String!
    description: String
    teamLead: User!
    members: [TeamMember!]
    projects: [ProjectTeam!]
    boards: [BoardTeam!]
    createdAt: String
    updatedAt: String
  }

  type TeamMember {
    id: ID!
    role: TeamMemberRole!
    joinedAt: String
    user: User!
    team: Team!
  }

  type Project {
    id: ID!
    name: String!
    slug: String!
    description: String
    visibility: ProjectVisibility!
    owner: User!
    teams: [ProjectTeam!]
    members: [ProjectMember!]
    boards: [Board!]
    createdAt: String
    updatedAt: String
  }

  type ProjectMember {
    id: ID!
    user: User!
    project: Project!
    role: String!
    joinedAt: String
  }

  type ProjectTeam {
    id: ID!
    role: String
    addedAt: String
    team: Team!
    project: Project!
  }

  type Board {
    id: ID!
    name: String!
    description: String
    project: Project!
    columns: [BoardColumn!]
    teams: [BoardTeam!]
    isArchived: Boolean
    isDefault: Boolean
    createdAt: String
    updatedAt: String
  }

  type BoardColumn {
    id: ID!
    name: String!
    order: Int
    board: Board!
    tasks: [Task!]
    taskIds: [String!]
    createdAt: String
    updatedAt: String
  }

  type BoardTeam {
    id: ID!
    board: Board!
    project: Project!
    team: Team!
    createdAt: String
    updatedAt: String
  }

  type Task {
    id: ID!
    title: String!
    description: String
    status: TaskStatus!
    priority: Int
    dueDate: String
    column: BoardColumn!
    createdBy: User!
    assignees: [TaskAssignee!]
    createdAt: String
    updatedAt: String
  }

  type TaskAssignee {
    id: ID!
    role: String
    task: Task!
    assigneeUser: User
    assigneeTeam: Team
    createdAt: String
  }

  type Account {
    id: ID!
    user: User!
    type: String!
    provider: String!
    providerAccountId: String!
  }
`;
