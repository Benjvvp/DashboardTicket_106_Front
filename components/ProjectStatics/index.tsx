import { useEffect, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { getTasks } from "../../helpers/serverRequests/tasks";
import Image from "next/image";
import 'chart.js/auto'
import { Chart, Doughnut } from "react-chartjs-2";
export default function ProjectStatics() {
  const [taskList, setTaskList] = useState([]);

  const initializeGetTasks = async () => {
    try {
      let token = await JSON.parse(await getItem("token"));

      const response = await getTasks(token);
      if (response.status === 200) {
        setTaskList(response.data.tasks);
      }
      if (response.status === 500) {
        setTaskList([]);
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initializeGetTasks();
  }, []);

  const options = {
    plugins: {
      legend: {
        display: false,
      },
    },
    elements: {
      arc: {
        borderJoinStyle: "bevel",
      }
    }
  };
  const data = {
    backgroundColor: ["rgb(39, 117, 255)", "rgb(236, 140, 86)", "rgb(80, 209, 178)"],
    labels: ["Pending", "In Progress", "Completed"],
    datasets: [
      {
        borderRadius: 100,
        data: [
          taskList.filter((task:any) => task.status === "Pending").length,
          taskList.filter((task:any) => task.status === "In Progress").length,
          taskList.filter((task:any) => task.status === "Completed").length,
        ],
        backgroundColor: ["rgb(39, 117, 255)", "rgb(236, 140, 86)", "rgb(80, 209, 178)"],
        hoverOffset: 1,
      },
    ],
  };

  return (
    <div className="flex flex-col w-full h-full py-2 px-5 bg-white rounded-xl border-[1px] border-[#E8EDF2] dark:bg-[#1F2128] dark:border-[#313442] mb-5">
      <div className="flex flex-row justify-between items-center pb-2 border-b-[1px] border-[#E8EDF2] dark:border-[#313442]">
        <h4 className="font-semibold text-[16px] text-[#07070C] dark:text-white">
          Project Statics
        </h4>
      </div>
      <div className="flex flex-col w-full h-full">
        <Doughnut data={data} width={10} height={10} options={options} />
      </div>
    </div>
  );
}
