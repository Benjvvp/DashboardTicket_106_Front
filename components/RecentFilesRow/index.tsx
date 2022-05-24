import Link from "next/link";
import { useState } from "react";

interface RecentFilesRowProps {
  setSelectedFiles: (files: string[]) => void;
  deleteFilesFunction: (folderName: string, fileName: string[]) => void;
  selectedFiles: string[];
  file: any;
}
export default function RecentFilesRow(props: RecentFilesRowProps) {
  const [dropDownOptions, setDropDownOptions] = useState<boolean>(false);

  const {setSelectedFiles,  deleteFilesFunction, selectedFiles, file} = props;

  function formatBytes(bytes: number, decimals = 0) {
    if (bytes === 0) return "0 Bytes";

    const k = 1024;
    const dm = decimals < 0 ? 0 : decimals;
    const sizes = ["Bytes", "KB", "MB", "GB", "TB", "PB", "EB", "ZB", "YB"];

    const i = Math.floor(Math.log(bytes) / Math.log(k));

    return parseFloat((bytes / Math.pow(k, i)).toFixed(dm)) + " " + sizes[i];
  }
  
  return (
    <tr
      className="font-[14px] text-[#9A9AAF] text-[14px] dark:text-[#F1F1F1] align-middle border-t-[1px] border-[#E8EDF2] dark:border-[#313442]"
    >
      <td className="pt-4 pb-4">
        <input
          type="checkbox"
          name=""
          id=""
          className="w-[18px] h-[18px] border-[2px] border-[#9A9AAF] dark:border-[#64646F] rounded-sm bg-transparent focus:outline-none transition duration-200"
          onChange={(e) => {
            if (e.target.checked) {
              setSelectedFiles([...selectedFiles, `${file.fileName}`]);
            } else {
              setSelectedFiles(
                selectedFiles.filter(
                  (selectedFile) => selectedFile !== `${file.fileName}`
                )
              );
            }
          }}
          checked={selectedFiles.includes(`${file.fileName}`)}
        />
      </td>
      <td className="font-normal">
        <Link href={`/files/${file.id}`}>
          <p className="cursor-pointer">{file.fileName}</p>
        </Link>
      </td>
      <td className="font-normal">{formatBytes(file.fileSize)}</td>
      <td className="font-normal">
        {new Date(file.fileModified).toLocaleDateString("en-US", {
          year: "numeric",
          month: "short",
          day: "numeric",
          timeZone: "UTC",
        })}
      </td>
      <td className="font-normal">{file.folderName}</td>
      <td className="font-normal">
        <div className="h-full ml-auto w-1/12 flex flex-col relative">
          <img
            src="/svg/Toggle.svg"
            className="ml-auto cursor-pointer  rotate-90 md:rotate-0 mt-5 md:mt-0"
            alt=""
            srcSet=""
            onClick={() => setDropDownOptions(!dropDownOptions)}
          />
          <div
            className={`${
              dropDownOptions ? "block" : "hidden"
            } bg-white dark:bg-[#1F2128] absolute bottom-[-8em] right-[-1em] md:bottom-[-5em] md:right-0 rounded-xl border-[1px] border-[#E8EDF2] dark:border-[#313442] p-2 mt-2 z-50`}
            onMouseLeave={() => setDropDownOptions(false)}
          >
            <div className="inline-flex flex-col">
              <Link href={`/dashboard/files/file/${file._id}`}>
                <a className="block mx-auto text-[14px] text-[#7E7E8F] dark:text-[#8B8B93] hover:bg-[#F5F5FA] hover:text-[#07070C] dark:hover:bg-[#0F0F12] dark:hover:text-[#fff] py-3 px-5 rounded-[8px] cursor-pointer">
                  Edit
                </a>
              </Link>
              <div className="w-11/12 h-[1px] block mx-auto bg-[#F5F5FA] dark:bg-[#313442] my-2"></div>
              <a
                className="block mx-auto text-[14px] text-[#7E7E8F] dark:text-[#8B8B93] hover:bg-[#F5F5FA] hover:text-[#07070C] dark:hover:bg-[#0F0F12] dark:hover:text-[#fff] py-3 px-5 rounded-[8px] cursor-pointer"
                onClick={() => {
                  if(selectedFiles.length > 1) {
                    deleteFilesFunction(file.folderName, selectedFiles);
                    setSelectedFiles([]);
                  } else {
                    deleteFilesFunction(file.folderName, [`${file.fileName}`]);
                    setSelectedFiles([]);
                  } 
                }}
              >
                Delete
              </a>
            </div>
          </div>
        </div>
      </td>
    </tr>
  );
}
