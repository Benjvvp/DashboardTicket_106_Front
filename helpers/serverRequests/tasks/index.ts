import axios from "axios";

const mainUrl = process.env.MAIN_URL || "https://7bd2-190-21-76-49.sa.ngrok.io/api";

export const getTasks = async (token: string) => {
  try {
    const response = await axios.request({
      method: "get",
      url: `${mainUrl}/tasks/getTasks`,
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

export const getTask = async (token: string, id: string) => {
  try {
    const response = await axios.request({
      method: "get",
      url: `${mainUrl}/tasks/getTask/${id}`,
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
export const createTask = async (token: string, data: any) => {
  try {
    const response = await axios.request({
      method: "post",
      url: `${mainUrl}/tasks/createTask`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
export const addUserToTask = async (
  token: string,
  id: string,
  user: string
) => {
  try {
    const response = await axios.request({
      method: "post",
      url: `${mainUrl}/tasks/addUserToTask/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        user,
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
export const removeUserToTask = async (
  token: string,
  id: string,
  userId: string
) => {
  try {
    const response = await axios.request({
      method: "post",
      url: `${mainUrl}/tasks/removeUserToTask/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        userId,
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
export const deleteTask = async (token: string, id: string) => {
  try {
    const response = await axios.request({
      method: "delete",
      url: `${mainUrl}/tasks/deleteTask/${id}`,
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
export const editTask = async (
  token: string,
  id: string,
  data: {
    title: string;
    description: string;
    category: string;
    status: string;
    priority: string;
    progress: number;
  }
) => {
  try {
    const response = await axios.request({
      method: "put",
      url: `${mainUrl}/tasks/editTask/${id}`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
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
