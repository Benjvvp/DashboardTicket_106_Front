import { useEffect, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { getTasks } from "../../helpers/serverRequests/tasks";
import Image from "next/image";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js";
import {
  getFilesAverageType,
  getFolders,
} from "../../helpers/serverRequests/files";
import { FileTypeFolderIcon } from "../Icons";
import Link from "next/link";

export default function RecentFolders() {
  const [folders, setFolders] = useState<string[] | null>(null);

  const getFoldersFromServer = async () => {
    const token = await JSON.parse(await getItem("token"));
    const response = await getFolders(token);
    if (response.status === 200) {
      if (response.data.isError === false) {
        setFolders(response.data.folders);
      }
    }
    if (response.status === 500) {
      setFolders([]);
    }
  };

  function formatBytes(bytes: number, decimals = 0) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }

  function colorFolderByIndex(index: number) {
    let color = "";
    switch (index) {
      case 0:
        color = "#7364DB";
        break;
      case 1:
        color = "#50D1B2";
        break;
      case 2:
        color = "#2775FF";
        break;
      case 3:
        color = "#EC8C56";
        break;
      case 4:
        color = "#FB7BB8";
        break;
      case 5:
        color = "#0BD6F4";
        break;
      default:
        color = "#fff";
        break;
    }
    return color;
  }

  useEffect(() => {
    getFoldersFromServer();
  }, []);

  return (
    <div className="hidden lg:flex flex-col w-full h-4/12 py-2 px-5 bg-white rounded-xl border-[1px] border-[#E8EDF2] dark:bg-[#1F2128] dark:border-[#313442]">
      <div className="flex flex-row justify-between items-center pb-2 border-b-[1px] border-[#E8EDF2] dark:border-[#313442]">
        <h4 className="font-semibold text-[16px] text-[#07070C] dark:text-white">
          Recent Folders
        </h4>
      </div>
      <div className="flex flex-row p-5 w-full relative items-center mx-auto my-5 gap-5 flex-wrap">
        {folders && folders?.length > 0 ? (
          folders.slice(0, 6).map((folder: any, index: number) => {
            const textColor = colorFolderByIndex(index) as string;
            return (
              <Link href={{pathname: '/dashboard/files/list',query: {folderSelected: folder.folder}}} key={`recentFolder-${index}`}>
                <div
                  className="flex flex-col w-full max-w-[130px] gap-5 py-5 px-4 bg-white rounded-xl border-[1px] border-[#E8EDF2] dark:bg-[#1F2128] dark:border-[#313442] cursor-pointer"
                  key={`folder-${folder.folder}`}
                >
                  <div className="flex flex-row gap-2">
                    <FileTypeFolderIcon color={textColor} />
                    <p
                      className="font-bold text-[14px]"
                      style={{ color: textColor }}
                    >
                      {folder.folder}
                    </p>
                  </div>
                  <ul className="text-[#8B8B93] list-disc pl-5">
                    <li>{folder.files} files</li>
                    <li>{formatBytes(folder.size)}</li>
                  </ul>
                </div>
              </Link>
            );
          })
        ) : (
          <div className="flex flex-col w-full gap-5">
            <p className="text-[14px] text-[#8B8B93]">No folders found</p>
          </div>
        )}
      </div>
    </div>
  );
}
