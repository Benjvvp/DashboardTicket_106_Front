import axios, { AxiosError } from "axios";
import { clearLocalStorage } from "../../localStorage";

const mainUrl = process.env.MAIN_URL || "https://1425-190-21-76-49.sa.ngrok.io/api";

export const getUnseenCountMessages = async (
  token: string,
  data: { userId: string; senderId: string }
) => {
  try {
    const response = await axios.request({
      method: "POST",
      url: `${mainUrl}/chat/getUnseenCountMessages`,
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
export const getMessagesInChat = async (
  token: string,
  data: { userId: string; senderId: string },
  messagesToReturn: number
) => {
  try {
    const response = await axios.request({
      method: "POST",
      url: `${mainUrl}/chat/getMessagesInChat`,
      params: {
        toReturn: messagesToReturn,
      },
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
