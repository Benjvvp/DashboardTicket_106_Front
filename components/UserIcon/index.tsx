import { memo } from "react";

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
        <div className={`flex items-center justify-center bg-gradient-to-r from-[#5C8FFF] to-[#C14BFF] w-[30px] h-[30px] rounded-full ${isListMembers ? "border-white dark:border-[#1F2128] border-[1.4px]" : ""}`}>
          <p className="font-bold text-[12px] text-white">
            {userName.split("")[0] +
              userName.split("")[1]}
          </p>
        </div>
      ) : (
        <img
          src={avatar}
          width={30}
          height={30}
          alt="avatar"
          className={`rounded-full ${isListMembers ? "border-white dark:border-[#1F2128] border-[1.4px]" : ""}`}
        />
      )}
    </>
  );
}
export default memo(UserIcon);