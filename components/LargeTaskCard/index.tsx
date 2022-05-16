import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { deleteTask } from "../../helpers/serverRequests/tasks";
import {
  getAssignedImagesUsers,
  getUser,
} from "../../helpers/serverRequests/user";
import UserIcon from "../UserIcon";

interface LargeTaskCardProps {
  _id: string;
  title: string;
  category: string;
  author: any;
  progress: number;
  createdAt: Date;
  status: string;
  assignedUsers: string[];
  priority: string;

  setModalDeleteTask: (value: boolean) => void;
  setSuccessDeleteTask: (value: boolean) => void;
  deleteTaskFunction: (value: string) => void;
  successDeleteTask: boolean;
  modalDeleteTask: boolean;
}

export default function LargeTaskCard(props: LargeTaskCardProps) {
  const [authorData, setAuthorData] = useState({
    userName: "",
    avatar: "",
  });
  const { title, category, author, progress, createdAt, status } = props;
  const [progressBarColor, setProgressBarColor] = useState("");
  const [isLoading, setIsLoading] = useState(true);
  const [assignedUsers, setAssignedUsers] = useState([]);

  //Restart two dates
  const startDate = new Date(createdAt);
  const endDate = new Date();
  const timeDiff = Math.abs(endDate.getTime() - startDate.getTime());

  const [dropDownOptions, setDropDownOptions] = useState(false);

  const getAuthorData = async () => {
    try {
      const token = await JSON.parse(await getItem("token"));
      const response = await getUser(token, author);
      if (response.status === 200) {
        if (response.data.isError === false) {
          setIsLoading(false);
          setAuthorData(response.data.user);
        } else {
          setAuthorData({
            userName: "",
            avatar: "",
          });
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAssignedUsers = async () => {
    try {
      const token = await JSON.parse(await getItem("token"));
      const response = await getAssignedImagesUsers(
        token,
        props.assignedUsers.join(",")
      );
      if (response.status === 200) {
        if (response.data.isError === false) {
          setIsLoading(false);
          setAssignedUsers(response.data.users);
        } else {
          setAssignedUsers([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  function changeColorByStatus(status: any) {
    switch (status) {
      case "Pending":
        setProgressBarColor("#2775FF");
        break;
      case "In Progress":
        setProgressBarColor("#EC8C56");
        break;
      case "Completed":
        setProgressBarColor("#50D1B2");
        break;
      default:
        setProgressBarColor("#fff");
        break;
    }
  }
  useEffect(() => {
    getAuthorData();
    changeColorByStatus(status);
    if (props.assignedUsers.length > 0) getAssignedUsers();
  }, []);

  return (
    <div className="flex flex-col md:flex-row w-full h-full rounded-xl bg-white dark:bg-[#1F2128] border-[1px] border-[#E8EDF2] dark:border-[#313442] p-5 mt-5 px-5 items-start md:items-center">
      <div className="mr-5">
        {isLoading ? (
          <svg
            role="status"
            className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
        ) : (
          <UserIcon userName={authorData.userName} avatar={authorData.avatar} />
        )}
      </div>
      <div className="mt-5 md:mt-0 flex flex-col w-full h-full gap-2 mr-5">
        <p className="text-[14px] text-[#07070C] dark:text-[#FFFFFF] font-semibold">
          {title}
        </p>
        <div className="flex flex-col md:flex-row w-full h-full gap-4 items-start md:items-center">
          <div className="flex flex-row items-center gap-1">
            <img src="/svg/briefcaseIcon.svg" alt="" width={15} height={15} />
            <p className="text-[14px] text-[#9A9AAF] dark:text-[#8A8A98]">
              {props.priority}
            </p>
          </div>
          <div className="flex flex-row items-center gap-1">
            <img src="/svg/clockIcon.svg" alt="" />
            <p className="text-[14px] text-[#9A9AAF] dark:text-[#8A8A98]">
              {timeDiff < 86400000
                ? `${Math.floor(timeDiff / 3600000)}h ${Math.floor(
                    (timeDiff % 3600000) / 60000
                  )}m`
                : `${Math.floor(timeDiff / 86400000)}d ${Math.floor(
                    (timeDiff % 86400000) / 3600000
                  )}h`}
            </p>
          </div>
        </div>
      </div>
      <div className="hidden md:flex flex-col w-full h-full justify-center gap-2">
        <p className="text-[14px] text-[#9A9AAF] dark:text-[#64646F]">
          Team Members
        </p>
        <div className="flex flex-row w-full h-full -space-x-2 overflow-hidden">
          {assignedUsers.length !== 0 ? (
            assignedUsers.length >= 3 ? (
              assignedUsers
                .slice(0, 3)
                .map((user: any) => (
                  <UserIcon
                    key={`Large-${user.userName}`}
                    userName={user.userName}
                    avatar={user.avatar}
                    isListMembers
                  />
                ))
            ) : (
              assignedUsers.map((user: any) => (
                <UserIcon
                  key={`Large-${user.userName}`}
                  userName={user.userName}
                  avatar={user.avatar}
                  isListMembers
                />
              ))
            )
          ) : (
            <p className="text-[10px] text-[#9A9AAF] dark:text-[#64646F]">
              Not have assigned Users
            </p>
          )}
          {assignedUsers.length >= 3 && (
            <UserIcon userName={`+${assignedUsers.length - 3}`} isListMembers />
          )}
        </div>
      </div>
      <div className="hidden lg:flex flex-row w-full h-full items-end max-w-[20%]">
        <span className={`text-[16px] text-[#7E7E8F] dark:text-[#8B8B93] mr-3`}>
          {`${progress}%`}
        </span>
        <div className="flex flex-col justify-center gap-1 w-full h-full">
          <p className="text-[14px] text-[#9A9AAF] dark:text-[#64646F]">
            Progress
          </p>
          <div className="w-full bg-[#E8EDF2] rounded-full h-2.5 dark:bg-[#313442]">
            <div
              className={`h-2.5 rounded-full`}
              style={{
                width: `${progress}%`,
                backgroundColor: progressBarColor,
              }}
            ></div>
          </div>
        </div>
      </div>
      <div className="h-full w-1/12 flex items-center justify-center flex-col relative">
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
          } bg-white dark:bg-[#1F2128] absolute bottom-[-8em] right-[-1em] md:right-[1em] rounded-xl border-[1px] border-[#E8EDF2] dark:border-[#313442] p-2 mt-2`}
          onMouseLeave={() => setDropDownOptions(false)}
        >
          <div className="inline-flex flex-col">
            <Link href={`/dashboard/task/${props._id}`}>
              <a className="block mx-auto text-[14px] text-[#7E7E8F] dark:text-[#8B8B93] hover:bg-[#F5F5FA] hover:text-[#07070C] dark:hover:bg-[#0F0F12] dark:hover:text-[#fff] py-3 px-5 rounded-[8px] cursor-pointer">
                Edit
              </a>
            </Link>
            <div className="w-11/12 h-[1px] block mx-auto bg-[#F5F5FA] dark:bg-[#313442] my-2"></div>
            <a
              className="block mx-auto text-[14px] text-[#7E7E8F] dark:text-[#8B8B93] hover:bg-[#F5F5FA] hover:text-[#07070C] dark:hover:bg-[#0F0F12] dark:hover:text-[#fff] py-3 px-5 rounded-[8px] cursor-pointer"
              onClick={() => {
                props.setModalDeleteTask(true);
              }}
            >
              Delete
            </a>
          </div>
        </div>
      </div>
      <div
        id="modalDeleteTask"
        tabIndex={-1}
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 bottom-0 right-0 left-0 z-[60] w-full md:inset-0 h-modal md:h-full  flex items-center justify-center ${
          props.modalDeleteTask ? "block" : "hidden"
        }`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full min-h-[20vh] md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-[#1F2128] border border-[#E8EDF2] dark:border-[#313442] min-h-[20vh]">
            <div className="flex justify-between items-start p-5 rounded-t dark:border-gray-600">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  props.setModalDeleteTask(false);
                  props.setSuccessDeleteTask(false);
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
            <h1 className="font-semibold text-[20px] text-[#07070C] text-center dark:text-white">
              Delete Task
            </h1>
            <div
              className={`p-5 w-11/12 mx-auto rounded-xl mt-5 text-white bg-green-600 dark:bg-green-700 text-center ${
                props.successDeleteTask ? "block" : "hidden"
              }`}
            >
              <p>Task successfully deleted</p>
            </div>
            <div className="p-6 space-y-6 mt-2 h-full">
              <div className="flex flex-col gap-5 justify-between">
                <h1 className="font-medium text-[14px] text-[#07070C] text-left dark:text-white">
                  Are you sure you want to delete this task?
                </h1>
                <div className="flex flex-row justify-center items-center gap-5 mt-5">
                  <button
                    type="button"
                    className="bg-[#E23738] text-white font-semibold py-2 px-4 rounded-lg text-sm dark:text-white"
                    onClick={() => {
                      props.deleteTaskFunction(props._id);
                    }}
                  >
                    Delete
                  </button>
                  <button
                    type="button"
                    className="bg-[#E8EDF2] text-[#B8B1E4] font-semibold py-2 px-4 rounded-lg text-sm dark:bg-[#313442]"
                    onClick={() => {
                      props.setModalDeleteTask(false);
                      props.setSuccessDeleteTask(false);
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
    </div>
  );
}
