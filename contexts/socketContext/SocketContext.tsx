import { createContext } from "react";
import { Socket } from "socket.io-client";

type SocketContextType = {
    socket: Socket | null | undefined;
    setSocket: (state: Socket | null | undefined) => void;
};

export const SocketContext = createContext<SocketContextType>({} as any);