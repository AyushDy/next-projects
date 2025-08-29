import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { typeDefs as baseTypeDefs } from "./typedefs";
import {  createProject, deleteProject, getProjectBoardsBySlug, getProjectBySlug, getUserProjects, isUniqueProjectSlug } from "./resolvers/Project";
import { createBoard, deleteBoard,  } from "./resolvers/Boards";
import { addBoardColumn, getBoardColumns, syncBoardColumns } from "./resolvers/Columns";
import { createTask, moveTask } from "./resolvers/tasks";

const typeDefs = baseTypeDefs
const resolvers = {
  Query: {
    getUserProjects,
    getProjectBySlug,
    getProjectBoardsBySlug,
    getBoardColumns,
    isUniqueProjectSlug,
  },
  Mutation: {
    createProject,
    createBoard,
    createTask,
    deleteBoard,
    deleteProject,
    moveTask,
    addBoardColumn,
    syncBoardColumns,
  }
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
