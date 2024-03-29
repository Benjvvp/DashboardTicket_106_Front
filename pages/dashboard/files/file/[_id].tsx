import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useEffect, useMemo, useState } from "react";
import { InputDefault, TextAreaInput } from "../../../../components/Inputs";
import TopBar from "../../../../components/Navigation/TopBar";
import PageTitle from "../../../../components/PageTitle";
import DefaultSEO from "../../../../components/SEO";
import { getItem } from "../../../../helpers/localStorage";
import {
  deleteFiles,
  getFile,
  updateFile,
} from "../../../../helpers/serverRequests/files";
const FileEdit: NextPage = () => {
  const router = useRouter();
  const idFile = router.query._id as string;

  const [file, setFile] = useState<any>({
    fileName: "",
  });

  const [fileDescriptionEditing, setFileDescriptionEditing] =
    useState<string>("");
  const [fileNameEditing, setFileNameEditing] = useState<string>("");

  const [fileDescriptionError, setFileDescriptionError] = useState<string>("");
  const [fileNameError, setFileNameError] = useState<string>("");

  const [successfullyUpdated, setSuccessfullyUpdated] =
    useState<boolean>(false);

  async function getFileFromServer() {
    try {
      const token = await JSON.parse(await getItem("token"));
      const response = await getFile(token, idFile);
      if (response.status === 200) {
        if (response.data.isError === false) {
          setFile(response.data.file);
          setFileDescriptionEditing(response.data.file.fileDescription);
          setFileNameEditing(response.data.file.fileName);
        }
        if (response.data.isError === true) {
          console.log(response.data);
        }
      }
    } catch (error) {
      console.log(error);
    }
  }

  const updateFilePost = async () => {
    if (fileNameEditing.length === 0) {
      return setFileNameError("File name is required");
    } else {
      setFileNameError("");
    }
    if (
      fileNameEditing.match(/^[a-zA-Z0-9-_]+([.][a-zA-Z0-9-_]+){0,2}$/) === null
    ) {
      return setFileNameError("File name cannot contain special characters");
    } else {
      setFileNameError("");
    }
    const token = await JSON.parse(await getItem("token"));
    const response = await updateFile(
      token,
      idFile,
      fileNameEditing.trimEnd(),
      fileDescriptionEditing
    );
    if (response.status === 200) {
      if (response.data.isError === false) {
        setSuccessfullyUpdated(true);
        setFileNameEditing("");
        setFileDescriptionEditing("");
        getFileFromServer();
        setTimeout(() => {
          setSuccessfullyUpdated(false);
        }, 2000);
      }
      if (response.data.isError === true) {
        console.log(response.data);
      }
    }
  };

  const deleteFilePost = async () => {
    const token = await JSON.parse(await getItem("token"));
    const response = await deleteFiles(token, [idFile]);
    if (response.status === 200) {
      if (response.data.isError === false) {
        setSuccessfullyUpdated(true);
        setTimeout(() => {
          router.back();
        }, 2000);
      }
      if (response.data.isError === true) {
        console.log(response.data);
      }
    }
  };

  useEffect(() => {
    if (router.isReady) {
      getFileFromServer();
    }
  }, [router.isReady]);

  return (
    <div className="bg-[#E8EDF2] mt-[100px] h-full min-h-screen dark:bg-[#0F0F12]">
      <Head>
        <title>Edit File - [{file.fileName}]</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <DefaultSEO />
      </Head>
      <TopBar isLarge showLogo />
      <div className="w-[100%] block relative h-full min-h-[89vh] p-[3em] px-[10%]">
        <PageTitle
          title="Edit File"
          addBreadcrumb
          linksBreadcrumb={[
            {
              Name: "Home",
              Url: "/",
              icon: "/svg/home-2.svg",
            },
            {
              Name: "Files",
              Url: "/dashboard/files",
            },
          ]}
        />
        <div className="flex flex-row w-full h-full py-10 px-10 bg-white rounded-xl border-[1px] border-[#E8EDF2] dark:bg-[#1F2128] dark:border-[#313442] mt-[5%]">
          <div className="flex flex-col w-full h-full justify-center items-center gap-5">
            <div className="flex flex-col h-full gap-2 w-full px-5 xl:px-10">
              <div
                className={`p-5 w-full rounded-xl mt-5 text-white bg-green-600 dark:bg-green-700 text-center ${
                  successfullyUpdated ? "block" : "hidden"
                } mb-5`}
              >
                <p>{successfullyUpdated ? "Updated file correctly." : ""}</p>
              </div>
              <div className="flex flex-col gap-5 w-full h-full justify-start items-left">
                <div className="flex flex-col w-full mb-10">
                  <label
                    htmlFor="userNameInput"
                    className="block text-sm text-[#07070C] dark:text-white"
                  >
                    File Name
                  </label>
                  <div className="flex flex-row gap-5">
                    <InputDefault
                      placeholder="Enter the file name"
                      iconPath="/svg/home-2.svg"
                      name="fileNameInput"
                      type="text"
                      onChange={(e: any) => {
                        setFileNameEditing(e.target.value);
                      }}
                      required
                      value={fileNameEditing}
                      error={fileNameError}
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <label
                    htmlFor="emailInput"
                    className="block text-sm text-[#07070C] dark:text-white"
                  >
                    File Description
                  </label>
                  <div className="flex flex-row gap-5">
                    <TextAreaInput
                      cols={10}
                      rows={10}
                      placeholder="Enter a description for the file"
                      name="fileDescriptionInput"
                      onChange={(e: any) => {
                        setFileDescriptionEditing(e.target.value);
                      }}
                      required
                      value={fileDescriptionEditing}
                      error={fileDescriptionError}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 flex flex-row flex-wrap gap-3 items-center w-full h-full justify-start">
                <button
                  type="button"
                  className="bg-[#7364DB] text-white font-semibold py-2 px-4 rounded-lg text-sm dark:text-white text-[14px]"
                  onClick={() => {
                    updateFilePost();
                  }}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-[#E23738] text-white font-semibold py-2 px-4 rounded-lg text-sm dark:text-white text-[14px]"
                  onClick={() => {
                    deleteFilePost();
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="bg-[#E8EDF2] text-[#B8B1E4] font-semibold py-2 px-4 rounded-lg text-sm dark:bg-[#313442] text-[14px]"
                  onClick={() => {
                    router.back();
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default FileEdit;
