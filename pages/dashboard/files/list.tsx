import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import react, { useContext, useEffect, useState } from "react";
import LeftBar from "../../../components/Navigation/LeftBar";
import TopBar from "../../../components/Navigation/TopBar";
import DefaultSEO from "../../../components/SEO";

import { getItem } from "../../../helpers/localStorage";

import { UserContext } from "../../../contexts/userContext/UserContext";
import Footer from "../../../components/Footer";
import PageTitle from "../../../components/PageTitle";
import StorageOverview from "../../../components/StorageOverview";
import NewActiveUsers from "../../../components/NewActiveUsers";
import Link from "next/link";
import { getFolders } from "../../../helpers/serverRequests/files";
import FilesAddFolderModal from "../../../components/FilesAddFolderModal";
const Chat: NextPage = () => {
  const router = useRouter();
  const { userData } = useContext(UserContext);

  const [isOpenLeftBar, setIsOpenLeftBar] = useState(true);
  const [folders, setFolders] = useState([]);

  const [isOpenAddFolderModal, setIsOpenAddFolderModal] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);

  const checkToken = async () => {
    let token = await JSON.parse(await getItem("token"));
    if (!token || token === undefined || token === "undefined")
      router.push("/auth/login");
  };

  const getFoldersFromServer = async () => {
    let token = await JSON.parse(await getItem("token"));
    const response = await getFolders(token);
    if (response.status === 200) {
      if(response.data.isError === false){
        setFolders(response.data.folders);
      }
    }
    if (response.status === 500) {
      setFolders([]);
    }
  };
  useEffect(() => {
    checkToken();
    getFoldersFromServer();
  }, []);

  return (
    <div className="bg-[#E8EDF2] mt-[100px] h-full max-w-screen min-w-screen dark:bg-[#0F0F12] overflow-hidden">
      <Head>
        <title>File Manage</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <DefaultSEO />
      </Head>
      <TopBar isOpenLeftBar={isOpenLeftBar} />
      <LeftBar
        isOpen={isOpenLeftBar}
        setIsOpen={setIsOpenLeftBar}
        activeLink={2}
      />
      <div
        className={`w-full ${
          isOpenLeftBar ? " xl:ml-[12%] xl:w-[88%]" : " xl:ml-[6%] xl:w-[94%]"
        } block relative h-full min-h-[89vh] p-[3em] pt-5 transition-all duration-500`}
      >
        <PageTitle
          title="File Manage"
          addBreadcrumb
          linksBreadcrumb={[
            {
              Name: "Home",
              Url: "/",
              icon: "/svg/home-2.svg",
            },
            {
              Name: "File Manage",
              Url: "/dashboard/files",
            },
            {
              Name: "File List",
              Url: "/dashboard/files/list",
            },
          ]}
        />
        <div className="grid grid-cols-10 gap-3 min-h-[66vh] max-h-[66vh] w-full mt-5">
          <div className="col-span-2">
            <div className="rounded-lg p-5 flex max-h-full flex-col gap-5 bg-white dark:bg-[#1F2128] border-[1px] border-[#E8EDF2] dark:border-[#313442] rounded-xl p-[24px] pt-[14px]">
              <div
                className="flex flex-row items-center justify-center w-full bg-[#7364DB] rounded-lg max-h-[3em] gap-2 mt-5 cursor-pointer"
                onClick={() => {
                  setIsOpenAddFolderModal(true);
                  setIsModalActive(true);
                }}
              >
                <img
                  src="/svg/messageEdit.svg"
                  className="w-5 h-5"
                  alt="folder"
                />
                <button
                  type="button"
                  className="text-white font-bold py-2 sm:py-3 text-sm mb-4 mt-4"
                >
                  New folder
                </button>
              </div>
              <div className="flex flex-col gap-1 max-h-full">
                {folders &&
                  folders.map(
                    (folder: { folder: string; files: string }, index) => {
                      return (
                        <div className="flex flex-row items-center justify-between w-full bg-none dark:hover:bg-[#313442] px-4 rounded-lg max-h-[2.5em] py-5 cursor-pointer transition"
                          key={`folder-${index}-${folder.folder}`}
                        >
                          <div className="flex flex-row gap-3">
                            <img
                              src="/svg/mainIcon.svg"
                              className="w-5 h-5"
                              alt="folder"
                            />
                            <p className="text-[#7E7E8F] dark:text-[#8B8B93] font-bold text-[14px]">
                              {folder.folder}
                            </p>
                          </div>
                          <p className="text-[#7E7E8F] dark:text-[#8B8B93] text-[12px]">
                            {folder.files} files
                          </p>
                        </div>
                      );
                    }
                  )}
              </div>
            </div>
          </div>
          <div className="col-span-8 rounded-lg shadow-lg p-5 bg-white dark:bg-[#1F2128] border-[1px] border-[#E8EDF2] dark:border-[#313442] rounded-xl p-[24px] pt-[14px]"></div>
        </div>
        <Footer />
        <FilesAddFolderModal
          modalAddFolder={isOpenAddFolderModal}
          setModalAddFolder={setIsOpenAddFolderModal}
          setIsModalActive={setIsModalActive}
          getFoldersFromServer={getFoldersFromServer}
        />
        <div
          className={`top-0 left-0 fixed w-full h-full bg-[#07070C] opacity-[.6] z-[55] ${
            isModalActive ? "block" : "hidden"
          }`}
        ></div>
      </div>
    </div>
  );
};

export default Chat;
