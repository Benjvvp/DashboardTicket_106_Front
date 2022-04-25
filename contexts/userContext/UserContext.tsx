import { createContext } from "react";

type UserContextType = {
      userData: {
          _id: string;
          userName: string,
          email: string,
          password: string,
          avatar: string,
          createdAt: string,
          updatedAt: string,
          role: string, 
      },
      isLoggedIn: boolean,
      setUserData: (state: any) => void,
      setIsLoggedIn: (state: any) => void,
}

export const UserContext = createContext<UserContextType>({} as any);