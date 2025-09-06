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
} from "./resolvers/Project";
import { createBoard, deleteBoard } from "./resolvers/Boards";
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
import { addMemberToTeam, addTeamToProject, createTeam, getTeamsForProject } from "./resolvers/teams";
import { createComment, getCommentsByTaskId } from "./resolvers/comments";
import { createUser, getCurrentUser, getCurrentUserTeams, getUserByEmail, updateUser, uploadImageToCloudinary } from "./resolvers/user";

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
  },
  Mutation: {
    createUser,
    uploadImageToCloudinary,
    updateUser,
    createProject,
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
