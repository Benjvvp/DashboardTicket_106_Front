import Image from "next/image";
import { useEffect, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { getTasks } from "../../helpers/serverRequests/tasks";
import SmallTaskCard from "../SmallTaskCard";

interface TaskCardProps{
      name: string;
      countShow: number;
      typeOfTaskDisplay: 'Pending' | 'In Progress' | 'Completed';
}

interface SmallTaskCardProps {
      title: String;
      category: String;
      author: any;
      progress: Number;
      createdAt: Date;
      status: String;
}

export default function TaskCard(props: TaskCardProps){
      const { name, countShow, typeOfTaskDisplay } = props;
      const [taskList, setTaskList] = useState([]);

      const initializeGetTasks = async () => {
            try {
                  let token = await JSON.parse(await getItem('token'));

                  const response = await getTasks(token);
                  if(response.status === 200) {
                        setTaskList(response.data.tasks.filter((task: { status: string; }) => task.status === typeOfTaskDisplay));
                  }
                  if(response.status === 500){
                        setTaskList([]);
                  }
            } catch (error) {
                  console.log(error)
            }
      };

      useEffect(() => {
            initializeGetTasks();
      }, []);
      
      return (
            <div className="flex flex-col w-full h-full py-2 px-5 bg-white rounded-xl border-[1px] border-[#E8EDF2] dark:bg-[#1F2128] dark:border-[#313442] mb-5">
                  <div className="flex flex-row justify-between items-center pb-2 border-b-[1px] border-[#E8EDF2] dark:border-[#313442]">
                        <h4 className="font-semibold text-[16px] text-[#07070C] dark:text-white mt-2">{name}</h4>
                  </div>
                  <div className="flex flex-col w-full h-full">
                        {taskList.map((task: SmallTaskCardProps, index: number) => {
                              if(index < countShow){
                                    return <SmallTaskCard key={index} {...task} />
                              }
                        })}
                  </div>
            </div>

      )
}