import axios from "axios";
import { createReadStream } from "fs";

const mainUrl =
  process.env.MAIN_URL || "http://localhost:3001/api";

export const getAllUsers = async (token: string) => {
  try {
    const response = await axios.request({
      method: "get",
      url: `${mainUrl}/user/getAllUsers`,
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

export const getUsers = async (token: string, users: any) => {
  try {
    const response = await axios.request({
      method: "POST",
      url: `${mainUrl}/user/getUsers`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        users,
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

export const deleteUser = async (token: string, userId: any) => {
  try {
    const response = await axios.request({
      method: "delete",
      url: `${mainUrl}/user/deleteUser/${userId}`,
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

export const getUser = async (token: string, userId: any) => {
  try {
    const response = await axios.request({
      method: "get",
      url: `${mainUrl}/user/getUser/${userId}`,
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

export const updateUser = async (token: string, userId: any, data: any) => {
  try {
    const response = await axios.request({
      method: "put",
      url: `${mainUrl}/user/editUser/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userName: data.userName,
        avatar: data.avatar,
        email: data.email,
        role: data.role,
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

export const uploadAvatarUser = async (
  token: string,
  userId: any,
  file: any,
  setFileUploadProgress: (progress: number) => void
) => {
  try {
    const formData = new FormData();
    formData.append("file", file);

    const response = await axios.request({
      method: "post",
      url: `${mainUrl}/user/uploadAvatar/${userId}`,
      headers: {
        Authorization: `Bearer ${token}`,
        "Content-Type": "multipart/form-data",
      },
      data: formData,
      onUploadProgress: (progressEvent) => {
        const progress = Math.round(
          (progressEvent.loaded * 100) / progressEvent.total
        );
        setFileUploadProgress(progress);
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

export const getAssignedImagesUsers = async (token: string, usersId: any) => {
  try {
    const response = await axios.request({
      method: "post",
      url: `${mainUrl}/user/getAssignedImagesUsers`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        users: usersId,
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

export const deleteTaskByUser = async (token: string, userId: any) => {
  try {
    const response = await axios.request({
      method: "delete",
      url: `${mainUrl}/user/deleteTaskByUser/${userId}`,
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
