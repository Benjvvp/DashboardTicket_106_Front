import axios from "axios";

const mainUrl =
  process.env.MAIN_URL || "http://localhost:80/api";

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
export const addUserToTask = async (token: string, id: string, user: string) => {
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
}
export const removeUserToTask = async (token: string, id: string, userId: string) => {
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
}
