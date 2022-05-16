import Image from "next/image";
import { useEffect, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { deleteTask, getTasks } from "../../helpers/serverRequests/tasks";
import SmallTaskCard from "../SmallTaskCard";

interface TaskCardProps {
  name: string;
  countShow: number;
  typeOfTaskDisplay: "Pending" | "In Progress" | "Completed";
  clickHandlerTaskAdd: () => void;
  clickHandlerUserAdd: () => void;
  setIdTask: (value: string) => void;
}

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

  setModalDeleteTask: (value: boolean) => void;
  setSuccessDeleteTask: (value: boolean) => void;
  deleteTaskFunction: (value: string) => void;
  successDeleteTask: boolean;
  modalDeleteTask: boolean;
}

export default function TaskCard(props: TaskCardProps) {
  const { name, countShow, typeOfTaskDisplay } = props;
  const [taskList, setTaskList] = useState([]);

  const [successDeleteTask, setSuccessDeleteTask] = useState(false);
  const [modalDeleteTask, setModalDeleteTask] = useState(false);

  const initializeGetTasks = async () => {
    try {
      let token = await JSON.parse(await getItem("token"));

      const response = await getTasks(token);
      if (response.status === 200) {
        if (response.data.isError === false) {
          setTaskList(
            response.data.tasks.filter(
              (task: { status: string }) => task.status === typeOfTaskDisplay
            )
          );
        } else {
          setTaskList([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTaskFunction = async (taskId: string) => {
    try {
      let token = await JSON.parse(await getItem("token"));
      const response = await deleteTask(token, taskId);
      if (response.status === 200) {
        if (response.data.isError === false) {
          setSuccessDeleteTask(true);
        } else {
          setSuccessDeleteTask(false);
          setModalDeleteTask(false);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initializeGetTasks();
  }, [taskList, successDeleteTask]);

  return (
    <div className="flex flex-col w-full h-full py-2 px-5 bg-white rounded-xl border-[1px] border-[#E8EDF2] dark:bg-[#1F2128] dark:border-[#313442] mb-5">
      <div className="flex flex-row justify-between items-center pb-2 border-b-[1px] border-[#E8EDF2] dark:border-[#313442]">
        <h4 className="font-semibold text-[16px] text-[#07070C] dark:text-white mt-2">
          {name}
        </h4>
      </div>
      <div className="flex flex-col w-full h-full">
        {taskList && taskList.length > 0 ? (
          taskList.map((task: SmallTaskCardProps, index: number) => {
            if (index < countShow) {
              return (
                <SmallTaskCard
                  key={index}
                  {...task}
                  clickHandlerUserAdd={props.clickHandlerUserAdd}
                  setIdTask={props.setIdTask}
                  deleteTaskFunction={deleteTaskFunction}
                  setModalDeleteTask={setModalDeleteTask}
                  setSuccessDeleteTask={setSuccessDeleteTask}
                  successDeleteTask={successDeleteTask}
                  modalDeleteTask={modalDeleteTask}
                />
              );
            }
          })
        ) : (
          <div className="flex flex-col w-full h-full  mt-5">
            <h4 className="text-left text-[16px] text-[#9A9AAF] dark:text-[#8A8A98] mb-5">
              No tasks
            </h4>
          </div>
        )}
      </div>
      <button
        type="button"
        className="bg-[#7364DB] w-8/12 sm:w-3/12 text-white font-semibold py-2 px-2 sm:py-3 sm:px-4 rounded-lg text-sm mb-4 mt-4"
        onClick={props.clickHandlerTaskAdd}
      >
        Add New
      </button>
    </div>
  );
}
