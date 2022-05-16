import { useContext, useEffect, useMemo, useState } from "react";
import { Chart, Doughnut } from "react-chartjs-2";
import { getItem } from "../../helpers/localStorage";
import {
  getAssignedImagesUsers,
  getUser,
} from "../../helpers/serverRequests/user";
import UserIcon from "../UserIcon";

import "chart.js/auto";
import { UserContext } from "../../contexts/userContext/UserContext";
import Link from "next/link";

interface SmallTaskCardProps {
  _id: string;
  title: string;
  priority: string;
  author: any;
  progress: number;
  createdAt: Date;
  status: string;
  description: string;
  assignedUsers: string[];
  clickHandlerUserAdd: () => void;
  setIdTask: (value: string) => void;

  setModalDeleteTask: (value: boolean) => void;
  setSuccessDeleteTask: (value: boolean) => void;
  deleteTaskFunction: (value: string) => void;
  successDeleteTask: boolean;
  modalDeleteTask: boolean;
}

export default function SmallTaskCard(props: SmallTaskCardProps) {
  const { userData } = useContext(UserContext);
  const [authorData, setAuthorData] = useState({
    userName: "",
    avatar: "",
  });
  const {
    title,
    priority,
    description,
    author,
    progress,
    createdAt,
    status,
    _id,
  } = props;
  const [progressBarColor, setProgressBarColor] = useState("");
  const [textColorPriority, setTextColorPriority] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [assignedUsers, setAssignedUsers] = useState([]);

  const [dropDownOptions, setDropDownOptions] = useState(false);
  const formatDate = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

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

  function changeColorByPriority(priority: any) {
    switch (priority) {
      case "High":
        setTextColorPriority("#E23738");
        break;
      case "Medium":
        setTextColorPriority("#EC8C56");
        break;
      case "Low":
        setTextColorPriority("#50D1B2");
        break;
    }
  }

  useEffect(() => {
    getAuthorData();
    changeColorByStatus(status);
    changeColorByPriority(priority);
    if (props.assignedUsers.length > 0) getAssignedUsers();
  }, [assignedUsers]);

  const chartData = [progress, 100 - progress];
  const showData = chartData[0] + "%";
  const data = {
    datasets: [
      {
        data: chartData,
        backgroundColor: [progressBarColor, `#A6A6A640`],
        borderWidth: 0,
      },
    ],
    text: showData,
  };

  const counter = {
    id: "counter",
    beforeDraw(chart: any, args: any, options: any) {
      const {
        ctx,
        chartArea: { left, top, right, bottom, width, height },
      } = chart;
      ctx.save();

      ctx.font = "bold 14px Poppins";
      ctx.fillStyle = "#8B8B93";
      ctx.textAlign = "center";
      ctx.fillText(showData, left + width / 2, top + height / 2 + 4);
    },
  };
  const options = {
    cutout: 28,
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  return (
    <div className="flex flex-col w-full rounded-xl bg-white dark:bg-[#1F2128] border-[1px] border-[#E8EDF2] dark:border-[#313442] p-5 mt-5">
      <div className="flex flex-col md:flex-row md:items-center">
        <div className="w-6/12 md:w-2/12 lg:w-3/12 xl:w-2/12 mr-2 mb-3 md:m-0 md:mr-4">
          <Doughnut data={data} options={options} plugins={[counter]} />
        </div>
        <div>
          <p className="text-[14px] text-[#535362] dark:text-[#F1F1F1] font-semibold">
            {title}
          </p>
          <p className="text-[12px] text-[#9A9AAF] dark:text-[#64646F] mt-2">
            {formatDate}
          </p>
        </div>
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
            } bg-white dark:bg-[#1F2128] absolute bottom-[-8em] right-[-1em] md:bottom-[-5em] md:right-0 rounded-xl border-[1px] border-[#E8EDF2] dark:border-[#313442] p-2 mt-2`}
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
      <div className="mt-3">
        <p className="text-[12px] text-[#7E7E8F] dark:text-[#8B8B93] break-words">
          {description.length > 90
            ? description.substring(0, 90) + "..."
            : description}
        </p>
      </div>
      <div className="flex flex-row justify-between mt-5 border-t-[1px] dark:border-[#0F0F12] w-full">
        <div
          className="inline-block bg-[#E8EDF2] dark:bg-[#313442] rounded-md mt-5 text-[10px] text-center py-2 px-4"
          style={{ color: textColorPriority }}
        >
          {priority}
        </div>
        <div className="flex flex-row h-full -space-x-2 overflow-hidden items-end">
          {assignedUsers.length !== 0
            ? assignedUsers.length >= 4
              ? assignedUsers
                  .slice(0, 4)
                  .map((user: any) => (
                    <UserIcon
                      key={`SmallTaskCard-${user.userName}`}
                      userName={user.userName}
                      avatar={user.avatar}
                      isListMembers
                    />
                  ))
              : assignedUsers.map((user: any) => (
                  <UserIcon
                    key={`SmallTaskCard-${user.userName}`}
                    userName={user.userName}
                    avatar={user.avatar}
                    isListMembers
                  />
                ))
            : ""}
          {props.assignedUsers.length >= 4 && (
            <UserIcon
              userName={`+${props.assignedUsers.length - 4}`}
              isListMembers
            />
          )}
          <div
            className={`flex items-center justify-center bg-[#7364DB] w-[30px] h-[30px] rounded-full border-white dark:border-[#0F0F12] border-[1.4px] cursor-pointer ${
              userData.role !== "Admin" ? "cursor-not-allowed" : ""
            }`}
            onClick={() => {
              if (userData.role === "Admin") {
                props.clickHandlerUserAdd();
                props.setIdTask(props._id);
              }
            }}
          >
            <p className="font-bold text-[12px] text-white">+</p>
          </div>
        </div>
      </div>
    </div>
  );
}
