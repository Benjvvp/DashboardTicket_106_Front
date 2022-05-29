import React, { useEffect, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { SocketContext } from "./SocketContext";
import { loginWithToken } from "../../helpers/serverRequests/authUser";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";

export default function SocketContextProvider({ children }: any) {
  const router = useRouter();

  const mainUrl = process.env.NEXT_PUBLIC_MAIN_URL?.replace('/api', '') || "http://localhost:3001";

  const [socket, setSocket] = useState<Socket | null>();

  const initializeApp = async () => {
    try {
      setSocket(io(mainUrl));
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
