import { useEffect, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { getAllUsers } from "../../helpers/serverRequests/user";
import UserIcon from "../UserIcon";
export default function NewActiveUsers() {
  const [users, setUsers] = useState([]);

  const initializeGetUsers = async () => {
    try {
      let token = await JSON.parse(await getItem("token"));

      const response = await getAllUsers(token);
      if (response.status === 200) {
        if (response.data.isError === false) {
          setUsers(response.data.users);
        } else {
          setUsers([]);
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    initializeGetUsers();
  }, [setUsers]);

  return (
    <div className="hidden lg:flex flex-col w-full h-4/12 py-2 px-5 bg-white rounded-xl border-[1px] border-[#E8EDF2] dark:bg-[#1F2128] dark:border-[#313442]">
      <div className="flex flex-row justify-between items-center pb-2 border-b-[1px] border-[#E8EDF2] dark:border-[#313442]">
        <h4 className="font-semibold text-[16px] text-[#07070C] dark:text-white">
          New active users
        </h4>
      </div>
      <div className="flex flex-col p-5 w-full relative justify-center text-center mx-auto my-5">
        {users.length > 0 ? (
          <div className="flex flex-col w-full gap-5">
            {users
              .filter((user: any) => user.filesPushed > 0)
              .sort((a: any, b: any) => b.filesPushed - a.filesPushed)
              .slice(0, 6)
              .map((user: any) => (
                <div className="flex flex-row justify-between items-center" key={`activeUsers-${user.userName}`}>
                  <div className="flex flex-row gap-2 items-center">
                    <UserIcon userName={user.userName} avatar={user.avatar} />
                    <div className="flex flex-col justify-between text-left pl-2">
                      <h4 className="text-[14px] text-[#07070C] dark:text-[#F1F1F1]">
                        {user.userName}
                      </h4>
                      <p className="text-[12px] text-[#9A9AAF] dark:[#64646F]">
                        {user.role}
                      </p>
                    </div>
                  </div>
                  <p className="text-[12px] text-[#9A9AAF] dark:[#64646F]">
                    <span className="font-bold">{user.filesPushed}</span>
                    <br />
                    files
                  </p>
                </div>
              ))}
          </div>
        ) : (
          <div className="flex flex-col w-full">
            <p className="text-[14px] text-[#07070C] dark:text-[#F1F1F1]">
              No new active users
            </p>
          </div>
        )}
      </div>
    </div>
  );
}
