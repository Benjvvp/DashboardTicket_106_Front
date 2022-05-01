import { memo, useEffect } from "react";

interface propsUserIcon {
  userName: string;
  avatar?: string;
  isListMembers?: boolean;
}
function UserIcon(props: propsUserIcon) {
  const { userName, avatar, isListMembers } = props;

  return (
    <>
      {avatar === undefined || null ? (
        <div className={`flex items-center justify-center bg-gradient-to-r from-[#5C8FFF] to-[#C14BFF] w-[30px] h-[30px] rounded-full ${isListMembers ? "border-[#F5F5FA] dark:border-[#0F0F12] border-[1.4px]" : ""}`}>
          <p className="font-bold text-[12px] text-white">
            {userName.split("")[0] +
              userName.split("")[1]}
          </p>
        </div>
      ) : (
        <img
          src={avatar}
          alt="avatar"
          className={`rounded-full w-100 max-w-[30px] ${isListMembers ? "border-[#F5F5FA] dark:border-[#0F0F12] border-[1.4px]" : ""}`}
        />
      )}
    </>
  );
}
export default memo(UserIcon);