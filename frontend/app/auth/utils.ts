
import cookies from "js-cookie";
import axios, {AxiosResponse} from 'axios';
// Base API setup for making HTTP requests


// src/app/auth/utils.ts
interface UserInfo {
  id: number;
  username: string;
  email?: string;
  first_name?: string;
  last_name?: string;
  avatar?: string;
  // Add other user fields as needed
}
/**
 * Stores a token in cookies.
 * @param {string} token - The token to be stored.
 * @param {"access" | "refresh"} type - The type of the token (access or refresh).
 */

const getToken = (type  = "jwt_token") => {
  return cookies.get(type);
};
/**
 * Retrieves a token from cookies.
 * @param {"access" | "refresh"} type - The type of the token to retrieve (access or refresh).
 * @returns {string | undefined} The token, if found.
 */


const register = (first_name: string, last_name: string, email: string, username: string, password: string) => {
  const res = axios.post("http://localhost:8000/api/auth/register/", {
    first_name: first_name,
    last_name: last_name,
    email: email,
    username: username,
    password: password,
  }, {
    withCredentials: true,
  });
  return res;
  };
  
const login = async (username: string, password: string) => {
  const res = axios.post("http://localhost:8000/api/auth/login/", {
    username: username,
    password: password,
  }, {
    withCredentials: true,
  });   
  return res;
};


const logout = () => {
  const res = axios.get("http://localhost:8000/api/auth/logout/", { withCredentials: true });

  console.log(res);
  return res;
};

// Export all the functions
// 42 Oauth 2.0

const Oauth42 = (code: string) => {
  const res = axios.post("http://localhost:8000/api/auth/42/callback/", {
    code: code,
  }, {
    withCredentials: true,
  });
  return res;
};

// const Userinfo = () => {
//   return axios.get("http://localhost:8000/api/auth/user/me");
// }
const getUserInfo = async (): Promise<UserInfo> => {
  try {
    const response: AxiosResponse<UserInfo> = await axios.get('http://localhost:8000/auth/user/me');
    return response.data;
  } catch (error) {
    if (axios.isAxiosError(error)) {
      throw {
        message: error.response?.data?.message || 'Failed to fetch user info',
        status: error.response?.status
      };
    }
    throw { message: 'An unexpected error occurred', status: 500 };
  }
};


  export const AuthActions = () => {
    return {
      login,
      register,
      getToken,
      logout,
      Oauth42,
      getUserInfo
    };
  };