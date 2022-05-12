import { useTheme } from "next-themes";
import { useEffect, useState } from "react";

interface ActionsButtonsProps {
  isOpenLeftBar?: boolean;
  setIsOpenLeftBar?: (isOpen: boolean) => void;
  useNormalActionButtons?: boolean;
}

export default function ActionsButtons(props: ActionsButtonsProps) {
  const { theme, setTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }

  const { isOpenLeftBar, setIsOpenLeftBar, useNormalActionButtons } = props;
  if (isOpenLeftBar || useNormalActionButtons) {
    return (
      <>
        <div className="flex flex-row gap-4 py-5 px-4 bg-[#E8EDF2] dark:bg-[#313442] rounded-2xl">
          {theme === "light" ? (
            <img src="/svg/moonLight.svg" alt="" srcSet="" />
          ) : (
            <img src="/svg/moonDark.svg" alt="" srcSet="" />
          )}
          <div className="flex items-center justify-center w-full">
            <label
              htmlFor="toogleA"
              className="flex items-center cursor-pointer"
            >
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
                  <div className="dot absolute w-6 h-6 bg-[#7364DB] rounded-full shadow right-0 -top-1 transition"></div>
                ) : (
                  <div className="dot absolute w-6 h-6 bg-[#7364DB] rounded-full shadow -left-1 -top-1 transition "></div>
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
  return (
    <div className="flex flex-row gap-3 py-2 px-3 bg-[#E8EDF2] dark:bg-[#313442] rounded-2xl">
      {theme === "light" ? (
        <img
          src="/svg/sunLight.svg"
          alt=""
          srcSet=""
          className="py-3 pr-3 cursor-pointer border-r-[2px] border-[#FFFFFF] dark:border-[#1F2128]"
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        />
      ) : (
        <img
          src="/svg/moonDark.svg"
          alt=""
          srcSet=""
          className="py-3 pr-3 cursor-pointer border-r-[2px] border-[#FFFFFF] dark:border-[#1F2128]"
          onClick={() => {
            setTheme(theme === "light" ? "dark" : "light");
          }}
        />
      )}
      <img src="/svg/maximize-3.svg" alt="" srcSet="" className="cursor-pointer" onClick={() => {
        { setIsOpenLeftBar && setIsOpenLeftBar(true); }
      }} />
    </div>
  );
}
