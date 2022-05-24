import { useEffect, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import "chart.js/auto";
import { deleteFiles, getFiles } from "../../helpers/serverRequests/files";
import { FileTypeFolderIcon } from "../Icons";
import Link from "next/link";
import RecentFilesRow from "../RecentFilesRow";

export default function RecentFiles() {
  const [files, setFiles] = useState<string[] | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [selectedFiles, setSelectedFiles] = useState<string[]>([]);

  const getFilesFromServer = async () => {
    const token = await JSON.parse(await getItem("token"));
    const response = await getFiles(token);
    if (response.status === 200) {
      if (response.data.isError === false) {
        setFiles(response.data.files);
        setIsLoading(false);
      }
    }
    if (response.status === 500) {
      setFiles([]);
    }
  };
  const deleteFilesFunction = async (
    folderName: string,
    fileNames: string[]
  ) => {
    try {
      const token = await JSON.parse(await getItem("token"));
      const response = await deleteFiles(token, fileNames, folderName);

      if (response.status === 200) {
        if (response.data.isError === false) {
          getFilesFromServer();
        } else {
          console.log(response.data.message);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };
  useEffect(() => {
    getFilesFromServer();
  }, []);

  if (isLoading) {
    return null;
  }

  return (
    <div className="hidden lg:flex flex-col w-full h-4/12 py-2 px-5 bg-white rounded-xl border-[1px] border-[#E8EDF2] dark:bg-[#1F2128] dark:border-[#313442]">
      <div className="flex flex-row justify-between items-center pb-2 border-b-[1px] border-[#E8EDF2] dark:border-[#313442]">
        <h4 className="font-semibold text-[16px] text-[#07070C] dark:text-white">
          Recent Files
        </h4>
      </div>
      <div className="p-5">
        <table className="table-auto w-full">
          <thead>
            <tr className="font-[14px] text-[#9A9AAF] dark:text-[#64646F] align-middle">
              <th className={`${files?.length === 0 ? "hidden" : ""}`}>
                <input
                  type="checkbox"
                  name=""
                  id=""
                  className="w-[18px] h-[18px] border-[2px] border-[#9A9AAF] dark:border-[#64646F] rounded-sm bg-transparent focus:outline-none transition duration-200 "
                  onChange={(e) => {
                    if (files) {
                      if (e.target.checked) {
                        setSelectedFiles(
                          files.map((file: any) => {
                            return file.fileName;
                          })
                        );
                      } else {
                        setSelectedFiles([]);
                      }
                    }
                  }}
                  checked={selectedFiles.length > 0}
                />
              </th>
              <th className="text-left font-normal">File Name</th>
              <th className="text-left font-normal">Size</th>
              <th className="text-left font-normal">Modified</th>
              <th className="text-left font-normal">Folder Name</th>
              <th className="text-left font-normal">Actions</th>
            </tr>
          </thead>
          <tbody className="w-full">
            {files && files.length > 0 ? (
              files.slice(0, 6).map((file: any, index: number) => {
                return (
                  <RecentFilesRow
                    file={file}
                    setSelectedFiles={setSelectedFiles}
                    selectedFiles={selectedFiles}
                    deleteFilesFunction={deleteFilesFunction}
                    key={index}
                  />
                );
              })
            ) : (
              <tr>
                <th>
                  <p className="text-[14px] text-[#8B8B93] mt-5">
                    No files found
                  </p>
                </th>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
