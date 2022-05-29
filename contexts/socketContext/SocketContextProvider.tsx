import React, { useEffect, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { SocketContext } from "./SocketContext";
import { loginWithToken } from "../../helpers/serverRequests/authUser";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";

export default function SocketContextProvider({ children }: any) {
  const router = useRouter();

  const [socket, setSocket] = useState<Socket | null>();

  const initializeApp = async () => {
    try {
      let token = await JSON.parse(await getItem("token"));
      if (!token || token === null) {
        router.push("/auth/login");
        return;
      }
      setSocket(io(`${process.env.NEXT_PUBLIC_MAIN_URL as string || "http://localhost:3001"}`));
    } catch (error) {
      setSocket(null);
    }
  };

  useEffect(() => {
    initializeApp();
  }, []);

  const values = {
    socket,
    setSocket,
  };

  return (
    <SocketContext.Provider value={values}>{children}</SocketContext.Provider>
  );
}
