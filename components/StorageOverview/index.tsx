import { useEffect, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { getTasks } from "../../helpers/serverRequests/tasks";
import Image from "next/image";
import "chart.js/auto";
import { Doughnut } from "react-chartjs-2";
import Chart from "chart.js";
import { getFilesAverageType } from "../../helpers/serverRequests/files";
export default function StorageOverview() {
  const [averagesList, setAveragesList] = useState<{
    document: number;
    images: number;
    video: number;
    audio: number;
    other: number;
    exe: number;
  }>({
    document: 0,
    images: 0,
    video: 0,
    audio: 0,
    other: 0,
    exe: 0,
  });

  const initializeGetFilesAverageType = async () => {
    try {
      const token = await JSON.parse(await getItem("token"));

      const response = await getFilesAverageType(token);
      if (response.status === 200) {
        if (response.data.isError === false) {
          setAveragesList({
            document: response.data.document,
            images: response.data.images,
            video: response.data.video,
            audio: response.data.audio,
            exe: response.data.exe,
            other: response.data.other,
          });
        }
      }
      if (response.status === 500) {
        setAveragesList({
          document: 0,
          images: 0,
          video: 0,
          audio: 0,
          other: 0,
          exe: 0,
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initializeGetFilesAverageType();
  }, [setAveragesList]);

  const counterFunction = () => {
    return {
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
        //Fill text with chart data text

        ctx.fillText(
          `${chart.config._config.data.labels[0]}`,
          left + width / 2,
          top + height / 2 + 4
        );
      },
    };
  };

  const options = {
    cutout: 25,
    plugins: {
      legend: {
        display: false,
      },
      tooltip: {
        enabled: false,
      },
    },
  };

  const dataFunction = (
    progress: any,
    backgroundColor: string,
    progressBarColor: string
  ) => {
    return {
      datasets: [
        {
          data: [progress, 100 - progress],
          backgroundColor: [progressBarColor, backgroundColor],
          borderWidth: 0,
        },
      ],
      labels: [`${progress}%`, `${100 - progress}%`],
    };
  };

  return (
    <div className="hidden lg:flex flex-col w-full h-4/12 py-2 px-5 bg-white rounded-xl border-[1px] border-[#E8EDF2] dark:bg-[#1F2128] dark:border-[#313442]">
      <div className="flex flex-row justify-between items-center pb-2 border-b-[1px] border-[#E8EDF2] dark:border-[#313442]">
        <h4 className="font-semibold text-[16px] text-[#07070C] dark:text-white">
          Storage Overview
        </h4>
      </div>
      <div className="flex flex-col p-5 w-full relative justify-center text-center mx-auto my-5">
        {averagesList && (
          <div className="flex flex-row gap-5 flex-wrap mb-10">
            <div className="w-2/12 min-w-[4em]">
              <Doughnut
                data={dataFunction(
                  averagesList.document,
                  "rgba(226, 55, 56, 0.3)",
                  "#E23738"
                )}
                options={options}
                plugins={[counterFunction()]}
              />
            </div>
            <div className="w-2/12  min-w-[4em]">
              <Doughnut
                data={dataFunction(
                  averagesList.video,
                  "rgba(251, 123, 184, 0.3)",
                  "#FB7BB8"
                )}
                options={options}
                plugins={[counterFunction()]}
              />
            </div>
            <div className="w-2/12  min-w-[4em]">
              <Doughnut
                data={dataFunction(
                  averagesList.audio,
                  "rgba(39, 117, 255, 0.3)",
                  "#2775FF"
                )}
                options={options}
                plugins={[counterFunction()]}
              />
            </div>

            <div className="w-2/12  min-w-[4em]">
              <Doughnut
                data={dataFunction(
                  averagesList.images,
                  "rgba(119, 71, 202, 0.3)",
                  "#7747CA"
                )}
                options={options}
                plugins={[counterFunction()]}
              />
            </div>
            <div className="w-2/12  min-w-[4em]">
              <Doughnut
                data={dataFunction(
                  averagesList.exe,
                  "rgba(236, 140, 86, 0.3)",
                  "#EC8C56"
                )}
                options={options}
                plugins={[counterFunction()]}
              />
            </div>
            <div className="w-2/12  min-w-[4em]">
              <Doughnut
                data={dataFunction(
                  averagesList.other,
                  "rgba(80, 209, 178, 0.3)",
                  "#50D1B2"
                )}
                options={options}
                plugins={[counterFunction()]}
              />
            </div>
          </div>
        )}
        <div>
          <div className="grid grid-cols-2 xl:grid-cols-3 w-full gap-2 mb-2">
            <div className="flex flex-row gap-2 items-center col-span-1">
              <div className="h-[11px] w-[11px] bg-[#FB7185] rounded-full"></div>
              <p className="text-[#07070C] dark:text-white text-[12px]">
                Document
              </p>
            </div>
            <div className="flex flex-row gap-2 items-center col-span-1">
              <div className="h-[11px] w-[11px] bg-[#F0ABFC] rounded-full"></div>
              <p className="text-[#07070C] dark:text-white text-[12px]">
                Video
              </p>
            </div>
            <div className="flex flex-row gap-2 items-center col-span-1">
              <div className="h-[11px] w-[11px] bg-[#60A5FA] rounded-full"></div>
              <p className="text-[#07070C] dark:text-white text-[12px]">
                Audio
              </p>
            </div>
            <div className="flex flex-row gap-2 items-center col-span-1">
              <div className="h-[11px] w-[11px] bg-[#A78BFA] rounded-full"></div>
              <p className="text-[#07070C] dark:text-white text-[12px]">
                Images
              </p>
            </div>
            <div className="flex flex-row gap-2 items-center col-span-1">
              <div className="h-[11px] w-[11px] bg-[#FB923C] rounded-full"></div>
              <p className="text-[#07070C] dark:text-white text-[12px]">Exe</p>
            </div>
            <div className="flex flex-row gap-2 items-center col-span-1">
              <div className="h-[11px] w-[11px] bg-[#2DD4BF] rounded-full"></div>
              <p className="text-[#07070C] dark:text-white text-[12px]">
                Other
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
