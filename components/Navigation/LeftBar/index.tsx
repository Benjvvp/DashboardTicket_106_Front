import { useTheme } from "next-themes";
import Link from "next/link";
import { useState } from "react";
import styles from "../../../styles/components/leftBar.module.css";
import ActionsButtons from "../../ActionsButtons";
import {
  ArchiveBookIcon,
  DocumentTextIcon,
  MessagesIcon,
  TaskIcon,
  WifiIcon,
} from "../../Icons";
import LogoDark from "../../LogoDark";

interface LeftBarProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  activeLink?: number;
}

export default function LeftBar(props: LeftBarProps) {
  const { isOpen, setIsOpen, activeLink } = props;
  const { theme, setTheme } = useTheme();
  const [isHover, setIsHover] = useState<number>();
  const isDark = (active: boolean, theme: string) => {
    if (active) {
      return true;
    }
    if (theme === undefined) {
      return false;
    }
    if (theme === "light") {
      return false;
    }
    return true;
  };
  const listLinks = [
    {
      name: "Todo-list",
      href: "/",
      active: activeLink === 0,
      icon: <TaskIcon isDark={isDark(activeLink === 0, theme)} isHover={isHover === 0} />,
    },
    {
      name: "News",
      href: "/",
      active: activeLink === 1,
      icon: <ArchiveBookIcon isDark={isDark(activeLink === 1, theme)} isHover={isHover === 1} />,
    },
    {
      name: "Files",
      href: "/",
      active: activeLink === 2,
      icon: <DocumentTextIcon isDark={isDark(activeLink === 2, theme)} isHover={isHover === 2} />,
    },
    {
      name: "Chat",
      href: "/chat",
      active: activeLink === 3,
      icon: <MessagesIcon isDark={isDark(activeLink === 3, theme)} isHover={isHover === 3} />,
    },
    {
      name: "Discord bot",
      href: "/",
      active: activeLink === 4,
      icon: <WifiIcon isDark={isDark(activeLink === 4, theme)} isHover={isHover === 4} />,
    },
    {
      name: "Admin panel",
      href: "/dashboard/staff",
      active: activeLink === 5,
      icon: <TaskIcon isDark={isDark(activeLink === 5, theme)} isHover={isHover === 5} />,
    },
  ];

  return (
    <div
      className={`hidden xl:flex flex-col min-w-[110px] ${
        isOpen ? "w-[12%]" : "w-[6%]"
      } h-full bg-white dark:bg-[#1F2128] fixed top-0 left-0 z-[50] ${
        styles.leftBar
      } after:border-[#E8EDF2] dark:after:border-[#313442] transition-[width] duration-500`}
    >
      <div className="h-[100px] relative">
        <div
          className={`flex items-center h-full px-5 ${isOpen ? "" : "pl-2"}`}
        >
          <LogoDark />
        </div>
        <button
          className={`absolute right-[-6%] bottom-0 top-0 z-50 outline-0 ${
            isOpen ? "" : "right-[-14%]"
          }`}
          onClick={() => setIsOpen(!isOpen)}
        >
          <img
            src="/svg/arrow-right-2.svg"
            alt=""
            srcSet=""
            className={`p-2 bg-white dark:bg-[#1F2128] rounded-full ${
              isOpen ? "rotate-180" : ""
            } border-[2px] border-[#E8EDF2] dark:border-[#313442] transition-[width] duration-500`}
          />
        </button>
      </div>
      <div className="pt-[50px] px-3 flex flex-col justify-between h-full">
        <div className="flex flex-col gap-5 items-center justify-center mb-5 px-3">
          {listLinks.map((link, index) => (
            <a
              className={`w-full min-h-[3.5em] flex items-center rounded-[12px] cursor-pointer hover:bg-[#7364DB] ${
                link.active ? "bg-[#7364DB]" : "opacity-50"
              } hover:opacity-100 transition-colors duration-500`}
              key={`${link.name}-${index}`}
              onMouseEnter={() => setIsHover(index)}
              onMouseLeave={() => setIsHover(undefined)}
            >
              <Link href={link.href}>
                <div
                  className={`flex flex-row gap-2 items-center h-full w-full px-5 ${
                    isOpen ? "" : "justify-center"
                  }  text-[#7E7E8F] dark:[#8B8B93] hover:text-white`}
                >
                  {link.icon}
                  <p
                    className={`font-semibold text-sm ${
                      isOpen ? "" : "hidden"
                    } ${link.active ? "text-white" : null}`}
                  >
                    {link.name}
                  </p>
                </div>
              </Link>
            </a>
          ))}
        </div>
        <div className="mb-10 border-t-[1px] border-[#FFFFFF] dark:border-[#313442] pt-10">
          <ActionsButtons isOpenLeftBar={isOpen} setIsOpenLeftBar={setIsOpen} />
        </div>
      </div>
    </div>
  );
}
