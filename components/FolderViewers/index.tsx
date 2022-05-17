import { useTheme } from "next-themes";
import Image from "next/image";
import { useEffect, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { getFilesInFolder } from "../../helpers/serverRequests/files";

interface FolderViewersProps {
  setFolderSelected: (value: string) => void;
  folderSelected: string | null;
}

interface fileLists {
  fileName: string;
  fileType: string;
  fileSize: number;
  fileDate: Date;
  filePath: string;
  isSelected: boolean;
  fileLastModified: Date;
}
export default function FolderViewers(props: FolderViewersProps) {
  const { theme } = useTheme();
  const { setFolderSelected, folderSelected } = props;

  const [fileLists, setFileLists] = useState<fileLists[] | []>([]);

  const [searchInput, setSearchInput] = useState("");

  const getFilesInFolderFromServer = async () => {
    try {
      if (folderSelected === null) return;
      const token = await JSON.parse(await getItem("token"));
      const response = await getFilesInFolder(token, folderSelected);
      if (response.status === 200) {
        if (response.data.isError === false) {
          setFileLists(response.data.files);
        } else {
          setFileLists([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    console.log(fileLists);
  }, [fileLists]);

  useEffect(() => {
    if (folderSelected !== null) {
      getFilesInFolderFromServer();
    }
  }, [folderSelected]);
  return (
    <div>
      {fileLists.length > 0 && (
        <div className="flex flex-row justify-between items-center border-b-[1px] border-[#E8EDF2] dark:border-[#313442] pb-5 mb-5">
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
              className={`bg-transparent border-[1px] border-[#E8EDF2] dark:border-[#313442] py-2 rounded-[12px] text-[#C6CBD9] focus:outline-none focus:shadow-outline dark:placeholder-[#64646F] font-[14px] w-[350px] max-h-[50px] min-h-[50px] pl-10 pr-3`}
              onChange={(e) => setSearchInput(e.target.value)}
              value={searchInput}
            />
          </div>
        </div>
      )}
      {fileLists.length > 0 ? (
        fileLists
          .filter((file) => {
            return file.fileName
              .toLowerCase()
              .includes(searchInput.toLowerCase());
          })
          .map((file: fileLists, index: number) => {
            return (
              <div className="flex flex-row gap-3 items-center" key={`${index}-fileInfoList`}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className=" h-5 w-5 border-[2px] border-[#9A9AAF] dark:border-[#64646F] rounded-sm bg-transparent focus:outline-none transition duration-200 "
                />
                <div className="flex flex-row gap-5 ml-3 items-center w-10/12 h-full">
                  <img
                    src={`/svg/icon=${file.fileType.toLocaleUpperCase()}.svg`}
                    alt=""
                  />
                  <div className="flex flex-col justify-between">
                    <p className="font-semibold font-[14px] text-[#07070C] dark:text-[#F1F1F1]">
                      {file.fileName}
                    </p>
                    <p className="text-[#9A9AAF] dark:text-[#64646F] font-[12px]">
                      on{" "}
                      {
                        // on 2022/02/17 at 11:21 AM
                        new Date(file.fileDate).toLocaleDateString() +
                          " at " +
                          new Date(file.fileDate).toLocaleTimeString("en-US", {
                            hour: "numeric",
                            minute: "numeric",
                            hour12: true,
                          })
                      }
                    </p>
                  </div>
                  <div className="ml-auto flex flex-row gap-4">
                    <p className="text-[#7E7E8F] dark:text-[#8B8B93] font-[10px]">
                      {file.fileSize}
                    </p>
                  </div>
                </div>
              </div>
            );
          })
      ) : (
        <div className="flex flex-col items-center justify-center h-full mt-10">
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
          <div className="flex flex-row items-center justify-center w-12/12 px-2 lg:6/12 xl:w-4/12 bg-[#7364DB] rounded-lg max-h-[3em] gap-2 mt-10 cursor-pointer">
            <img src="/svg/messageEdit.svg" className="w-5 h-5" alt="folder" />
            <button
              type="button"
              className="text-white font-bold py-2 sm:py-3 text-sm mb-4 mt-4"
            >
              Upload new file
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
