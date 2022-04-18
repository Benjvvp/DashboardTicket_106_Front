import axios from "axios";

const mainUrl = process.env.MAIN_URL || "https://1ec1-201-188-84-17.sa.ngrok.io/api";

export const getUser = async (token: string, userId: any) => {
  try {
    const response = await axios.request({
      method: "get",
      url: `${mainUrl}/user/getUser/${userId}`,
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