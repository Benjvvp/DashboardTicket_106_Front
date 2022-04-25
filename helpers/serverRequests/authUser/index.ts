import axios, { AxiosError } from "axios";
import { clearLocalStorage } from "../../localStorage";

const mainUrl = process.env.MAIN_URL || "https://74f1-201-188-68-135.sa.ngrok.io/api";

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
    });
    return response;
  } catch (err: any) {
    console.log({
      status: err.response.status,
      data: {
        message: err.response.data.message,
      },
    });
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
