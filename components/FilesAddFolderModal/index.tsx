import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext/UserContext";
import { getItem } from "../../helpers/localStorage";
import { createFolder } from "../../helpers/serverRequests/files";
import { InputDefault } from "../Inputs";

interface FilesAddFolderModal {
  modalAddFolder: boolean;
  setModalAddFolder: (value: boolean) => void;
  setIsModalActive: (value: boolean) => void;
  getFoldersFromServer: () => void;
}

export default function FilesAddFolderModal(props: FilesAddFolderModal) {
  const { userData } = useContext(UserContext);
  const {
    modalAddFolder,
    setModalAddFolder,
    setIsModalActive,
    getFoldersFromServer,
  } = props;

  const [successCreateFolder, setSuccessCreateFolder] = useState(false);

  const [folderName, setFolderName] = useState("");
  const [folderNameError, setFolderNameError] = useState("");

  const createFolderFunction = async () => {
    try {
      if (folderName.length === 0) {
        setFolderNameError("Folder name is required");
        return;
      }
      const token = await JSON.parse(await getItem("token"));
      const response = await createFolder(token, folderName);
      if (response.status === 200) {
        if (response.data.isError === false) {
          setSuccessCreateFolder(true);
          setFolderName("");
          setTimeout(() => {
            setSuccessCreateFolder(false);
          }, 2000);
          getFoldersFromServer();
        } else {
          if (response.data.message === "Folder name is required") {
            setFolderNameError("Folder name is required");
          }
          if (response.data.message === "Folder already exists") {
            setFolderNameError("Folder already exists");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <div
      id="modalFormTask"
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden fixed top-0 bottom-0 right-0 left-0 z-[60] w-full md:inset-0 h-modal md:h-full  flex items-center justify-center ${
        modalAddFolder ? "block" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full min-h-[70vh] md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-[#1F2128] border border-[#E8EDF2] dark:border-[#313442] min-h-[70vh]">
          <div className="flex justify-between items-start p-5 rounded-t dark:border-gray-600">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                setModalAddFolder(false);
                setIsModalActive(false);
                setSuccessCreateFolder(false);
                setFolderName("");
                setFolderNameError("");
              }}
            >
              <svg
                className="w-5 h-5"
                fill="currentColor"
                viewBox="0 0 20 20"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  fillRule="evenodd"
                  d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                  clipRule="evenodd"
                ></path>
              </svg>
            </button>
          </div>
          <div
            className={`p-5 w-11/12 mx-auto rounded-xl mt-5 text-white bg-green-600 dark:bg-green-700 text-center ${
              successCreateFolder ? "block" : "hidden"
            } mb-5`}
          >
            <p>Sucess folder created.</p>
          </div>
          <h1 className="font-semibold text-[20px] text-[#07070C] text-center dark:text-white">
            Add folder
          </h1>
          <div className="p-5">
            <label htmlFor="folderName">
              <span className="text-gray-700 dark:text-white">Folder name</span>
            </label>
            <InputDefault
              name="folderName"
              type="text"
              placeholder="Enter folder name"
              value={folderName}
              onChange={(e) => setFolderName(e.target.value)}
              error={folderNameError}
            />
            <div
              className={`flex justify-center mt-4 ${
                folderNameError.length > 0 ? "pt-5" : ""
              }`}
            >
              <button
                type="button"
                className="bg-[#7364DB] text-white font-semibold py-2 px-4 rounded-lg"
                onClick={() => {
                  setFolderNameError("");
                  createFolderFunction();
                }}
              >
                Create
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
