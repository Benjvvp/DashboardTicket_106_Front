import { useEffect, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { getTasks } from "../../helpers/serverRequests/tasks";
import Image from "next/image";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js";
export default function ProjectStatics() {
  const [taskList, setTaskList] = useState([]);
  const [averageForPendingTask, setAverageForPendingTask] = useState(0);
  const [averageForInProgressTask, setAverageForInProgressTask] = useState(0);
  const [averageForCompletedTask, setAverageForCompletedTask] = useState(0);
  const [dataShowing, setDataShowing] = useState(0);

  const initializeGetTasks = async () => {
    try {
      const token = await JSON.parse(await getItem("token"));

      const response = await getTasks(token);
      if (response.status === 200) {
        if (response.data.isError === false) {
          setTaskList(response.data.tasks);
        } else {
          setTaskList([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initializeGetAverageForPendingTask = async (tasks: any) => {
    try {
      let pendingTask = 0;
      await tasks.forEach((task: any) => {
        if (task.status === "Pending") {
          pendingTask++;
        }
      });
      setAverageForPendingTask(pendingTask / tasks.length);
    } catch (error) {
      console.log(error);
    }
  };
  const initializeGetAverageForInProgressTask = async (tasks: any) => {
    try {
      let inProgressTask = 0;
      await tasks.forEach((task: any) => {
        if (task.status === "In Progress") {
          inProgressTask++;
        }
      });
      setAverageForInProgressTask(inProgressTask / tasks.length);
    } catch (error) {
      console.log(error);
    }
  };
  const initializeGetAverageForCompletedTask = async (tasks: any) => {
    try {
      let completedTask = 0;
      await tasks.forEach((task: any) => {
        if (task.status === "Completed") {
          completedTask++;
        }
      });
      setAverageForCompletedTask(completedTask / tasks.length);
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initializeGetTasks();
    if (taskList.length > 0) {
      initializeGetAverageForPendingTask(taskList);
      initializeGetAverageForInProgressTask(taskList);
      initializeGetAverageForCompletedTask(taskList);
      setDataShowing(
        averageForPendingTask +
          averageForInProgressTask +
          averageForCompletedTask
      );
    }
  }, [
    averageForCompletedTask,
    averageForInProgressTask,
    averageForPendingTask,
    taskList,
  ]);

  const options = {
    cutout: 100,
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

  const data = {
    backgroundColor: [
      "rgb(49, 52, 66)",
      "rgb(39, 117, 255)",
      "rgb(236, 140, 86)",
      "rgb(80, 209, 178)",
    ],
    datasets: [
      {
        data: [
          taskList.length === 0 ? 1 : 0,
          averageForPendingTask,
          averageForInProgressTask,
          averageForCompletedTask,
        ],
        backgroundColor: [
          "rgb(49, 52, 66)",
          "rgb(39, 117, 255)",
          "rgb(236, 140, 86)",
          "rgb(80, 209, 178)",
        ],
        borderWidth: 0,
      },
    ],
  };

  return (
    <div className="hidden md:flex flex-col w-full h-4/12 py-2 px-5 bg-white rounded-xl border-[1px] border-[#E8EDF2] dark:bg-[#1F2128] dark:border-[#313442]">
      <div className="flex flex-row justify-between items-center pb-2 border-b-[1px] border-[#E8EDF2] dark:border-[#313442]">
        <h4 className="font-semibold text-[16px] text-[#07070C] dark:text-white">
          Project Statics
        </h4>
      </div>
      <div className="flex flex-row p-5 w-full md:w-9/12 relative justify-center text-center mx-auto my-5">
        <Doughnut data={data} options={options} className="w-10/12 h-full" />
        <div className="flex flex-col w-full h-full gap-2 justify-center ml-10">
          <div className="flex flex-row gap-2 items-center">
            <div className="h-[11px] w-[11px] bg-[#50D1B2] rounded-[2px]"></div>
            <p className="text-[#07070C] dark:text-white">Completed</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="h-[11px] w-[11px] bg-[#EC8C56] rounded-[2px]"></div>
            <p className="text-[#07070C] dark:text-white">In Progress</p>
          </div>
          <div className="flex flex-row gap-2 items-center">
            <div className="h-[11px] w-[11px] bg-[#2775FF] rounded-[2px]"></div>
            <p className="text-[#07070C] dark:text-white">Pending</p>
          </div>
        </div>
      </div>
    </div>
  );
}
