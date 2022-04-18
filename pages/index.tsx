import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import router from "next/router";
import react, { useContext } from "react";
import Footer from "../components/Footer";
import LeftBar from "../components/Navigation/LeftBar";
import TopBar from "../components/Navigation/TopBar";
import { UserContext } from "../contexts/userContext/UserContext";
import { getItem } from "../helpers/localStorage";
import { loginWithToken } from "../helpers/serverRequests/authUser";
import styles from "../styles/Home.module.css";
import DefaultSEO from "../components/SEO";
import PageTitle from "../components/PageTitle";
import TaskListCards from "../components/TaskListCards";

const Home: NextPage = () => {
  return (
    <div className="bg-[#E8EDF2] h-full min-h-screen dark:bg-[#0F0F12]">
      <Head>
        <title>Principal page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <DefaultSEO />
      </Head>
      <TopBar />
      <LeftBar />
      <div className="w-[88%] ml-[12%] block relative h-full min-h-[89vh] p-[3em]">
        <PageTitle title="Projects manage" description="Check out latest updates" />
        <div className="grid grid-cols-3 gap-5 mt-10 mb-[5em]">
          <TaskListCards name='Pending' countShow={4} typeOfTaskDisplay='Pending' />
          <TaskListCards name='In Progress' countShow={4} typeOfTaskDisplay='In Progress' />
          <TaskListCards name='Completed' countShow={4} typeOfTaskDisplay='Completed' />
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;