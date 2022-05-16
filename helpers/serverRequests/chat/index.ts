import axios, { AxiosError } from "axios";
import { clearLocalStorage } from "../../localStorage";

const mainUrl = process.env.MAIN_URL || "https://f46b-190-21-85-86.sa.ngrok.io/api";

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
