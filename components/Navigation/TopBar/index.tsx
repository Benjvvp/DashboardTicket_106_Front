import Image from "next/image";
import { useContext, useState } from "react";
import { UserContext } from "../../../contexts/userContext/UserContext";
import styles from "../../../styles/components/topBar.module.css";
import ActionsButtons from "../../ActionsButtons";
import LogoDark from "../../LogoDark";

interface TopBarProps {
  onlyLogo?: boolean;
  showActionButton?: boolean;
}
export default function TopBar(props: TopBarProps) {
  const { userData } = useContext(UserContext);

  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [browseDropDownActive, setBrowseDropDownActive] = useState(false);
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
      href: "/",
    },
    {
      name: "Chat",
      href: "/",
    },
    {
      name: "Discord bot",
      href: "/",
    },
    {
      name: "Admin panel",
      href: "/",
    },
  ];
  return (
    <>
      <div className="bg-white h-[100px] dark:bg-[#1F2128] w-full">
        <div className="flex items-center h-[100px] px-5">
          <LogoDark withText />
          {!props.onlyLogo && (
            <>
              <div className="flex items-center relative h-full flex-initial">
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
                  className="flex items-center h-full flex-initial ml-[5em] hover:cursor-pointer relative browseDropDown"
                  onClick={() => setBrowseDropDownActive(!browseDropDownActive)}
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
                >
                  <div className="flex flex-col gap-5 pl-5">
                    <div className={`${styles.caret}`}></div>
                    {browseDropDownItems.map((item) => (
                      <a
                        href={item.href}
                        className="flex flex-row gap-2 text-[14px] text-white hover:text-[#C6CBD9]"
                        key={item.name}
                      >
                        <img src="/svg/verify.svg" /> {item.name}
                      </a>
                    ))}
                  </div>
                </div>
              </div>
            </>
          )}
          <div className="ml-auto">
            {props.showActionButton && <ActionsButtons />}
          </div>
        </div>
      </div>
    </>
  );
}
