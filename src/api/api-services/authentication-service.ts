import axiosInstance from "../axios-instance";

interface LoginResponse {
  message: string;
  data: {
    _id: string;
    firstName: string;
    lastName: string;
    email: string;
  };
}

interface ProfileResponse {
  message: string;
  data: {
    id: string;
    email: string;
    role: "passenger" | "driver" | "admin";
    iat: number;
    exp: number;
  };
}

const basePath = "/auth";

export const retriveUserProfile = async (): Promise<ProfileResponse> => {
  try {
    let endpoint: string = "/profile";
    const response = await axiosInstance.get<ProfileResponse>(
      `${basePath}${endpoint}`
    );
    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Profile retrive failed");
    } else if (error.request) {
      throw new Error("Network error. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};

export const loginUser = async (
  email: string,
  password: string,
  userType: "passenger" | "driver" | "admin"
): Promise<LoginResponse> => {
  try {
    let endpoint: string = "";
    if (userType === "passenger") endpoint = "/user/login";
    else if (userType === "driver") endpoint = "/driver/login";
    else if (userType === "admin") endpoint = "/admin/login";
    else {
      throw new Error("Invalid user login attempt.");
    }
    const response = await axiosInstance.post<LoginResponse>(
      `${basePath}${endpoint}`,
      {
        email,
        password,
      }
    );

    return response.data;
  } catch (error: any) {
    if (error.response) {
      throw new Error(error.response.data.message || "Login failed");
    } else if (error.request) {
      throw new Error("Network error. Please try again later.");
    } else {
      throw new Error("An unexpected error occurred.");
    }
  }
};
