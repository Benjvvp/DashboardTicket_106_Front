import Image from "next/image";
import { useEffect, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { deleteTask, getTasks } from "../../helpers/serverRequests/tasks";
import LargeTaskCard from "../LargeTaskCard";
import Pagination from "../Pagination";

interface TaskCardProps {
  name: string;
  countShow: number;
}

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

export default function TaskLargeListCards(props: TaskCardProps) {
  const { name, countShow } = props;
  const [allTasks, setAllTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(1);

  const [successDeleteTask, setSuccessDeleteTask] = useState(false);
  const [modalDeleteTask, setModalDeleteTask] = useState(false);

  const initializeGetTasks = async () => {
    try {
      const token = await JSON.parse(await getItem("token"));

      const response = await getTasks(token);
      if (response.status === 200) {
        if (response.data.isError === false) {
          const sortedTasks = response.data.tasks.sort(
            (a: LargeTaskCardProps, b: LargeTaskCardProps) => {
              return (
                new Date(b.createdAt).getTime() -
                new Date(a.createdAt).getTime()
              );
            }
          );
          setAllTasks(sortedTasks);
          setCountPage(Math.ceil(response.data.tasks.length / countShow));
        } else {
          setAllTasks([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTaskFunction = async (taskId: string) => {
    try {
      const token = await JSON.parse(await getItem("token"));
      const response = await deleteTask(token, taskId);
      if (response.data.isError === false) {
        setSuccessDeleteTask(true);
      } else {
        setSuccessDeleteTask(false);
        setModalDeleteTask(false);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initializeGetTasks();
  }, [currentPage, successDeleteTask]);

  return (
    <div className="flex flex-col w-full h-full py-2 px-5 bg-white rounded-xl border-[1px] border-[#E8EDF2] dark:bg-[#1F2128] dark:border-[#313442] mb-[12em] md:mb-[5em]">
      <div className="flex flex-row justify-between items-center pb-2 border-b-[1px] border-[#E8EDF2] dark:border-[#313442]">
        <h4 className="font-semibold text-[16px] text-[#07070C] dark:text-white mt-2">
          {name}
        </h4>
      </div>
      <div className="flex flex-col w-full h-full">
        {allTasks.length === 0 ? (
          <div className="flex flex-col w-full h-full justify-center mt-5">
            <h4 className="text-left text-[16px] text-[#9A9AAF] dark:text-[#8A8A98]">
              No tasks
            </h4>
          </div>
        ) : (
          allTasks.map((task: LargeTaskCardProps, index: number) => {
            if (
              index >= (currentPage - 1) * countShow &&
              index < currentPage * countShow
            ) {
              return (
                <LargeTaskCard
                  key={`${index}-${task.author}`}
                  {...task}
                  deleteTaskFunction={deleteTaskFunction}
                  setModalDeleteTask={setModalDeleteTask}
                  setSuccessDeleteTask={setSuccessDeleteTask}
                  successDeleteTask={successDeleteTask}
                  modalDeleteTask={modalDeleteTask}
                />
              );
            }
          })
        )}
      </div>
      <Pagination
        count={countPage}
        currentPage={1}
        buttonNext={true}
        setCurrentPage={setCurrentPage}
      />

      <div
        className={`top-0 left-0 fixed w-full h-full bg-[#07070C] opacity-[.6] z-[55] ${
          modalDeleteTask ? "block" : "hidden"
        }`}
      ></div>
    </div>
  );
}
