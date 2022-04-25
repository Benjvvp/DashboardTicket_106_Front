import Image from "next/image";
import { useEffect, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { getTasks } from "../../helpers/serverRequests/tasks";
import LargeTaskCard from "../LargeTaskCard";
import Pagination from "../Pagination";

interface TaskCardProps {
  name: string;
  countShow: number;
}

interface LargeTaskCardProps {
  title: String;
  category: String;
  author: any;
  progress: number;
  createdAt: Date;
  status: String;
  assignedUsers: string[];
  priority: String;
}

export default function TaskLargeListCards(props: TaskCardProps) {
  const { name, countShow } = props;
  const [allTasks, setAllTasks] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [countPage, setCountPage] = useState(1);

  const initializeGetTasks = async () => {
    try {
      let token = await JSON.parse(await getItem("token"));

      const response = await getTasks(token);
      if (response.status === 200) {
        //Sort tasks by date
        const sortedTasks = response.data.tasks.sort(
          (a:LargeTaskCardProps, b:LargeTaskCardProps) => {
            return new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime();
          } 
        );
        setAllTasks(sortedTasks);
        setCountPage(Math.ceil(response.data.tasks.length / countShow));
      }
      if (response.status === 500) {
        setAllTasks([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initializeGetTasks();
  }, [currentPage]);

  return (
    <div className="flex flex-col w-full h-full py-2 px-5 bg-white rounded-xl border-[1px] border-[#E8EDF2] dark:bg-[#1F2128] dark:border-[#313442] mb-[5em]">
      <div className="flex flex-row justify-between items-center pb-2 border-b-[1px] border-[#E8EDF2] dark:border-[#313442]">
        <h4 className="font-semibold text-[16px] text-[#07070C] dark:text-white mt-2">
          {name}
        </h4>
      </div>
      <div className="flex flex-col w-full h-full">
        {allTasks.map((task: LargeTaskCardProps, index: number) => {
          if (index >= (currentPage - 1) * countShow && index < currentPage * countShow) {
            return <LargeTaskCard key={index} {...task} />;
          }
        })}
      </div>
      <Pagination 
        count={countPage}
        currentPage={1}
        buttonNext={true}
        setCurrentPage={setCurrentPage}
      />
    </div>
  );
}
