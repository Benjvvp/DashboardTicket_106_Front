import Link from "next/link";
import { useEffect, useState } from "react";
import UserIcon from "../UserIcon";

interface LargeUserCardProps {
  _id: string;
  userName: string;
  avatar: string;
  createdAt: Date;
  role: string;
  email: string;
  setModalDeleteUser: (value: boolean) => void;
  setUserIdToDelete: (value: string) => void;
}

export default function LargeUserCard(props: LargeUserCardProps) {
  const { userName, avatar, createdAt, role, _id, email } = props;

  const [dropDownOptions, setDropDownOptions] = useState(false);

  const formatDate = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });

  useEffect(() => {
    props.setUserIdToDelete(_id);
  }, [_id]);

  return (
    <div className="flex flex-row w-full h-full rounded-xl bg-white dark:bg-[#1F2128] border-[1px] border-[#E8EDF2] dark:border-[#313442] p-5 mt-5 px-5 items-center">
      <div className="mr-5">
        <UserIcon userName={userName} avatar={avatar} />
      </div>
      <div className="inline w-full h-full gap-2">
        <p className="text-[14px] text-[#07070C] dark:text-[#FFFFFF] font-semibold">
          {userName}
        </p>
      </div>
      <div className="hidden xl:flex flex-row items-center w-full h-full gap-2">
        <img src="/svg/icoEmail.svg" alt="" srcSet="" />
        <p className="text-[14px] text-[#9A9AAF] dark:text-[#64646F]">
          {email}
        </p>
      </div>
      <div className="hidden md:flex flex-row items-center w-full h-full gap-2">
        <img src="/svg/icocalendar.svg" alt="" srcSet="" />
        <p className="text-[14px] text-[#9A9AAF] dark:text-[#64646F]">
          {formatDate}
        </p>
      </div>
      <div className="hidden xl:flex flex-row items-center w-4/12 py-2 rounded-2xl h-full gap-2 border-[1px] border-[#E8EDF2] dark:border-[#E8EDF2]">
        <p
          className={`text-[14px] ${
            role === "Admin" ? "text-[#7364DB]" : "text-[#50D1B2]"
          } mx-auto text-center font-medium`}
        >
          {role}
        </p>
      </div>
      <div className="flex flex-row items-center justify-end w-6/12 h-full gap-2 relative">
        <img
          src="/svg/toggle.svg"
          className="rotate-90 mr-2 cursor-pointer"
          alt=""
          srcSet=""
          width={3}
          onClick={() => {
            setDropDownOptions(!dropDownOptions);
            props.setUserIdToDelete(_id);
          }}
        />
        <div
          className={`${
            dropDownOptions ? "block" : "hidden"
          } bg-white dark:bg-[#1F2128] absolute bottom-[-8em] right-[1em] rounded-xl border-[1px] border-[#E8EDF2] dark:border-[#313442] p-2 mt-2`}
          onMouseLeave={() => setDropDownOptions(false)}
        >
          <div className="inline-flex flex-col">
            <Link href={`/dashboard/staff/${_id}`}>
              <a className="block mx-auto text-[14px] text-[#7E7E8F] dark:text-[#8B8B93] hover:bg-[#F5F5FA] hover:text-[#07070C] dark:hover:bg-[#0F0F12] dark:hover:text-[#fff] py-3 px-5 rounded-[8px] cursor-pointer">
                Edit
              </a>
            </Link>
            <div className="w-11/12 h-[1px] block mx-auto bg-[#F5F5FA] dark:bg-[#313442] my-2"></div>
            <a
              className="block mx-auto text-[14px] text-[#7E7E8F] dark:text-[#8B8B93] hover:bg-[#F5F5FA] hover:text-[#07070C] dark:hover:bg-[#0F0F12] dark:hover:text-[#fff] py-3 px-5 rounded-[8px] cursor-pointer"
              onClick={() => {
                props.setModalDeleteUser(true);
              }}
            >
              Delete
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}
