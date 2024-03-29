import axios, { AxiosError } from "axios";
import { clearLocalStorage } from "../../localStorage";

const mainUrl = process.env.NEXT_PUBLIC_MAIN_URL || "http://localhost:3001/api";

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
