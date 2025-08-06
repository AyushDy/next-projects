import { UserType } from "../zod";
import axios from "axios";

export async function createUser(body: UserType) {
  try {
    const { username, email, password, role } = body;

    const url = `${process.env.NEXT_PUBLIC_API_URL}/auth/signup`;
    const response = await axios.post(url, {
      username,
      email,
      password,
      role,
    });

    if (response.status !== 201) {
      throw new Error(response.data.message || "Failed to create user");
    }
    const user = response.data;
    return { success: true, user };
  } catch (error) {
    if (axios.isAxiosError(error)) {
      return {
        success: false,
        message:
          error.response?.data?.message || error.message || "An error occurred",
      };
    }
    return {
      success: false,
      message: error instanceof Error ? error.message : "An error occurred",
    };
  }
}

export async function loginUser(email: string, password: string) {
  try {
    const response = await axios.post(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/login`,
      {
        email,
        password,
      }
    );

    if (response.status !== 200) {
      throw new Error(response.data.message || "Failed to login");
    }

    const user = response.data;
    return { success: true, user: user.user };
  } catch (error) {
    return handleError(error);
  }
}
    

export async function logoutUser() {
  try {
    const response = await axios.get(
      `${process.env.NEXT_PUBLIC_API_URL}/auth/logout`,
      {
        withCredentials: true,
      }
    );

    if (response.status !== 200) {
      throw new Error(response.data.message || "Failed to logout");
    }

    return { success: true, message: "Logged out successfully" };
  } catch (error) {
    return handleError(error);
  }
}


export async function getMe(){
    try {
        const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/auth/me`, {
            withCredentials: true,
        });

        if (response.status !== 200) {
            throw new Error(response.data.message || "Failed to fetch user");
        }

        return { success: true, user: response.data.user, company:response.data.company };
    } catch (error) {
      return handleError(error);
    }
}


export async function getMyCompany(){
  try {
    const response = await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/companies`, {
      withCredentials: true,
    });

    if (response.status !== 200) {
      throw new Error(response.data.message || "Failed to fetch company");
    }

    return { success: true, data: response.data.company };
  } catch (error) {
    return handleError(error);
  }
}

//to-do
export async function updateUser(data: UserType){
  
}


function handleError(error: any) {
  if (axios.isAxiosError(error)) {
    return {
      success: false,
      message: error.response?.data?.message || error.message || "An error occurred",
      data : null
    };
  }
  return {
    success: false,
    message: error instanceof Error ? error.message : "An error occurred",
    data : null
  };
}