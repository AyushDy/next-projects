import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { typeDefs as baseTypeDefs } from "./typedefs";
import {
  createProject,
  deleteProject,
  getProjectBoardsBySlug,
  getProjectBySlug,
  getUserProjects,
  isUniqueProjectSlug,
  updateProject,
} from "./resolvers/Project";
import {
  addTeamToBoard,
  createBoard,
  deleteBoard,
  getBoardById,
  updateBoard,
} from "./resolvers/Boards";
import {
  addBoardColumn,
  deleteColumn,
  getBoardColumns,
  reorderColumns,
  syncBoardColumns,
} from "./resolvers/Columns";
import {
  createTask,
  getTaskById,
  moveTask,
  updateTask,
} from "./resolvers/tasks";
import {
  addMemberToTeam,
  addTeamToProject,
  createTeam,
  deleteTeam,
  getTeamById,
  getTeamsForProject,
} from "./resolvers/teams";
import { createComment, getCommentsByTaskId } from "./resolvers/comments";
import {
  createUser,
  getCurrentUser,
  getCurrentUserTeams,
  getUserByEmail,
  updateProfileImage,
  updateUser,
} from "./resolvers/user";

const typeDefs = baseTypeDefs;
const resolvers = {
  Query: {
    getCurrentUser,
    getUserProjects,
    getProjectBySlug,
    getProjectBoardsBySlug,
    getBoardColumns,
    isUniqueProjectSlug,
    getTaskById,
    getTeamsForProject,
    getCommentsByTaskId,
    getUserByEmail,
    getCurrentUserTeams,
    getTeamById,
    getBoardById,
  },
  Mutation: {
    createUser,
    updateProfileImage,
    updateUser,
    createProject,
    updateProject,
    createBoard,
    createTask,
    deleteBoard,
    deleteProject,
    moveTask,
    addBoardColumn,
    syncBoardColumns,
    updateTask,
    reorderColumns,
    deleteColumn,
    createComment,
    createTeam,
    addMemberToTeam,
    addTeamToProject,
    addTeamToBoard,
    updateBoard,
    deleteTeam,
  },
};

const server = new ApolloServer({
  typeDefs,
  resolvers,
});

const handler = startServerAndCreateNextHandler(server, {
  context: async (req: NextRequest) => ({ req }),
});

export async function GET(request: NextRequest) {
  return handler(request);
}

export async function POST(request: NextRequest) {
  return handler(request);
}
