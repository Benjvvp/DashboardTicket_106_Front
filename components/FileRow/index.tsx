import { useEffect, useRef, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { changeFileName } from "../../helpers/serverRequests/files";

interface FileRowProps {
  fileName: string;
  fileType: string;
  fileDate: Date;
  fileSize: number;
  setSelectedFiles: (selectedFiles: string[]) => void;
  selectedFiles: string[];
  folderSelected: string | null;
  refreshList: () => void;
}

export default function FileRow(props: FileRowProps) {
  const checkBoxRef = useRef<HTMLInputElement>(null);
  const inputTextRef = useRef<HTMLInputElement>(null);

  const [editFileNameActive, setEditFileNameActive] = useState<boolean>(false);
  const [fileNameEditing, setFileNameEditing] = useState<string>(
    props.fileName
  );

  const {
    fileName,
    fileType,
    fileDate,
    fileSize,
    setSelectedFiles,
    selectedFiles,
    folderSelected,
    refreshList,
  } = props;

  const updateFileName = async () => {
    if (editFileNameActive && folderSelected !== null) {
      const token = await JSON.parse(await getItem("token"));
      const response = await changeFileName(
        token,
        folderSelected,
        fileName,
        fileNameEditing,
        fileType
      );
      if (response.status === 200) {
        if (response.data.isError === false) {
          setEditFileNameActive(false);
          refreshList();
        }
        if (response.data.isError === true) {
          console.log(response.data);
        }
      }
    }
  };

  const getImagePathIcon = (fileType: string) => {
    switch (fileType) {
      case "AI":
        return "/svg/Icon=AI.svg";
        break;
      case "AVI":
        return "/svg/Icon=AVI.svg";
        break;
      case "DOC":
        return "/svg/Icon=DOC.svg";
        break;
      case "GIF":
        return "/svg/Icon=GIF.svg";
        break;
      case "MKV":
        return "/svg/Icon=MKV.svg";
        break;
      case "MP3":
        return "/svg/Icon=MP3.svg";
        break;
      case "PDF":
        return "/svg/Icon=PDF.svg";
        break;
      case "PG":
        return "/svg/Icon=PG.svg";
        break;
      case "PPT":
        return "/svg/Icon=PPT.svg";
        break;
      case "PSD":
        return "/svg/Icon=PSD.svg";
        break;
      case "SVG":
        return "/svg/Icon=SVG.svg";
        break;
      case "TXT":
        return "/svg/Icon=TXT.svg";
        break;
      case "XLS":
        return "/svg/Icon=XLS.svg";
        break;
      case "ZIP":
        return "/svg/Icon=ZIP.svg";
        break;
      default:
        return "/svg/Icon=NONE.svg";
        break;
    }
  };

  return (
    <div className="flex flex-row gap-3 items-center">
      <input
        type="checkbox"
        name=""
        id=""
        className=" h-5 w-5 border-[2px] border-[#9A9AAF] dark:border-[#64646F] rounded-sm bg-transparent focus:outline-none transition duration-200 "
        onChange={(e) => {
          if (e.target.checked) {
            setSelectedFiles([...selectedFiles, `${fileName}.${fileType}`]);
          } else {
            setSelectedFiles(
              selectedFiles.filter(
                (selectedFile) => selectedFile !== `${fileName}.${fileType}`
              )
            );
          }
        }}
        checked={selectedFiles.includes(`${fileName}.${fileType}`)}
        ref={checkBoxRef}
      />
      <div className="flex flex-row gap-5 ml-3 items-center w-10/12 h-full">
        <img src={getImagePathIcon(fileType.toUpperCase())} alt="" />
        <div className="flex flex-col justify-between">
          {editFileNameActive ? (
            <input
              type="text"
              className="w-full h-full bg-transparent focus:outline-none transition duration-200"
              value={fileNameEditing}
              onKeyDown={(e) => {
                if (e.key === "Enter") {
                  setEditFileNameActive(false);
                  setSelectedFiles(
                    selectedFiles.filter(
                      (selectedFile) =>
                        selectedFile !== `${fileName}.${fileType}`
                    )
                  );
                  updateFileName();
                }
              }}
              onChange={(e) => {
                setFileNameEditing(e.target.value);
              }}
              onMouseLeave={() => {
                setEditFileNameActive(false);
                if (fileNameEditing !== fileName) {
                  setSelectedFiles(
                    selectedFiles.filter(
                      (selectedFile) =>
                        selectedFile !== `${fileName}.${fileType}`
                    )
                  );
                  updateFileName();
                }
                setFileNameEditing(fileName);
              }}
              autoFocus
              ref={inputTextRef}
            />
          ) : (
            <p
              className="font-semibold font-[14px] text-[#07070C] dark:text-[#F1F1F1]"
              onDoubleClick={(e) => {
                e.preventDefault();
                setEditFileNameActive(true);
                if (inputTextRef.current) {
                  inputTextRef.current.focus();
                }
              }}
            >
              {fileName}
            </p>
          )}
          <p className="text-[#9A9AAF] dark:text-[#64646F] font-[12px]">
            on{" "}
            {
              // on 2022/02/17 at 11:21 AM
              new Date(fileDate).toLocaleDateString() +
                " at " +
                new Date(fileDate).toLocaleTimeString("en-US", {
                  hour: "numeric",
                  minute: "numeric",
                  hour12: true,
                })
            }
          </p>
        </div>
        <div className="ml-auto lg:flex flex-row gap-4">
          <p className="text-[#7E7E8F] dark:text-[#8B8B93] font-[10px]">
            {fileSize}
          </p>
        </div>
      </div>
    </div>
  );
}
