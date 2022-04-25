import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import { useRouter } from "next/router";
import react, { useContext, useEffect, useState } from "react";
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
import ProjectStatics from "../components/ProjectStatics";
import { InputDefault } from "../components/Inputs";
import TaskFormModal from "../components/TaskFormModal";
import TaskLargeListCards from "../components/TaskLargeListCards";

const Home: NextPage = () => {
  const router = useRouter();
  const [modalAddTask, setModalAddTask] = useState(false);
  const [isModalActive, setIsModalActive] = useState(false);
  const [modalFormTask, setModalFormTask] = useState(false);

  const checkToken = async () => {
    const token = await getItem("token");
    if (!token || token === undefined || token === 'undefined') router.push("/auth/login");
  }
  useEffect(() => {
    checkToken();
  })
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
        <PageTitle
          title="Projects manage"
          description="Check out latest updates"
          isTaskPage
          clickHandlerTaskAdd={() => {
            setModalAddTask(true);
            setIsModalActive(true);
          }}
        />
        <div className="grid grid-cols-3 gap-5 mt-10 mb-[5em]">
          <TaskListCards
            name="Pending"
            countShow={4}
            typeOfTaskDisplay="Pending"
          />
          <TaskListCards
            name="In Progress"
            countShow={4}
            typeOfTaskDisplay="In Progress"
          />
          <div className="flex flex-col">
            <TaskListCards
              name="Completed"
              countShow={2}
              typeOfTaskDisplay="Completed"
            />
            <ProjectStatics />
          </div>
        </div>
        <TaskLargeListCards
          name="All projects"
          countShow={5}
        />
        <Footer />
      </div>

      <div
        id="modalAddTask"
        tabIndex={-1}
        aria-hidden="true"
        className={`overflow-y-auto overflow-x-hidden fixed top-0 bottom-0 right-0 left-0 z-[60] w-full md:inset-0 h-modal md:h-full  flex items-center justify-center ${
          modalAddTask ? "block" : "hidden"
        }`}
      >
        <div className="relative p-4 w-full max-w-2xl h-full md:h-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-[#1F2128] border border-[#E8EDF2] dark:border-[#313442]">
            <div className="flex justify-between items-start p-5 rounded-t dark:border-gray-600">
              <button
                type="button"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm p-1.5 ml-auto inline-flex items-center dark:hover:bg-gray-600 dark:hover:text-white"
                onClick={() => {
                  setModalAddTask(false);
                  setIsModalActive(false);
                }}
              >
                <svg
                  className="w-5 h-5"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <path
                    fill-rule="evenodd"
                    d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
                    clip-rule="evenodd"
                  ></path>
                </svg>
              </button>
            </div>
            <h1 className="font-semibold text-[20px] text-[#07070C] text-center dark:text-white">
              Create a New Project
            </h1>
            <div className="p-6 space-y-6 mt-2">
              <img
                src="/svg/addIconTask.svg"
                className="mx-auto border border-[4px] border-[#7364DB] rounded-[16px] p-[30px] cursor-pointer"
                onClick={() => {
                  setModalAddTask(false);
                  setIsModalActive(true);
                  setModalFormTask(true);
                }}
              />
              <div className="mt-5">
                <p className="text-[16px] text-[#07070C] text-center dark:text-white">
                  Blank Project
                </p>
              </div>
            </div>
            <div className="flex items-center p-6 space-x-2 rounded-b border-gray-200 dark:border-gray-600">
              <button
                data-modal-toggle="defaultModal"
                type="button"
                className="text-white bg-[#C6CBD9] dark:bg-[#2C2C35] hover:bg-gray-400 dark:hover:bg-gray-700 transition transition-all mx-auto focus:ring-4 focus:outline-none focus:ring-blue-300 rounded-[4px] border border-gray-200 text-sm font-medium px-5 py-2.5 hover:text-white focus:z-10 dark:bg-gray-700 dark:border-none dark:hover:text-white dark:focus:ring-gray-600"
                onClick={() => {
                  setModalAddTask(false);
                  setIsModalActive(false);
                }}
              >
                Cancel
              </button>
            </div>
          </div>
        </div>
      </div>

      <TaskFormModal 
        modalFormTask={modalFormTask}
        setModalFormTask={setModalFormTask}
        setIsModalActive={setIsModalActive}
      />
      
      <div
        className={`top-0 left-0 fixed w-full h-full bg-[#07070C] opacity-[.6] z-[55] ${
          isModalActive ? "block" : "hidden"
        }`}
      ></div>
    </div>
  );
};

export default Home;
