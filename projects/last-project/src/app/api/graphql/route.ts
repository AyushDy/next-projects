import { startServerAndCreateNextHandler } from "@as-integrations/next";
import { ApolloServer } from "@apollo/server";
import { NextRequest } from "next/server";
import { gql } from "graphql-tag";
import {
  createUser,
  deleteUser,
  getAllUsers,
  loginUser,
  logoutUser,
  updateUserProfile,
  updateUserRole,
} from "./resolvers/user";
import { getUserFromCookies } from "@/lib/helper";
import addProduct, {
  createSale,
  editProduct,
  getAllProducts,
  getAllSales,
  getProductById,
  restockProduct,
} from "./resolvers/products";
import { createSupplier, getAllSuppliers } from "./resolvers/suppliers";

const typeDefs = gql`
  type Query {
    loginUser(userCred: String!, password: String!): Boolean
    currentUser: User
    getProductById(id: String): Product
    getAllUsers(role: String): [User]
    getAllProducts: [Product]
    getAllSales: [Sale]
    getAllSuppliers: [Supplier]
  }
  type Mutation {
    createUser(
      name: String!
      username: String!
      email: String!
      password: String!
      avatar: String
      role: RoleType!
    ): User
    createSupplier(
      name: String!
      email: String!
      phone: String
      address: String
    ): Boolean
    updateUserRole(userId: String!, role: String!): Boolean
    updateUserProfile(
      userId: String!
      name: String
      email: String
      avatar: String
      username: String
    ): Boolean
    addProduct(
      title: String!
      description: String!
      price: Float!
      category: String!
      stock: Int!
      imageUrl: String!
      supplierId: String!
    ): Product
    createSale(productId: String!, quantity: Int!): Boolean
    logoutUser: Boolean
    deleteUser(userId: String!): Boolean
    restockProduct(id: String!, quantity: Int!): Boolean
    editProduct(
      id: String!
      title: String
      description: String
      price: Float
      category: String
      stock: Int
      imageUrl: String
      supplierId: String
    ): Boolean
  }

  type Product {
    id: String
    title: String
    description: String
    price: Float
    category: ProductCategory
    stock: Int
    imageUrl: String
    sales: [Sale]
    supplier: Supplier
  }

  type User {
    id: String
    name: String
    username: String
    email: String
    avatar: String
    role: String
  }

  type Supplier {
    id: String
    name: String
    email: String
    phone: String
    address: String
  }

  type Sale {
    id: String
    productId: String
    quantity: Int
    createdAt: String
  }

  type StockLog {
    id: String!
    product: Product
    productId: String
    change: Int
    reason: String
    user: User
    userId: String
    createdAt: String
  }

  type ProductInput {
    title: String
    description: String
    price: Float
    category: ProductCategory
    stock: Int
    imageUrl: String
    supplierId: String
  }

  enum RoleType {
    admin
    staff
    manager
  }

  enum ProductCategory {
    electronics
    beauty
    food
    accessories
    clothing
    furniture
    decor
    others
  }
`;

const resolvers = {
  Query: {
    loginUser,
    currentUser: getUserFromCookies,
    getAllUsers,
    getAllProducts,
    getProductById,
    getAllSales,
    getAllSuppliers,
  },
  Mutation: {
    createUser,
    createSupplier,
    updateUserRole,
    updateUserProfile,
    addProduct,
    createSale,
    logoutUser,
    deleteUser,
    restockProduct,
    editProduct,
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
