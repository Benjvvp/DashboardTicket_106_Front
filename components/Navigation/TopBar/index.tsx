import Image from "next/image";
import { useState } from "react";
import styles from "../../../styles/components/topBar.module.css";
import LogoDark from "../../LogoDark";

interface TopBarProps {
  onlyLogo?: boolean;
}
export default function TopBar(props: TopBarProps) {
  const [searchInput, setSearchInput] = useState("");
  const [searchResults, setSearchResults] = useState([]);

  const [browseDropDownActive, setBrowseDropDownActive] = useState(false);
  const browseDropDownItems = [
    {
      name: "All brands",
      href: "/",
    },
    {
      name: "News Reviews",
      href: "/",
    },
    {
      name: "Financial report",
      href: "/",
    },
    {
      name: "Shipping",
      href: "/",
    },
    {
      name: "View Catalog",
      href: "/",
    },
    {
      name: "Revenue report",
      href: "/",
    },
    {
      name: "Refund requests",
      href: "/",
    },
  ];
  return (
    <>
      <div className="bg-white h-[100px]">
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
                  className={`bg-[#F5F5FA] py-2 rounded-[12px] text-[#C6CBD9] focus:outline-none focus:shadow-outline ${styles.inputSearch}`}
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
        </div>
      </div>
    </>
  );
}
