import axios, { AxiosError } from "axios";
import { clearLocalStorage } from "../../localStorage";

const mainUrl = process.env.MAIN_URL || "http://192.168.1.87:3001/api";

export const loginUser = async (data: { email: string; password: string }) => {
  try {
    const response = await axios.request({
      method: "post",
      url: `${mainUrl}/auth/login`,
      data,
    });
    return response;
  } catch (err: any) {
    return {
      status: err.response.status,
      data: {
        message: err.response.data.message,
      },
    };
  }
};

export const loginWithToken = async (token: string) => {
  try {
    const response = await axios.request({
      method: "post",
      url: `${mainUrl}/auth/loginWithToken`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        token,
      }
    });
    return response;
  } catch (err: any) {
    return {
      status: err.response.status,
      data: {
        message: err.response.data.message,
      },
    };
  }
};

export const registerUser = async (data: {
  email: string;
  password: string;
  passwordConfirmation: string;
  userName: string;
  AuthCode: string;
}) => {
  try {
    console.log(data);
    const response = await axios.request({
      method: "post",
      url: `${mainUrl}/auth/register`,
      data,
    });
    return response;
  } catch (err: any) {
    return {
      status: err.response.status,
      data: {
        message: err.response.data.message,
      },
    };
  }
};
