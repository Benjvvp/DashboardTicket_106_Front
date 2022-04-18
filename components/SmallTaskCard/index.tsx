import { useEffect, useState } from "react";
import { getItem } from "../../helpers/localStorage";
import { getUser } from "../../helpers/serverRequests/user";

interface SmallTaskCardProps {
  title: String;
  category: String;
  author: any;
  progress: Number;
  createdAt: Date;
}

export default function SmallTaskCard(props: SmallTaskCardProps) {
  const [authorData, setAuthorData] = useState({
    userName: "",
    avatar: "",
  });
  const { title, category, author, progress, createdAt } = props;

  const formatDate = new Date(createdAt).toLocaleDateString("en-US", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });

  const getAuthorData = async () => {
    try {
      let token = await JSON.parse(await getItem("token"));
      const response = await getUser(token, author);
      if (response.status === 200) {
        console.log(response.data.tasks);
        setAuthorData(response.data.user);
      }
      if (response.status === 500) {
        setAuthorData({
          userName: "",
          avatar: "",
        });
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    getAuthorData();
  }, []);

  return (
    <div className="flex flex-col w-full h-full rounded-xl bg-white border-[1px] border-[#E8EDF2] p-5 mt-5">
      <p className="text-[14px] text-[#535362] font-semibold">{title}</p>
      <p className="text-[12px] text-[#9A9AAF] mt-2">{category}</p>
      <div className="flex flex-row justify-between items-center mt-3">
        <div className="flex flex-row items-center gap-2">
          {authorData.avatar === undefined || null ? (
            <div className="flex items-center justify-center bg-gradient-to-r from-[#5C8FFF] to-[#C14BFF] w-[30px] h-[30px] rounded-full">
              <p className="font-bold text-[12px] text-white">
                {authorData.userName.split("")[0] +
                  authorData.userName.split("")[1]}
              </p>
            </div>
          ) : (
            <img
              src={authorData.avatar}
              width={30}
              height={30}
              alt="avatar"
              className="rounded-full"
            />
          )}
        </div>
        <p className="text-[12px] text-[#7E7E8F] py-2 px-4 rounded-2xl bg-[#E8EDF2]">
          {formatDate}
        </p>
      </div>
    </div>
  );
}
