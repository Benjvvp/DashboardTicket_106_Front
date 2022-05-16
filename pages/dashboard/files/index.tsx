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
const Chat: NextPage = () => {
  const router = useRouter();
  const { userData } = useContext(UserContext);

  const [isOpenLeftBar, setIsOpenLeftBar] = useState(true);

  const checkToken = async () => {
    const token = await getItem("token");
    if (!token || token === undefined || token === "undefined")
      router.push("/auth/login");
  };

  useEffect(() => {
    checkToken();
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
          ]}
        />
        <div className="grid grid-cols-6 gap-3 min-h-[75vh] w-full mb-[8vh] mt-5">
          <div className="col-span-4 rounded-lg p-5"></div>
          <div className="col-span-2 rounded-lg p-5 flex flex-col gap-10">
            <StorageOverview />
            <div className="w-full">
              <Link href="/dashboard/files/list">
                <a className="w-full">
                  <div className="flex items-center justify-center w-full bg-[#7364DB] rounded-lg max-h-[3em]">
                    <button
                      type="button"
                      className="w-full text-white font-semibold py-2 sm:py-3 text-sm mb-4 mt-4"
                    >
                      List Files
                    </button>
                  </div>
                </a>
              </Link>
            </div>
            <NewActiveUsers />
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Chat;