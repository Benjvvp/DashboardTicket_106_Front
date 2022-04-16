import { useTheme } from "next-themes";
import { useEffect, useState } from "react";
import { getItem, themeTo } from "../../helpers/localStorage";

interface ActionsButtonsProps {
  className?: string;
  onClickMaximize?: () => void;
  onClickMinimize?: () => void;
  showMaximizeMinimize?: boolean;
}

export default function ActionsButtons() {
  const { theme, setTheme } = useTheme();

  return (
    <>
      <div className="flex flex-row gap-4 py-5 px-4 bg-[#E8EDF2] dark:bg-[#313442] rounded-2xl">
        {theme === "light" ? (
          <img src="/svg/moonLight.svg" alt="" srcSet="" />
        ) : (
          <img src="/svg/moonDark.svg" alt="" srcSet="" />
        )}
        <div className="flex items-center justify-center w-full">
          <label htmlFor="toogleA" className="flex items-center cursor-pointer">
            <div className="relative">
              <input
                id="toogleA"
                type="checkbox"
                className="sr-only"
                onClick={() => {
                  setTheme(theme === "light" ? "dark" : "light");
                }}
              />
              <div className="w-10 h-4 bg-[#C6CBD9] dark:bg-[#2C2C35] rounded-full shadow-inner shadow-2xl"></div>
              {theme === "light" ? (
                <div className="dot absolute w-6 h-6 bg-[#7364DB] rounded-full shadow -left-1 -top-1 transition"></div>
              ) : (
                <div className="dot absolute w-6 h-6 bg-[#7364DB] rounded-full shadow -top-1 transition right-0"></div>
              )}
            </div>
          </label>
        </div>
        {theme === "light" ? (
          <img src="/svg/sunLight.svg" alt="" srcSet="" />
        ) : (
          <img src="/svg/sunDark.svg" alt="" srcSet="" />
        )}
      </div>
    </>
  );
}
