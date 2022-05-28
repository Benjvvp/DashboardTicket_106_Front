import axios, { AxiosError } from "axios";
import { clearLocalStorage } from "../../localStorage";

const mainUrl = process.env.MAIN_URL || "http://localhost:3001/api";

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

export const getFilesInFolder = async (token: string, folderName: string) => {
  try {
    const response = await axios.request({
      method: "get",
      url: `${mainUrl}/files/getFilesInFolder/${folderName}`,
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

export const uploadFilesInFolder = async (
  token: string,
  userId: string,
  folderName: string,
  files: File[],
  setFileUploadProgress: (progress: number) => void
) => {
  try {
    const formData = new FormData();
    files.forEach((file: File) => {
      formData.append("files", file);
    });

    const response = await axios.request({
      method: "post",
      url: `${mainUrl}/files/uploadFileInFolder/${userId}/${folderName}`,
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

export const deleteFiles = async (
  token: string,
  idFiles: string[],
) => {
  try {
    const response = await axios.request({
      method: "post",
      url: `${mainUrl}/files/deleteFiles`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        idFiles:
          idFiles.length > 0 ? idFiles.join("/") : idFiles.toString(),
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

export const downloadFiles = async (
  token: string,
  fileNames: string[],
  folderName: string
) => {
  try {
    const response = await axios.request({
      method: "post",
      url: `${mainUrl}/files/downloadFiles`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      responseType: "blob",
      data: {
        filesNames: fileNames.join("/"),
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

export const deleteFolder = async (token: string, folderName: string) => {
  try {
    const response = await axios.request({
      method: "DELETE",
      url: `${mainUrl}/files/deleteFolders/${folderName}`,
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

export const updateFile = async (
  token: string,
  idFile: string,
  fileNameEditing: string,
  fileDescriptionEditing: string
) => {
  try {
    const response = await axios.request({
      method: "post",
      url: `${mainUrl}/files/updateFile`,
      headers: {
        Authorization: `Bearer ${token}`,
      },
      data: {
        idFile,
        fileNameEditing,
        fileDescriptionEditing,
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

export const getFiles = async (token: string) => {
  try {
    const response = await axios.request({
      method: "GET",
      url: `${mainUrl}/files/getFiles`,
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

export const getFile = async (token: string, fileId: string) => {
  try {
    const response = await axios.request({
      method: "GET",
      url: `${mainUrl}/files/getFile/${fileId}`,
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
