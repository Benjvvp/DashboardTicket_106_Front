import axios from "axios";

const mainUrl =
  process.env.MAIN_URL || "https://74f1-201-188-68-135.sa.ngrok.io/api";

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
