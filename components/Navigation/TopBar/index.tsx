import { useTheme } from "next-themes";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import { useContext, useEffect, useState } from "react";
import { UserContext } from "../../../contexts/userContext/UserContext";
import { logoutUser } from "../../../helpers/localStorage";
import styles from "../../../styles/components/topBar.module.css";
import ActionsButtons from "../../ActionsButtons";
import LogoDark from "../../LogoDark";

interface TopBarProps {
  onlyLogo?: boolean;
  showActionButton?: boolean;
  isLarge?: boolean;
  showLogo?: boolean;
  isOpenLeftBar?: boolean;
  useNormalActionsButtons?: boolean;
}
export default function TopBar(props: TopBarProps) {
  const { theme } = useTheme();

  const router = useRouter();
  const { userData } = useContext(UserContext);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [browseDropDownActive, setBrowseDropDownActive] = useState(false);
  const [menuUserOptionsActive, setMenuUserOptionsActive] = useState(false);

  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);
  if (!mounted) {
    return null;
  }
  
  const browseDropDownItems = [
    {
      name: "Todo-list",
      href: "/",
    },
    {
      name: "News",
      href: "/",
    },
    {
      name: "Files",
      href: "/dashboard/files",
    },
    {
      name: "Chat",
      href: "/chat",
    },
    {
      name: "Discord bot",
      href: "/",
    },
    {
      name: "Admin panel",
      href: "/dashboard/staff",
    },
  ];

  return (
    <>
      <div
        className={`bg-white h-[100px] dark:bg-[#1F2128] w-full fixed top-0 left-0 z-50 ${
          styles.TopBar
        } max-w-screen after:border-[#E8EDF2] dark:after:border-[#313442] ${
          props.isLarge ? "after:w-full" : ""
        } after:w-full xl:after-w-[88%]`}
      >
        <div className={`flex items-center h-[100px] px-5 ${props.showLogo ? '' : 'xl:pl-[10em]'} ${props.isOpenLeftBar ? 'ml-[5.8%]' : ''} transition-all duration-500 `}>
          {props.showLogo && <LogoDark />}
          {!props.onlyLogo && (
            <>
              <div className={`hidden lg:flex items-center relative h-full flex-initial`}>
                <img
                  src="/svg/search-normal.svg"
                  className={styles.searchIcon}
                />
                <input
                  type="text"
                  name="searchFiles"
                  id=""
                  placeholder="Search"
                  className={`bg-[#F5F5FA] dark:bg-[#0F0F12] py-2 rounded-[12px] text-[#C6CBD9] focus:outline-none focus:shadow-outline ${styles.inputSearch} dark:placeholder-[#2C2C35]`}
                />
              </div>
              <div className="relative">
                <div
                  className="flex items-center h-full flex-initial md:ml-[5em] hover:cursor-pointer relative browseDropDown"
                  onClick={() => {
                    if (menuUserOptionsActive) setMenuUserOptionsActive(false);
                    setBrowseDropDownActive(!browseDropDownActive);
                  }}
                >
                  <img src="/svg/export.svg" alt="" />
                  <p className="text-[#7E7E8F] text-[14px] pl-3 pr-10 font-bold">
                    Browse
                  </p>
                  <img src="/svg/arrow-down.svg" alt="" />
                </div>
                <div
                  className={`${styles.dropDownColor} ${
                    browseDropDownActive ? "block" : "hidden"
                  }`}
                  onMouseLeave={() => setBrowseDropDownActive(false)}
                >
                  <div className="flex flex-col gap-5 pl-5">
                    <div className={`${styles.caret}`}></div>
                    {browseDropDownItems.map((item) => (
                      <Link href={item.href} key={item.name}>
                        <a className="flex flex-row gap-2 text-[14px] text-white hover:text-[#C6CBD9]">
                          <img src="/svg/verify.svg" /> {item.name}
                        </a>
                      </Link>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="ml-auto">
            {props.showActionButton && <ActionsButtons useNormalActionButtons />}
            {!props.showActionButton && (
              <div className="flex flex-row gap-10 items-center">
                <div className="hidden md:inline-block">
                  <img src="/svg/messages.svg" onClick={() => {
                    router.push("/chat");
                  }} className='cursor-pointer' />
                </div>
                <div className="hidden md:inline-block">
                  <img src="/svg/notificationBing.svg" />
                </div>
                <div className="relative">
                  <div
                    className={`flex items-center justify-center w-[48px] h-[48px] rounded-full cursor-pointer ${
                      userData.avatar === undefined || null
                        ? "bg-gradient-to-r from-[#5C8FFF] to-[#C14BFF]"
                        : ""
                    }`}
                    onClick={() => {
                      if (browseDropDownActive) setBrowseDropDownActive(false);
                      setMenuUserOptionsActive(!menuUserOptionsActive);
                    }}
                  >
                    {userData.avatar === undefined || null ? (
                      <p className="font-bold text-[16px] text-white">
                        {userData.userName.split("")[0] +
                          userData.userName.split("")[1]}
                      </p>
                    ) : (
                      <img
                        src={userData.avatar}
                        alt="avatar"
                        className="rounded-full w-[48px]"
                      />
                    )}
                  </div>
                  <div
                    className={`${styles.dropdownUserOptions} ${
                      menuUserOptionsActive ? "block" : "hidden"
                    } dark:bg-[#1F2128]`}
                    onMouseLeave={() => setMenuUserOptionsActive(false)}
                  >
                    <div className="inline-flex flex-col">
                      <div
                        className={`${styles.caretUser} after:border-t-white dark:after:border-t-[#1F2128]`}
                      ></div>
                      {browseDropDownItems.map((item) => (
                        <Link href={item.href} key={item.name}>
                          <a className="inline-flex flex-row text-[14px] text-[#7E7E8F] dark:text-[#8B8B93] hover:bg-[#F5F5FA] hover:text-[#07070C] dark:hover:bg-[#0F0F12] dark:hover:text-[#fff] py-3 px-5 rounded-[8px] ">
                            <img
                              src={
                                theme === "light"
                                  ? "/svg/verifyLight.svg"
                                  : "/svg/verify.svg"
                              }
                              className="pr-5"
                            />{" "}
                            {item.name}
                          </a>
                        </Link>
                      ))}
                      <div className="w-11/12 h-[1px] block mx-auto bg-[#F5F5FA] dark:bg-[#0F0F12] my-2"></div>
                      <a
                        className="inline-flex flex-row text-[14px] text-[#7E7E8F] dark:text-[#8B8B93] hover:bg-[#F5F5FA] hover:text-[#07070C] dark:hover:bg-[#0F0F12] dark:hover:text-[#fff] py-3 px-5 rounded-[8px] cursor-pointer"
                        onClick={() => {
                          router.push("/auth/login");
                          logoutUser();
                        }}
                      >
                        <img
                          src={
                            theme === "light"
                              ? "/svg/logoutLight.svg"
                              : "/svg/logout.svg"
                          }
                          className="pr-5"
                        />{" "}
                        Logout
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </>
  );
}
