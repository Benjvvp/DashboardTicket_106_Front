import { useTheme } from "next-themes";
import Image from "next/image";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useRef, useState } from "react";
import Dropzone, { useDropzone } from "react-dropzone";
import { UserContext } from "../../contexts/userContext/UserContext";
import { getItem } from "../../helpers/localStorage";
import {
  deleteFiles,
  downloadFiles,
  getFilesInFolder,
  uploadFilesInFolder,
} from "../../helpers/serverRequests/files";
import FileRow from "../FileRow";
import Pagination from "../Pagination";

interface FolderViewersProps {
  setFolderSelected: (value: string) => void;
  folderSelected: string | null;
  refreshList: () => void;
}

interface fileLists {
  fileName: string;
  fileType: string;
  fileSize: number;
  fileDate: Date;
  filePath: string;
  fileId: string;
  isSelected: boolean;
  fileLastModified: Date;
}
export default function FolderViewers(props: FolderViewersProps) {
  const inputRef = useRef<HTMLInputElement>(null);
  const fileForPages = 6;
  const { theme } = useTheme();
  const { setFolderSelected, folderSelected, refreshList } = props;

  const [fileUpload, setFileUpload] = useState([{} as File]);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);

  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(1);

  const [fileLists, setFileLists] = useState<fileLists[] | []>([]);

  const [searchInput, setSearchInput] = useState("");

  const { userData } = useContext(UserContext);

  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const getFilesInFolderFromServer = async () => {
    try {
      if (folderSelected === null) return;
      const token = await JSON.parse(await getItem("token"));
      const response = await getFilesInFolder(token, folderSelected);
      if (response.status === 200) {
        if (response.data.isError === false) {
          setFileLists(response.data.files);
          setCountPage(Math.ceil(response.data.files.length / fileForPages));
        } else {
          setFileLists([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const uploadFile = async () => {
    if (fileUpload && folderSelected) {
      try {
        const token = await JSON.parse(await getItem("token"));
        const response = await uploadFilesInFolder(
          token,
          userData._id,
          folderSelected,
          fileUpload,
          setFileUploadProgress
        );
        if (response.status === 200) {
          if (response.data.isError === false) {
            getFilesInFolderFromServer();
            setFileUpload([]);
            refreshList();
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteFilesFunction = async () => {
    if (selectedFiles.length > 0) {
      try {
        const token = await JSON.parse(await getItem("token"));
        const response = await deleteFiles(token, selectedFiles);
        if (response.status === 200) {
          if (response.data.isError === false) {
            getFilesInFolderFromServer();
            setSelectedFiles([]);
            setCurrentPage(1);
            refreshList();
          } else {
            console.log(response.data.message);
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const downloadFilesFunction = async () => {
    if (selectedFiles.length > 0 && folderSelected) {
      try {
        const token = await JSON.parse(await getItem("token"));
        const response = (await downloadFiles(
          token,
          selectedFiles,
          folderSelected
        )) as any;
        if (response.status === 200) {
          const url = window.URL.createObjectURL(
            new Blob([response.data], {
              type: response.headers["content-type"],
            })
          );

          const link = document.createElement("a");
          link.href = url;
          link.setAttribute(
            "download",
            response.headers["content-type"].split("/")[1] !== "zip"
              ? `${selectedFiles[0]}`
              : `rytaleFiles.zip`
          );
          document.body.appendChild(link);
          link.click();
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (fileUpload.length > 0) {
      uploadFile();
    }
  }, [fileLists, fileUpload, folderSelected]);

  useEffect(() => {
    if (folderSelected !== null) {
      getFilesInFolderFromServer();
    }
    setSelectedFiles([]);
    setCurrentPage(1);
  }, [folderSelected]);

  useEffect(() => {
    console.log(selectedFiles);
  }, [selectedFiles]);

  const { getRootProps, getInputProps, isFocused, isDragAccept, isDragReject } =
    useDropzone({
      accept: ["*"],
    });
  const style = useMemo(
    () => ({
      borderColor: isDragAccept
        ? "#00e676"
        : isDragReject
        ? "#ff1744"
        : "transparent",
      borderStyle: "dashed",
      borderWidth: "2px",
      borderRadius: "5px",
      cursor: "pointer",
      outline: "none",
      transition: "border .24s ease-in-out",
    }),
    [isDragAccept, isDragReject]
  );

  return (
    <Dropzone
      onDrop={(acceptedFiles) => {
        setFileUpload(acceptedFiles);
      }}
      noClick={true}
    >
      {({ getRootProps, getInputProps }) => (
        <div className="relative h-full" {...getRootProps({ style })}>
          <input {...getInputProps()} className="hidden" ref={inputRef} />
          {fileLists.length > 0 && (
            <div className="flex flex-col md:flex-row xl:gap-0 gap-5 justify-between xl:items-center border-b-[1px] border-[#E8EDF2] dark:border-[#313442] pb-5 mb-5 relative z-20 mx-5 pt-5">
              <div className={`flex items-center relative h-full flex-initial`}>
                <img
                  src="/svg/search-normal.svg"
                  className="absolute left-[15px] top-1/2 transform translate-y-[-50%] width-20 height-20"
                />
                <input
                  type="text"
                  name="searchFiles"
                  id=""
                  placeholder="Search"
                  className={`bg-transparent border-[1px] border-[#E8EDF2] dark:border-[#313442] py-2 rounded-xl text-[#C6CBD9] focus:outline-none focus:shadow-outline dark:placeholder-[#64646F] font-[14px] w-[200px] md:w-[350px] max-h-[50px] min-h-[50px] pl-10 pr-3`}
                  onChange={(e) => setSearchInput(e.target.value)}
                  value={searchInput}
                />
              </div>
              {selectedFiles.length > 0 && (
                <div className="flex items-center relative h-full flex-initial gap-3 flex-wrap">
                  <button
                    className={`bg-[] border-[1px] border-[#E8EDF2] dark:border-[#313442] py-2 rounded-xl text-[#C6CBD9] font-[14px] w-[100px] max-h-[50px] min-h-[50px]`}
                    onClick={() => {
                      deleteFilesFunction();
                    }}
                  >
                    Delete
                  </button>
                  <button
                    className={`bg-[] border-[1px] border-[#E8EDF2] dark:border-[#313442] py-2 rounded-xl text-[#C6CBD9] font-[14px] w-[100px] max-h-[50px] min-h-[50px]`}
                    onClick={() => {
                      downloadFilesFunction();
                    }}
                  >
                    Download
                  </button>
                </div>
              )}
            </div>
          )}
          <div className="flex flex-col gap-5 z-20 relative px-5">
            {fileLists.length > 0 ? (
              fileLists
                .filter((file) => {
                  return file.fileName
                    .toLowerCase()
                    .includes(searchInput.toLowerCase());
                })
                .map((file: fileLists, index: number) => {
                  if (
                    index >= (currentPage - 1) * fileForPages &&
                    index < currentPage * fileForPages
                  ) {
                    return (
                      <FileRow
                        key={index}
                        fileName={file.fileName}
                        fileSize={file.fileSize}
                        fileType={file.fileType}
                        fileDate={file.fileDate}
                        fileId={file.fileId}
                        selectedFiles={selectedFiles}
                        setSelectedFiles={setSelectedFiles}
                        folderSelected={folderSelected}
                        refreshList={getFilesInFolderFromServer}
                      />
                    );
                  }
                })
            ) : (
              <div className="flex flex-col items-center justify-center h-full mt-10 ">
                <Image
                  src={
                    theme === "dark"
                      ? "/svg/undrawblankcanvasre2hwyDarkMode.svg"
                      : "/svg/undrawblankcanvasre2hwyLightMode.svg"
                  }
                  alt="No Files"
                  width={300}
                  height={300}
                  className="block"
                />

                <p className="text-[#07070C] dark:text-[#F1F1F1] text-[24px] font-bold mt-5">
                  No items found.
                </p>
                <p className="text-[#9A9AAF] dark:text-[#64646F] text-[16px] font-semibold mt-2">
                  Start creating new folders or uploading a new file
                </p>
                <div
                  className="flex flex-row items-center justify-center w-12/12 px-2 lg:6/12 xl:w-4/12 bg-[#7364DB] rounded-lg max-h-[3em] gap-2 mt-10 cursor-pointer"
                  onClick={() => {
                    inputRef.current?.click();
                  }}
                >
                  <img
                    src="/svg/messageEdit.svg"
                    className="w-5 h-5"
                    alt="folder"
                  />
                  <button
                    type="button"
                    className="text-white font-bold py-2 sm:py-3 text-sm mb-4 mt-4"
                  >
                    Upload new file
                  </button>
                </div>
              </div>
            )}
            {fileLists.length > 0 && (
              <Pagination
                count={countPage}
                currentPage={1}
                buttonNext={true}
                setCurrentPage={setCurrentPage}
              />
            )}
          </div>
        </div>
      )}
    </Dropzone>
  );
}
