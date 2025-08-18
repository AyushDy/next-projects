import { gql } from "graphql-request";

export const LOGIN_USER = gql`
  query Query($userCred: String!, $password: String!) {
    loginUser(userCred: $userCred, password: $password)
  }
`;

export const CREATE_USER = gql`
  mutation CreateUser(
    $avatar: String
    $role: RoleType!
    $password: String!
    $email: String!
    $username: String!
    $name: String!
  ) {
    createUser(
      avatar: $avatar
      role: $role
      password: $password
      email: $email
      username: $username
      name: $name
    ) {
      id
      name
      username
      email
      avatar
      role
    }
  }
`;

export const CREATE_SUPPLIER = gql`
  mutation CreateSupplier(
    $name: String!
    $email: String!
    $phone: String
    $address: String
  ) {
    createSupplier(name: $name, email: $email, phone: $phone, address: $address)
  }
`;

export const LOG_OUT = gql`
  mutation LogoutUser {
    logoutUser
  }
`;

export const DELETE_USER = gql`
  mutation DeleteUser($userId: String!) {
    deleteUser(userId: $userId)
  }
`;

export const GET_ALL_USERS = gql`
  query GetAllUsers($role: String) {
    getAllUsers(role: $role) {
      id
      name
      username
      email
      avatar
      role
    }
  }
`;

export const GET_ALL_SUPPLIERS = gql`
  query GetAllSuppliers {
    getAllSuppliers {
      id
      name
      email
      phone
      address
    }
  }
`;

export const ADD_PRODUCT = gql`
  mutation AddProduct(
    $title: String!
    $description: String!
    $price: Float!
    $category: String!
    $stock: Int!
    $imageUrl: String!
    $supplierId: String!
  ) {
    addProduct(
      title: $title
      description: $description
      price: $price
      category: $category
      stock: $stock
      imageUrl: $imageUrl
      supplierId: $supplierId
    ) {
      id
      title
      description
      price
      category
      stock
      imageUrl
      supplier {
        name
      }
    }
  }
`;

export const GET_ALL_PRODUCTS = gql`
  query GetAllProducts {
    getAllProducts {
      id
      title
      description
      price
      category
      stock
      imageUrl
      supplier {
        name
        id
      }
    }
  }
`;

export const GET_PRODUCT_BY_ID = gql`
  query GetProductById($id: String) {
    getProductById(id: $id) {
      id
      title
      description
      price
      category
      imageUrl
      sales {
        id
        productId
        quantity
        createdAt
      }
      stock
      supplier {
        id
        name
      }
    }
  }
`;

export const CREATE_SALE = gql`
  mutation Mutation($productId: String!, $quantity: Int!) {
    createSale(productId: $productId, quantity: $quantity)
  }
`;

export const GET_ALL_SALES = gql`
  query GetAllSales {
    getAllSales {
      id
      productId
      quantity
      createdAt
    }
  }
`;

export const RESTOCK_PRODUCT = gql`
  mutation RestockProduct($restockProductId: String!, $quantity: Int!) {
    restockProduct(id: $restockProductId, quantity: $quantity)
  }
`;

export const UPDATE_PRODUCT = gql`
  mutation EditProduct(
    $editProductId: String!
    $title: String
    $description: String
    $price: Float
    $category: String
    $stock: Int
    $imageUrl: String
    $supplierId: String
  ) {
    editProduct(
      id: $editProductId
      title: $title
      description: $description
      price: $price
      category: $category
      stock: $stock
      imageUrl: $imageUrl
      supplierId: $supplierId
    )
  }
`;
