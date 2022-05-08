import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import react, { useContext, useEffect, useRef, useState } from "react";
import Footer from "../../components/Footer";
import LeftBar from "../../components/Navigation/LeftBar";
import TopBar from "../../components/Navigation/TopBar";
import DefaultSEO from "../../components/SEO";
import UserIcon from "../../components/UserIcon";
import { getItem } from "../../helpers/localStorage";
import {
  getAllUsers,
  getUser,
  getUsers,
} from "../../helpers/serverRequests/user";
import styles from "../../styles/components/topBar.module.css";
import io, { Socket } from "socket.io-client";
import { UserContext } from "../../contexts/userContext/UserContext";
import { getUnseenCountMessages } from "../../helpers/serverRequests/chat";
import Link from "next/link";

const Home: NextPage = () => {
  const router = useRouter();
  const socket = useRef();

  const { userData } = useContext(UserContext);

  const [users, setUsers] = useState([
    {
      _id: "",
      userName: "",
      avatar: "",
      isOnline: false,
      LastMessage: "",
      LastMessageTime: "",
      messageWithoutView: 0,
    },
  ]);
  const [userChat, setUserChat] = useState({
    _id: "",
    userName: "",
    avatar: "",
    isOnline: false,
  });

  const [usersLoading, setUsersLoading] = useState(true);

  const [isOpenLeftBar, setIsOpenLeftBar] = useState(true);

  const [orderChatList, setOrderChatList] = useState<String>("More Recent");
  const [chatListDropDown, setChatListDropDown] = useState<Boolean>(false);

  const [messagesCount, setMessagesCount] = useState<number>(0);

  const [isLoad, setIsLoad] = useState<Boolean>(false);

  const [searchInput, setSearchInput] = useState("");

  const [inputMessage, setInputMessage] = useState("");

  const checkToken = async () => {
    const token = await getItem("token");
    if (!token || token === undefined || token === "undefined")
      router.push("/auth/login");
  };

  const SkeletonUsersCard = () => {
    const users = [1, 2, 3, 4, 5];
    return (
      <>
        {users.map((user, index) => (
          <div
            className="flex flex-row p-2 py-5 rounded-lg w-full border-[1px] border-[#E8EDF2] dark:border-[#313442] bg-[#F5F5A] dark:bg-[bg-[#F5F5A] #[0F0F12]"
            key={`cardUser-${index}`}
          >
            <div className="animate-pulse flex space-x-4 w-full">
              <div className="rounded-full bg-slate-400 dark:bg-slate-700 h-10 w-10"></div>
              <div className="flex-1 space-y-2 py-1">
                <div className="grid grid-cols-4 gap-4">
                  <div className="h-2 bg-slate-500 dark:bg-slate-700 rounded col-span-2"></div>
                  <div className="col-span-1"></div>
                  <div className="h-2 bg-slate-500 dark:bg-slate-700 rounded col-span-1"></div>
                </div>
                <div className="space-y-3">
                  <div className="grid grid-cols-5 gap-4">
                    <div className="h-2 bg-slate-500 dark:bg-slate-700 rounded col-span-3"></div>
                    <div className="col-span-1"></div>
                    <div className="h-2 bg-slate-500 dark:bg-slate-700 rounded col-span-1"></div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const getUsersFromDB = async () => {
    const token = await JSON.parse(await getItem("token"));
    const response = await getAllUsers(token);
    if (response.status === 200) {
      setUsers(
        response.data.users.filter(
          (user: any) => user.userName !== userData.userName
        )
      );
      setUsersLoading(false);
    } else {
      setUsersLoading(false);
    }
  };

  const getUnseenMessages = async (senderId: string) => {
    const token = await JSON.parse(await getItem("token"));
    const response = await getUnseenCountMessages(token, {
      userId: userData._id,
      senderId: senderId,
    });
    if (response.status === 200) {
      return response.data.count;
    }
    return 0;
  };

  const getUserById = async (userId: string) => {
    const token = await JSON.parse(await getItem("token"));
    const response = await getUser(token, userId);
    if (response.status === 200) {
      setUserChat(response.data.user);
    }
    return null;
  };

  useEffect(() => {
    checkToken();
    getUsersFromDB();
    getUserById(router.query._id as string);
    //Connect to socket
    if (socket.current === undefined) {
      let { current } = socket as any;
      current = io("ws://localhost:3001");

      current.on("connection", () => {
        console.log("Connected to socket");
      });
    }
  }, []);

  return (
    <div className="bg-[#E8EDF2] mt-[100px] h-full max-w-screen min-w-screen dark:bg-[#0F0F12] overflow-hidden">
      <Head>
        <title>Chat page</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <DefaultSEO />
      </Head>
      <TopBar isOpenLeftBar={isOpenLeftBar} />
      <LeftBar
        isOpen={isOpenLeftBar}
        setIsOpen={setIsOpenLeftBar}
        activeLink={3}
      />
      <div
        className={`w-full ${
          isOpenLeftBar ? " xl:ml-[12%] xl:w-[88%]" : " xl:ml-[6%] xl:w-[94%]"
        } block relative h-full min-h-[89vh] p-[3em] pt-5 transition-all duration-500`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 min-h-[75vh] w-full">
          <div className="col-span-4 lg:col-span-1 flex flex-col gap-3 w-full bg-white dark:bg-[#1F2128] border-[1px] border-[#E8EDF2] dark:border-[#313442] rounded-xl p-[24px] pt-[14px]">
            <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start xl:items-center md:items-center w-full border-b-[1px] border-[#E8EDF2] dark:border-[#313442] pb-5 relative">
              <p>{messagesCount} Messages</p>
              <p
                className="text-[#8B8B93] cursor-pointer mt-2 md:mt-0 lg:mt-2 xl:mt-0"
                onClick={() => setChatListDropDown(!chatListDropDown)}
              >
                {orderChatList}{" "}
                <img src="/svg/arrow-down.svg" className="inline ml-2" />
              </p>
              <div
                className={`${
                  chatListDropDown ? "block" : "hidden"
                } bg-white dark:bg-[#1F2128] absolute bottom-[-8em] right-[-1em] md:right-0 rounded-xl border-[1px] border-[#E8EDF2] dark:border-[#313442] p-2 mt-2 z-50`}
                onMouseLeave={() => setChatListDropDown(false)}
              >
                <div className="inline-flex flex-col">
                  <p
                    className="block mx-auto text-[14px] text-[#7E7E8F] dark:text-[#8B8B93] hover:bg-[#F5F5FA] hover:text-[#07070C] dark:hover:bg-[#0F0F12] dark:hover:text-[#fff] py-3 px-5 rounded-[8px] cursor-pointer"
                    onClick={() => {
                      setChatListDropDown(false);
                      setOrderChatList("More Recent");
                    }}
                  >
                    More recent
                  </p>
                  <div className="w-11/12 h-[1px] block mx-auto bg-[#F5F5FA] dark:bg-[#313442] my-2"></div>
                  <p
                    className="block mx-auto text-[14px] text-[#7E7E8F] dark:text-[#8B8B93] hover:bg-[#F5F5FA] hover:text-[#07070C] dark:hover:bg-[#0F0F12] dark:hover:text-[#fff] py-3 px-5 rounded-[8px] cursor-pointer"
                    onClick={() => {
                      setChatListDropDown(false);
                      setOrderChatList("Less Recent");
                    }}
                  >
                    Less recent
                  </p>
                </div>
              </div>
            </div>
            <div className={`flex items-center relative w-full`}>
              <img src="/svg/search-normal.svg" className={styles.searchIcon} />
              <input
                type="text"
                name="searchMessage"
                id=""
                placeholder="People, messages..."
                className={`bg-transparent py-2 rounded-[12px] text-[#C6CBD9] focus:outline-none focus:shadow-outline ${styles.inputSearch} placeholder-[#9A9AAF] dark:placeholder-[#64646F] border-[1px] border-[#E8EDF2] dark:border-[#313442] placeholder:font-normal w-full`}
                onChange={(e) => setSearchInput(e.target.value)}
              />
            </div>
            <div className="flex flex-col gap-5 h-full overflow-y-auto">
              {usersLoading ? (
                <SkeletonUsersCard />
              ) : users.length > 0 ? (
                users.map((user: any, index: number) => (
                  <Link href={`/chat/${user._id}`}>
                    <div
                      className="flex flex-row cursor-pointer p-2 py-5 rounded-lg w-full border-[1px] border-[#E8EDF2] dark:border-[#313442] bg-[#F5F5A] dark:bg-[bg-[#F5F5A] #[0F0F12]"
                      key={`userCard-${index}`}
                    >
                      <div className="flex space-x-4 w-full">
                        <UserIcon
                          userName={user.userName}
                          avatar={user.avatar}
                        />
                        <div className="flex-1 space-y-2 py-1">
                          <div className="grid grid-cols-4 gap-4">
                            <p className="col-span-2 text-[#07070C] dark:text-[#F1F1F1] font-medium">
                              {user.userName}
                            </p>
                            <div className="col-span-1"></div>
                            <div className="h-2 bg-slate-500 dark:bg-slate-700 rounded col-span-1"></div>
                          </div>
                          <div className="space-y-3">
                            <div className="grid grid-cols-5 gap-4">
                              <div className="h-2 bg-slate-500 dark:bg-slate-700 rounded col-span-3"></div>
                              <div className="col-span-1"></div>
                              <div className="h-2 bg-slate-500 dark:bg-slate-700 rounded col-span-1"></div>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </Link>
                ))
              ) : (
                <p className="text-center text-[#9A9AAF] dark:text-[#64646F] mt-2">
                  No users found
                </p>
              )}
            </div>
          </div>
          <div className="col-span-4 lg:col-span-3 flex justify-between flex-col gap-3 w-full h-full bg-white dark:bg-[#1F2128] border-[1px] border-[#E8EDF2] dark:border-[#313442] rounded-xl p-[2em] pt-[1.5em]">
            <div className="flex flex-row justify-between gap-10 border-b-[1px] border-[#E8EDF2] dark:border-[#313442] w-full pb-2 max-h-[3em]">
              <div className="flex flex-row gap-10 w-full max-h-[2em]">
                <UserIcon
                  userName={userChat.userName}
                  avatar={userChat.avatar}
                />
                <div className="flex flex-col justify-center">
                  <p className="text-[#07070C] dark:text-[#F1F1F1] font-medium text-[16px]">
                    {userChat.userName}
                  </p>
                  <p className="text-[#9A9AAF] dark:text-[#64646F] font-semibold text-[12px]">
                    {userChat.isOnline ? "Active now" : "Do not active now"}
                    <div
                      className={`inline-block ml-2 h-[10px] w-[10px] rounded-full ${
                        userChat.isOnline ? "bg-[#50D1B2]" : "bg-[#E23738]"
                      } border-[1px] border-white-200`}
                    ></div>
                  </p>
                </div>
              </div>
            </div>
            <div className="w-full relative">
              <input
                type="text"
                name="chatMessage"
                className={`${styles.inputText} placeholder:text-[12px] max-h-[50px] focus:outline focus:outline-1 focus:outline-[#B2A7FF] dark:bg-transparent dark:text-white dark:placeholder-[#64646F] border-[1px] border-[#E8EDF2] dark:border-[#313442] w-full p-5 py-8 rounded-lg`}
                placeholder="Type to add your message"
                onChange={(e) => setInputMessage(e.target.value)}
                required
                value={inputMessage}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    console.log('Enter');
                  }
                }}
              />
              <img
                src="/svg/chatSendIcon.svg"
                alt=""
                srcSet=""
                className="w-[44px] h-[44px] p-3 rounded-full bg-[#2775FF] absolute right-[2%] top-2/4 transform -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  console.log("Send");
                }}
              />
            </div>
          </div>
        </div>
        <Footer />
      </div>
    </div>
  );
};

export default Home;
