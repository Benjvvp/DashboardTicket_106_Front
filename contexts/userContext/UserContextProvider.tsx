import React, { useEffect, useState } from 'react';
import { getItem } from '../../helpers/localStorage';
import { UserContext } from '../../contexts/userContext/UserContext';
import { loginWithToken } from '../../helpers/serverRequests/authUser';

export default function UserContextProvider({children}: any){
      const [isLoggedIn, setIsLoggedIn] = useState(false);

      const [userData, setUserData] = useState({
            userName: '',
            email: '',
            password: '',
            avatar: '',
            createdAt: '',
            updatedAt: '',
            role: '',
      });

      const initializeApp = async () => {
            try {
                  const token = await getItem('token');

                  if(!token) {
                        setIsLoggedIn(false);
                        return;
                  }

                  const response = await loginWithToken(token);
                  if(response.status === 200) {
                        setIsLoggedIn(true);
                        setUserData({...response.data});
                  }
            } catch (error) {
                  console.log(error);
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

      return (
            <UserContext.Provider value={values}>
                  {children}
            </UserContext.Provider>
      );
}