import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../contexts/userContext/UserContext";
import { getItem } from "../../helpers/localStorage";
import {
  addUserToTask,
  createTask,
  getTask,
  removeUserToTask,
} from "../../helpers/serverRequests/tasks";
import {
  getAllUsers,
  getUser,
  getUsers,
} from "../../helpers/serverRequests/user";
import { DropDownInput, InputDefault, TextAreaInput } from "../Inputs";
import UserIcon from "../UserIcon";

interface propsTaskAddUserModal {
  modalAddUser: boolean;
  setModalAddUser: (value: boolean) => void;
  setIsModalActive: (value: boolean) => void;
  idTask: string;
  setIdTask: (value: string) => void;
}

export default function TaskAddUserModal(props: propsTaskAddUserModal) {
  const { userData } = useContext(UserContext);
  const { modalAddUser, setModalAddUser, setIsModalActive } = props;
  const [author, setAuthor] = useState({
    _id: "",
    userName: "",
    email: "",
    avatar: "",
  });

  const [allUsers, setAllUsers] = useState([]);
  const [usersIdInTask, setUsersIdInTask] = useState([]);
  const [usersInTask, setUsersInTask] = useState([]);

  const getUsersIdFromTask = async () => {
    let token = await JSON.parse(await getItem("token"));
    const response = await getTask(token, props.idTask);
    if (response.status === 200) {
      if (response.data.isError === false) {
        setUsersIdInTask(response.data.task.assignedUsers);
      } else {
        console.log(response.data.message);
      }
    }
  };

  const removeUserFromTask = async (idUser: string) => {
    let token = await JSON.parse(await getItem("token"));
    const response = await removeUserToTask(token, props.idTask, idUser);
    if (response.status === 200) {
      if (response.data.isError === false) {
        getUsersIdFromTask();
      } else {
        console.log(response.data);
      }
    }
  };

  const addUserFromTask = async (idUser: string) => {
    let token = await JSON.parse(await getItem("token"));
    const response = await addUserToTask(token, props.idTask, idUser);
    if (response.status === 200) {
      if (response.data.isError === false) {
        getUsersIdFromTask();
      } else {
        console.log(response.data);
      }
    }
  };

  const getUsersFromId = async () => {
    if (usersIdInTask.length === 0) return;
    let token = await JSON.parse(await getItem("token"));
    const response = await getUsers(token, usersIdInTask);
    if (response.status === 200) {
      if (response.data.isError === false) {
        setUsersInTask(
          response.data.users.filter(
            (user: { userName: string }) => user.userName !== author.userName
          )
        );
      } else {
        setUsersInTask([]);
        console.log(response.data);
      }
    }
  };

  const getAllUsersFromDB = async () => {
    let token = await JSON.parse(await getItem("token"));
    const response = await getAllUsers(token);
    if (response.status === 200) {
      if (response.data.isError === false) {
        setAllUsers(
          response.data.users.filter(
            (user: { userName: string }) => user.userName !== author.userName
          )
        );
      } else {
        setAllUsers([]);
        console.log(response.data.message);
      }
    }
  };

  const getAuthor = async () => {
    let token = await JSON.parse(await getItem("token"));
    const response = await getUser(token, userData._id);
    if (response.status === 200) {
      if (response.data.isError === false) {
        setAuthor(response.data.user);
      } else {
        console.log(response.data);
      }
    }
  };

  useEffect(() => {
    if (props.idTask) {
      getAuthor();
      getUsersFromId();
      getUsersIdFromTask();
      getAllUsersFromDB();
    }
  }, [props.idTask, usersIdInTask]);

  return (
    <div
      id="modalFormTask"
      tabIndex={-1}
      aria-hidden="true"
      className={`overflow-y-auto overflow-x-hidden fixed top-0 bottom-0 right-0 left-0 z-[60] w-full md:inset-0 h-modal md:h-full  flex items-center justify-center ${
        modalAddUser ? "block" : "hidden"
      }`}
    >
      <div className="relative p-4 w-full max-w-2xl h-full min-h-[70vh] md:h-auto">
        <div className="relative bg-white rounded-lg shadow dark:bg-[#1F2128] border border-[#E8EDF2] dark:border-[#313442] min-h-[70vh]">
          <div className="flex justify-between items-start p-5 rounded-t dark:border-gray-600">
            <button
              type="button"
              className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
              onClick={() => {
                setModalAddUser(false);
                setIsModalActive(false);
                props.setIdTask("");
                setAllUsers([]);
                setUsersIdInTask([]);
                setUsersInTask([]);
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
            User Assignment
          </h1>
          <div className="p-5">
            <div className="flex flex-col justify-center items-start mb-4 border-b-[1px] pb-5 border-[#7E7E8F] dark:border-[#313442]">
              <div className="flex items-center justify-start w-full">
                <UserIcon userName={author.userName} avatar={author.avatar} />
                <div className="ml-4">
                  <p className="text-[#323338] dark:text-white">
                    {author.userName}
                  </p>
                </div>
                <p className="ml-auto py-2 px-4 border border-transparent text-[14px] rounded-md text-[#7E7E8F] dark:text-[#8B8B93]">
                  Owner
                </p>
              </div>
            </div>
            <h2 className="font-semibold text-[16px] text-[#07070C] text-left dark:text-white mb-[2.5em] pt-5">
              Users in task
            </h2>
            {usersInTask.length > 0 ? (
              usersInTask.map((user: any, index: any) => {
                return (
                  <div
                    key={index}
                    className="flex flex-col justify-center items-start mb-4"
                  >
                    <div className="flex items-center justify-start w-full">
                      <div className="hidden md:block">
                        <UserIcon
                          userName={user.userName}
                          avatar={user.avatar}
                        />
                      </div>
                      <div className="md:ml-4">
                        <p className="text-gray-700 dark:text-[#F1F1F1]">
                          {user.userName}
                        </p>
                        <p className="text-gray-500 dark:text-[#64646F] text-[14px] md:text-sm">
                          {user.email}
                        </p>
                      </div>
                      <button
                        type="submit"
                        className="ml-auto py-2 px-1 md:px-4 border border-transparent text-[12px] md:text-[14px] font-medium rounded-md text-white bg-[#D82325] transition transition-all"
                        onClick={() => {
                          removeUserFromTask(user._id);
                        }}
                      >
                        Remove
                      </button>
                    </div>
                  </div>
                );
              })
            ) : (
              <p className="text-gray-700 dark:text-white">No users assigned</p>
            )}
          </div>
          <div className="p-5">
            <h2 className="font-semibold text-[16px] text-[#07070C] text-left dark:text-white mb-[2.5em]">
              All users
            </h2>
            {allUsers.length > 0 ? (
              allUsers
                .filter((user: any) => {
                  return !usersInTask
                    .map((user: any) => user._id)
                    .includes(user._id);
                })
                .map((user: any, index: any) => {
                  return (
                    <div
                      key={index}
                      className="flex flex-col justify-center items-start mb-4"
                    >
                      <div className="flex items-center justify-start w-full">
                        <div className="hidden md:block">
                          <UserIcon
                            userName={user.userName}
                            avatar={user.avatar}
                          />
                        </div>
                        <div className="md:ml-4">
                          <p className="text-gray-700 dark:text-[#F1F1F1]">
                            {user.userName}
                          </p>
                          <p className="text-gray-500 dark:text-[#64646F] text-[14px] md:text-sm">
                            {user.email}
                          </p>
                        </div>
                        <button
                          type="submit"
                          className="ml-auto py-2 px-2 md:px-4 border border-transparent text-[14px] font-medium rounded-md text-white bg-[#7364DB] hover:bg-[#7364DB] transition transition-all"
                          onClick={() => {
                            addUserFromTask(user._id);
                          }}
                        >
                          Add
                        </button>
                      </div>
                    </div>
                  );
                })
            ) : (
              <p className="text-gray-700 dark:text-white">No users assigned</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
