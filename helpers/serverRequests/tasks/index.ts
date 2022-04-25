import axios from "axios";

const mainUrl = process.env.MAIN_URL || "https://74f1-201-188-68-135.sa.ngrok.io/api";

export const getTasks = async (token : string) => {
  try {
    const response = await axios.request({
      method: "get",
      url: `${mainUrl}/tasks/getTasks`,
      headers: {
            Authorization: `Bearer ${token}`,
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

export const createTask = async (token : string, data : any) => {
  try {
    const response = await axios.request({
      method: "post",
      url: `${mainUrl}/tasks/createTask`,
      headers: {
            Authorization: `Bearer ${token}`,
      },
      data
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