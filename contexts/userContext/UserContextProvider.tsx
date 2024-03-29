import React, { useEffect, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { UserContext } from "../../contexts/userContext/UserContext";
import { loginWithToken } from "../../helpers/serverRequests/authUser";
import { useRouter } from "next/router";
import { io, Socket } from "socket.io-client";

export default function UserContextProvider({ children }: any) {
  const router = useRouter();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  const [userData, setUserData] = useState({
    _id: "",
    userName: "",
    email: "",
    password: "",
    avatar: "",
    createdAt: "",
    updatedAt: "",
    role: "",
  });

  const initializeApp = async () => {
    try {
      let token = await JSON.parse(await getItem("token"));
      if (!token || token === null) {
        router.push("/auth/login");
        setIsLoggedIn(false);
        return;
      }

      const response = await loginWithToken(token);
      if (response.status === 200) {
        if (response.data.isError === false) {
          setIsLoggedIn(true);
          setUserData({ ...response.data.user });
        } else {
          router.push("/auth/login");
          setIsLoggedIn(false);
        }
      }
    } catch (error) {
      setIsLoggedIn(false);
    }
    setIsLoggedIn(false);
  };

  useEffect(() => {
    initializeApp();
  }, []);

  const values = {
    userData,
    isLoggedIn,
    setUserData,
    setIsLoggedIn,
  };

  return <UserContext.Provider value={values}>{children}</UserContext.Provider>;
}
