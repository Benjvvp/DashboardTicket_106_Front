import Image from "next/image";
import { MouseEventHandler } from "react";
import Breadcrump from "../Breadcrump";

interface PageTitleProps {
  title: string;
  description?: string;
  clickHandlerTaskAdd?: MouseEventHandler;
  addBreadcrumb?: any;
  linksBreadcrumb?: any;
}

export default function PageTitle(props: PageTitleProps) {
  const { title, description } = props;

  const nowDate = new Date().toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
  });

  return (
    <div>
      <div className="flex flex-row justify-between items-center">
        <h4 className="font-semibold text-[25px] sm:text-[28px] text-[#07070C] dark:text-white">
          {title}
        </h4>
      </div>
      <div className="flex mt-2 flex-row justify-between items-center">
        <div className="flex justify-between items-center flex-row">
          {props.addBreadcrumb ? (
            <Breadcrump
              Links={props.linksBreadcrumb}
            />
          ) : (
            <p className="text-[12px] sm:text-[14px] text-[#7E7E8F] dark:text-[#8B8B93]">
              {description}
            </p>
          )}
        </div>
        <div className="hidden sm:flex items-center justify-center gap-2">
          <Image src="/svg/calendar.svg" width={20} height={20} />
          <p className="text-[12px] text-[#7E7E8F] dark:text-[#8B8B93]">
            {nowDate}
          </p>
        </div>
      </div>
    </div>
  );
}
