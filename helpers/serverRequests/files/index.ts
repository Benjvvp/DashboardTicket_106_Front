import axios, { AxiosError } from "axios";
import { clearLocalStorage } from "../../localStorage";

const mainUrl =
  process.env.MAIN_URL || "https://f46b-190-21-85-86.sa.ngrok.io/api";

export const getFilesAverageType = async (token: string) => {
  try {
    const response = await axios.request({
      method: "get",
      url: `${mainUrl}/files/getFilesAverageType`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const getFolders = async (token: string) => {
  try {
    const response = await axios.request({
      method: "get",
      url: `${mainUrl}/files/getFolders`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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

export const createFolder = async (token: string, folderName: string) => {
  try {
    const response = await axios.request({
      method: "post",
      url: `${mainUrl}/files/createFolder`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        folderName,
      },
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