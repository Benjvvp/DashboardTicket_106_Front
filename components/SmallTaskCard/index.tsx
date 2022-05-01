import { useContext, useEffect, useMemo, useState } from "react";
import { Doughnut } from "react-chartjs-2";
import { getItem } from "../../helpers/localStorage";
import {
  getAssignedImagesUsers,
  getUser,
} from "../../helpers/serverRequests/user";
import UserIcon from "../UserIcon";

import "chart.js/auto";
import { UserContext } from "../../contexts/userContext/UserContext";

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
}

export default function SmallTaskCard(props: SmallTaskCardProps) {
  const { userData } = useContext(UserContext);
  const [authorData, setAuthorData] = useState({
    userName: "",
    avatar: "",
  });
  const { title, priority, description, author, progress, createdAt, status, _id } =
    props;
  const [progressBarColor, setProgressBarColor] = useState("");
  const [textColorPriority, setTextColorPriority] = useState("");
  const [isLoading, setIsLoading] = useState(true);

  const [assignedUsers, setAssignedUsers] = useState([]);

  const formatDate = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getAssignedUsers = async () => {
    try {
      let token = await JSON.parse(await getItem("token"));
      const response = await getAssignedImagesUsers(
        token,
        props.assignedUsers.join(",")
      );
      if (response.status === 200) {
        setIsLoading(false);
        setAssignedUsers(response.data.users);
      }
      if (response.status === 500) {
        setAssignedUsers([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getAuthorData = async () => {
    try {
      let token = await JSON.parse(await getItem("token"));
      const response = await getUser(token, author);
      if (response.status === 200) {
        setIsLoading(false);
        setAuthorData(response.data.user);
      }
      if (response.status === 500) {
        setAuthorData({
          userName: "",
          avatar: "",
        });
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
    if(props.assignedUsers.length > 0) getAssignedUsers();
  }, []);

  return (
    <div className="flex flex-col w-full rounded-xl bg-white dark:bg-[#1F2128] border-[1px] border-[#E8EDF2] dark:border-[#313442] p-5 mt-5">
      <div className="flex flex-row">
        <div>
          <p className="text-[14px] text-[#535362] dark:text-[#F1F1F1] font-semibold">
            {title}
          </p>
          <p className="text-[12px] text-[#9A9AAF] dark:text-[#64646F] mt-2">
            {formatDate}
          </p>
        </div>
      </div>
      <div className="mt-3">
        <p className="text-[12px] text-[#7E7E8F] dark:text-[#8B8B93]">
          {description}
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
