import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import react, {
  LegacyRef,
  useContext,
  useEffect,
  useRef,
  useState,
} from "react";
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
import {
  getMessagesInChat,
  getUnseenCountMessages,
} from "../../helpers/serverRequests/chat";
import Link from "next/link";

const ChatUser: NextPage = () => {
  const router = useRouter();
  const idUserParam = router.query._id as string;

  const chatRef = useRef<HTMLDivElement>(null);
  const [socket, setSocket] = useState<Socket | null>(null);
  const [messagesToShow, setMessagesToShow] = useState<number>(100);
  const { userData } = useContext(UserContext);

  const [users, setUsers] = useState([
    {
      _id: "",
      userName: "",
      avatar: "",
      isOnline: false,
      lastMessage: "",
      lastMessageTime: "",
      unseenMessagesCount: 0,
    },
  ]);
  const [userChat, setUserChat] = useState({
    _id: "",
    userName: "",
    avatar: "",
    isOnline: false,
  });
  const [userChatLoaded, setUserChatLoaded] = useState(false);

  const [usersLoading, setUsersLoading] = useState(true);

  const [isOpenLeftBar, setIsOpenLeftBar] = useState(true);

  const [orderChatList, setOrderChatList] = useState<String>("More Recent");
  const [chatListDropDown, setChatListDropDown] = useState<Boolean>(false);

  const [messagesCount, setMessagesCount] = useState<number>(0);

  const [isLoad, setIsLoad] = useState<Boolean>(false);

  const [searchInput, setSearchInput] = useState("");

  const [inputMessage, setInputMessage] = useState("");

  const [messages, setMessages] = useState<
    Array<{
      message: string;
      user: string;
      sender: string;
      createdAt: Date;
      seen: Boolean;
    }>
  >([]);
  const [messagesLoading, setMessagesLoading] = useState(true);

  const checkToken = async () => {
    const token = await getItem("token");
    if (!token || token === undefined || token === "undefined")
      router.push("/auth/login");
  };

  const onSubmitMessage = async () => {
    if (inputMessage !== "") {
      const data = {
        message: inputMessage,
        userId: userChat._id,
        senderId: userData._id,
      };
      socket?.emit("chatSubmitMessage", data);
      setInputMessage("");
    }
  };

  const SkeletonUsersCard = () => {
    const users = [1, 2, 3, 4, 5];
    return (
      <>
        {users.map((user, index) => (
          <div
            className="flex flex-row p-2 py-5 rounded-lg w-full border-[1px] border-[#E8EDF2] dark:border-[#313442] bg-[#F5F5A] dark:bg-[bg-[#F5F5A] #[0F0F12]"
            key={`cardUserSkeleton-${index}-${user}`}
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
  const SkeletonMessagesCard = () => {
    const messages = [1, 1, 2, 1];
    return (
      <>
        {messages.map((user, index) => (
          <div
            className={`flex flex-col p-2 py-5 w-5/12 bg-[#F5F5A] dark:bg-[bg-[#F5F5A] #[0F0F12] ${
              user === 1 ? "ml-auto" : ""
            }`}
            key={`cardMessagesSkeleton-${index}-${user}`}
          >
            <div
              className={`animate-pulse flex flex-row items-center gap-5 w-full ${
                user === 1 ? "flex-row-reverse" : ""
              }`}
            >
              <div className="rounded-full bg-slate-400 dark:bg-slate-700 h-10 w-10"></div>
              <div className="flex-1 space-y-2">
                <div
                  className={`grid grid-cols-12`}
                  dir={user === 1 ? "rtl" : "ltr"}
                >
                  <div className="h-2 bg-slate-500 dark:bg-slate-700 rounded col-span-3"></div>
                  <div className="col-span-1"></div>
                  <div className="h-2 bg-slate-500 dark:bg-slate-700 rounded col-span-1"></div>
                </div>
              </div>
            </div>
            <div
              className={`animate-pulse flex space-x-4 w-full ${
                user === 1 ? "pr-10" : "pl-10"
              }`}
            >
              <div className="flex-1 space-y-2 py-1">
                <div className="grid grid-cols-4 gap-4">
                  <div
                    className={`h-10 bg-slate-500 dark:bg-slate-700 rounded-lg col-span-4 ${
                      user === 1 ? "rounded-tr-none" : "rounded-tl-none"
                    }`}
                  ></div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </>
    );
  };

  const getUserById = async (userId: string) => {
    const token = await JSON.parse(await getItem("token"));
    const response = await getUser(token, userId);
    if (response.status === 200) {
      const isOnline = users.find((user) => user._id === userId)?.isOnline;
      setUserChat({
        _id: response.data.user._id,
        userName: response.data.user.userName,
        avatar: response.data.user.avatar,
        isOnline: isOnline ? isOnline : false,
      });
      setUserChatLoaded(true);
    }
    return null;
  };

  useEffect(() => {
    checkToken();
    if (router.isReady) {
      if (users) {
        getUserById(idUserParam);
      }
    }

    if (!messagesLoading) {
      if (chatRef.current) {
        chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
      }
    }
  }, [
    router.isReady,
    setMessages,
    setUserChat,
    setUserChatLoaded,
    userChat._id,
    chatRef,
    idUserParam,
    userData._id,
    messagesLoading,
    getMessagesInChat,
  ]);
  //Socket
  useEffect(() => {
    const newSocket = io("https://ada4-190-21-76-49.sa.ngrok.io");
    newSocket.on("connect", () => {
      newSocket.emit("join", { userId: userData._id });
    });
    newSocket.on("disconnect", () => {
      newSocket.emit("leave", { userId: userData._id });
    });
    if (userData._id) {
      newSocket.emit("getUsersListInChat", {
        userId: userData._id,
      });
    }
    newSocket.on("getUsersListInChat", (data: any) => {
      console.log(data);
      setUsers(data.usersList);
      setUsersLoading(false);
    });
    newSocket.on("loadMessages", (data: any) => {
      setMessages(data.messages);
      setMessagesLoading(false);
    });
    newSocket.on("getUsersListInChat", (data: any) => {
      setUsers(data.usersList);
      setUsersLoading(false);
      data.usersList.forEach((user: any) => {
        setMessagesCount(messagesCount + user.messagesCount);
      });
    });
    if (userData && userChat) {
      newSocket.emit("loadMessages", {
        userId: userData._id,
        senderId: userChat._id,
      });
      newSocket.emit("getUsersListInChat", {
        userId: userData._id,
      });
    }
    setSocket(newSocket);
  }, [setSocket, userData._id, usersLoading]);

/*   useEffect(() => {
    if (userChat._id && userData._id) {
      socket?.on("chatMessage", (data: any) => {
        const tempMessages = [...messages, data];
        setMessages(tempMessages);
        if (chatRef.current) {
          chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
        }
      });
      socket?.emit("chatSeen", {
        userId: userData._id,
        senderId: userChat._id,
      });
      socket?.on("chatSeen", () => {
        const newMessages = [...messages];
        newMessages.forEach((message) => {
          if (message.sender === userChat._id) {
            message.seen = true;
          }
        });
        setMessages(newMessages);
      });
    }
  }, [messages, setMessages, userChat._id, userData._id, socket]); */
  useEffect(() => {
    if (chatRef.current) {
      chatRef.current.scrollTo(0, chatRef.current.scrollHeight);
    }
  }, [setMessages]);
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
        } block relative h-full min-h-[89.5vh] max-h-[89vh] p-[3em] pt-5 transition-all duration-500`}
      >
        <div className="grid grid-cols-1 lg:grid-cols-4 gap-3 min-h-[75vh] max-h-[75vh] h-full">
          <div className="col-span-4 lg:col-span-1 flex flex-col gap-3 w-full bg-white dark:bg-[#1F2128] border-[1px] border-[#E8EDF2] dark:border-[#313442] rounded-xl p-[24px] pt-[14px]">
            <div className="flex flex-col md:flex-row lg:flex-col xl:flex-row justify-between lg:items-start xl:items-center md:items-center w-full border-b-[1px] border-[#E8EDF2] dark:border-[#313442] pb-5 relative">
              <p>{messagesCount ? messagesCount : 0} Messages</p>
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
            <div className="flex flex-col gap-5 h-full overflow-y-auto max-h-[70vh]">
              {usersLoading ? (
                <SkeletonUsersCard />
              ) : users.length > 0 ? (
                users
                  .filter((user: any) => {
                    return user.userName !== userData.userName;
                  })
                  .sort((user: any, nextUser: any) => {
                    if (!user.lastMessageTime) {
                      return 1;
                    }
                    if (orderChatList === "More Recent") {
                      return new Date(nextUser.lastMessageTime) >
                        new Date(user.lastMessageTime)
                        ? 1
                        : -1;
                    }
                    if (orderChatList === "Less Recent") {
                      return new Date(user.lastMessageTime) >
                        new Date(nextUser.lastMessageTime)
                        ? 1
                        : -1;
                    }
                    return 1;
                  })
                  .map((user: any, index: number) => {
                    return (
                      <Link
                        href={`/chat/${user._id}`}
                        key={`chatTextCardPageUser-${index}-${user._id}`}
                      >
                        <div className="flex flex-row cursor-pointer p-2 py-3 px-5 rounded-lg w-full border-[1px] border-[#E8EDF2] dark:border-[#313442] bg-[#F5F5A] dark:bg-[bg-[#F5F5A] #[0F0F12]">
                          <div className="flex space-x-4 items-center w-full">
                            <UserIcon
                              userName={user.userName}
                              avatar={user.avatar}
                            />
                            <div className="flex-1 py-1">
                              <div className="flex flex-row  justify-between items-center">
                                <div>
                                  <p className="col-span-2 text-[#07070C] dark:text-[#F1F1F1] font-medium inline-block">
                                    {user.userName}
                                  </p>
                                  {user.unseenMessagesCount > 0 && (
                                    <p className="text-[#FFFFFF] inline-block p-1 px-[.5em] bg-[#E23738] rounded-md text-[12px] ml-2">
                                      {user.unseenMessagesCount}
                                    </p>
                                  )}
                                </div>
                                <p className="col-span-2 text-[#9A9AAF] dark:text-[#64646F] text-[12px]">
                                  {user.lastMessageTime.length > 0 &&
                                    new Date(
                                      user.lastMessageTime
                                    ).toLocaleTimeString("en-US", {
                                      hour12: true,
                                      hour: "numeric",
                                      minute: "numeric",
                                      hourCycle: "h24",
                                      timeZone:
                                        Intl.DateTimeFormat().resolvedOptions()
                                          .timeZone,
                                    })}
                                </p>
                              </div>
                              <div className="space-y-3">
                                <div className="block w-full">
                                  <p className="text-[#9A9AAF] dark:text-[#64646F] text-[12px]">
                                    {user.lastMessage.length > 20
                                      ? user.lastMessage.slice(0, 20) + "..."
                                      : user.lastMessage}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </Link>
                    );
                  })
              ) : (
                <p className="text-center text-[#9A9AAF] dark:text-[#64646F] mt-2">
                  No users found
                </p>
              )}
            </div>
          </div>
          <div className="col-span-4 lg:col-span-3 flex justify-between flex-col gap-3 w-full h-full bg-white dark:bg-[#1F2128] border-[1px] border-[#E8EDF2] dark:border-[#313442] rounded-xl p-[2em] pt-[1.5em] max-h-[75vh]">
            <div className="flex flex-row justify-between gap-10 border-b-[1px] border-[#E8EDF2] dark:border-[#313442] w-full pb-2 max-h-[3em]">
              <div className="flex flex-row gap-10 w-full max-h-[2em]">
                {userChatLoaded ? (
                  <>
                    <UserIcon
                      userName={userChat.userName}
                      avatar={userChat.avatar}
                    />
                    <div className="flex flex-col justify-center">
                      <p className="text-[#07070C] dark:text-[#F1F1F1] font-medium text-[16px]">
                        {userChat.userName}
                      </p>
                      <div className="w-full">
                        <p className="inline-block text-[#9A9AAF] dark:text-[#64646F] font-semibold text-[12px]">
                          {userChat.isOnline
                            ? "Active now"
                            : "Do not active now"}
                        </p>
                        <div
                          className={`inline-block ml-2 h-[10px] w-[10px] rounded-full ${
                            userChat.isOnline ? "bg-[#50D1B2]" : "bg-[#E23738]"
                          } border-[1px] border-white-200`}
                        ></div>
                      </div>
                    </div>
                  </>
                ) : (
                  <div className="grid grid-cols-4 gap-4">
                    <div className="col-span-1"></div>
                    <div className="h-2 bg-slate-500 dark:bg-slate-700 rounded col-span-1"></div>
                  </div>
                )}
              </div>
            </div>
            <div
              className="flex flex-col h-full overflow-y-auto w-full max-h-[70vh] px-5"
              style={{ maxHeight: "100%" }}
              ref={chatRef}
              onScroll={(e) => {
                //Check if user is at the top of the chat and if so, load more messages from the server
                if (e.currentTarget.scrollTop === 0 && !messagesLoading) {
                  console.log("Loading more messages");
                  setMessagesToShow(messagesToShow + 100);
                }
              }}
            >
              {messagesLoading ? (
                <SkeletonMessagesCard />
              ) : messages.length > 0 ? (
                messages.map(
                  (
                    message: {
                      message: string;
                      user: string;
                      sender: string;
                      createdAt: Date;
                      seen: Boolean;
                    },
                    index: number
                  ) => {
                    const separatorForDiferentDate =
                      index === 0 ||
                      new Date(message.createdAt).getDate() !==
                        new Date(messages[index - 1].createdAt).getDate();

                    return (
                      <>
                        {separatorForDiferentDate && (
                          <div
                            className="flex flex-col justify-center"
                            key={`separatorForDate-${index}`}
                          >
                            <p className="text-center text-[#9A9AAF] dark:text-[#64646F] font-regular text-[12px]">
                              {new Date(message.createdAt).toLocaleDateString(
                                "en-US",
                                {
                                  month: "long",
                                  day: "numeric",
                                  year: "numeric",
                                }
                              )}
                            </p>
                          </div>
                        )}

                        <div
                          className={`flex flex-col p-2 py-5 w-5/12 bg-[#F5F5A] dark:bg-[bg-[#F5F5A] #[0F0F12] ${
                            message.sender === userData._id ? "ml-auto" : ""
                          }`}
                          key={`messageInChatsUsers-${index}`}
                        >
                          <div
                            className={`flex flex-row items-center gap-5 w-full ${
                              message.sender === userData._id
                                ? "flex-row-reverse"
                                : ""
                            }`}
                          >
                            <UserIcon
                              userName={
                                message.sender === userData._id
                                  ? userData.userName
                                  : userChat.userName
                              }
                              avatar={
                                message.sender === userData._id
                                  ? userData.avatar
                                  : userChat.avatar
                              }
                            />
                            <div className="flex-1 space-y-2">
                              <div
                                className={`flex flex-row gap-2`}
                                dir={
                                  message.sender === userData._id
                                    ? "rtl"
                                    : "ltr"
                                }
                              >
                                <p className="text-[#656575] dark:text-[#70707C] text-[12px]">
                                  {message.sender === userData._id
                                    ? userData.userName
                                    : userChat.userName}
                                </p>
                                <p className="text-[#9A9AAF] dark:text-[#64646F] text-[12px]">
                                  {
                                    //Date format to client side to show the time
                                    new Date(message.createdAt)
                                      .toLocaleTimeString("en-US", {
                                        hour12: true,
                                        hour: "numeric",
                                        minute: "numeric",
                                        hourCycle: "h24",
                                        timeZone:
                                          Intl.DateTimeFormat().resolvedOptions()
                                            .timeZone,
                                      })
                                      .split(" ")
                                      .join("")
                                  }
                                </p>
                              </div>
                            </div>
                          </div>
                          <div
                            className={`flex space-x-4 w-full ${
                              message.sender === userData._id
                                ? "pr-10"
                                : "pl-10"
                            }`}
                          >
                            <div className="flex-1 space-y-2 py-1">
                              <div className="grid grid-cols-4 gap-4">
                                <div
                                  className={`bg-[#E8EDF2] dark:bg-[#313442] p-5 rounded-lg col-span-4 ${
                                    message.sender === userData._id
                                      ? "rounded-tr-none"
                                      : "rounded-tl-none"
                                  }`}
                                >
                                  <p className="text-[12px] text-[#07070C] dark:text-[#F1F1F1]">
                                    {message.message}
                                  </p>
                                </div>
                              </div>
                            </div>
                          </div>
                        </div>
                      </>
                    );
                  }
                )
              ) : null}
            </div>
            <div className="relative">
              <input
                name="chatMessage"
                className={`${styles.inputText} placeholder:text-[12px] h-[50px] max-h-[100px] focus:outline focus:outline-1 focus:outline-[#B2A7FF] dark:bg-transparent dark:text-white dark:placeholder-[#64646F] border-[1px] border-[#E8EDF2] dark:border-[#313442] w-full p-5 py-8 rounded-lg`}
                placeholder="Type to add your message"
                onChange={(e) => setInputMessage(e.target.value)}
                required
                value={inputMessage}
                onKeyDown={(e) => {
                  if (e.key === "Enter") {
                    onSubmitMessage();
                  }
                }}
              />
              <img
                src="/svg/chatSendIcon.svg"
                alt=""
                srcSet=""
                className="w-[44px] h-[44px] p-3 rounded-full bg-[#2775FF] absolute right-[2%] top-2/4 transform -translate-y-1/2 cursor-pointer"
                onClick={() => {
                  onSubmitMessage();
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

export default ChatUser;
