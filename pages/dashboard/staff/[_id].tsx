import type { NextPage } from "next";
import Head from "next/head";
import { useRouter } from "next/router";
import { useContext, useEffect, useMemo, useState } from "react";
import TopBar from "../../../components/Navigation/TopBar";
import PageTitle from "../../../components/PageTitle";
import DefaultSEO from "../../../components/SEO";
import { UserContext } from "../../../contexts/userContext/UserContext";
import { getItem, logoutUser } from "../../../helpers/localStorage";
import {
  deleteTaskByUser,
  deleteUser,
  getUser,
  updateUser,
  uploadAvatarUser,
} from "../../../helpers/serverRequests/user";
import Dropzone, { useDropzone } from "react-dropzone";
import { DropDownInput, InputDefault } from "../../../components/Inputs";
const StaffEdit: NextPage = () => {
  const router = useRouter();
  const idUser = router.query._id as string;

  const { userData } = useContext(UserContext);

  const [user, setUser] = useState({
    _id: "",
    userName: "",
    email: "",
    password: "",
    role: "",
    avatar: "",
    createdAt: "",
    updatedAt: "",
  });
  const [userEdit, setUserEdit] = useState({
    _id: "",
    userName: "",
    email: "",
    role: "",
    avatar: "",
    createdAt: "",
    updatedAt: "",
  });
  const [file, setFile] = useState({} as File);
  const [fileUploadProgress, setFileUploadProgress] = useState(0);
  const [fileDataUrl, setFileDataUrl] = useState("");

  const [errorUserName, setErrorUsername] = useState("");
  const [errorEmail, setErrorEmail] = useState("");

  const [sucessDeleteUser, setSucessDeleteUser] = useState(false);
  const [sucessEditUser, setSucessEditUser] = useState(false);

  const onAvatarChange = async (e: any) => {
    setFile(e.target.files[0]);
  };

  const onSubmit = async () => {
    if (file) {
      try {
        const token = await JSON.parse(await getItem("token"));
        const res = await uploadAvatarUser(
          token,
          user._id,
          file,
          setFileUploadProgress
        );
        if (res.status === 200) {
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  const deleteUserFunction = async (id: string) => {
    try {
      const token = await JSON.parse(await getItem("token"));

      const response_deleteTasksUsers = await deleteTaskByUser(token, id);
      if (response_deleteTasksUsers.status === 200) {
        if (response_deleteTasksUsers.data.isError === false) {
          setSucessDeleteUser(true);
          setTimeout(() => {
            setSucessDeleteUser(false);
          }, 2000);
        } else {
          setSucessDeleteUser(false);
        }
      }

      const response = await deleteUser(token, id);
      if (response.status === 200) {
        if (response.data.isError === false) {
          setSucessDeleteUser(true);
          setTimeout(() => {
            setSucessDeleteUser(false);
          }, 2000);
        } else {
          setSucessDeleteUser(false);
        }
      }

      if (id === userData._id) {
        logoutUser();
        router.push("/auth/login");
      }
    } catch (error) {
      console.log(error);
    }
  };

  const updateUserFunction = async () => {
    try {
      const token = await JSON.parse(await getItem("token"));

      const response = await updateUser(token, user._id, userEdit);
      if (response.status === 200) {
        if (response.data.isError === false) {
          setSucessEditUser(true);
          setTimeout(() => {
            setSucessEditUser(false);
          }, 2000);
        } else {
          setSucessEditUser(false);
          if (response.data.message === "User name already exists") {
            setErrorUsername("User name already exists");
          }
          if (response.data.message === "Email already exists") {
            setErrorEmail("Email already exists");
          }
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  const initialGetUser = async (_id: string) => {
    try {
      const token = await JSON.parse(await getItem("token"));
      const response = await getUser(token, _id);
      if (response.status === 200) {
        if (response.data.isError === false) {
          setUser(response.data.user);
          setUserEdit(response.data.user);
        } else {
          router.push("/dashboard/staff");
        }
      }
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    let fileReader: FileReader;
    initialGetUser(idUser);
    if (file.name && file.type) {
      onSubmit();
      if (file && file.type.match("image/*")) {
        fileReader = new FileReader();
        fileReader.onloadend = () => {
          setFileDataUrl(fileReader.result as string);
        };
        fileReader.readAsDataURL(file);
      }
    }
  }, [sucessDeleteUser, sucessEditUser, idUser, file, fileUploadProgress]);

  const focusedStyle = {
    borderColor: "#2196f3",
  };

  const acceptStyle = {
    borderColor: "#00e676",
  };

  const rejectStyle = {
    borderColor: "#ff1744",
  };

  function StyledDropzone(props: any) {
    const {
      getRootProps,
      getInputProps,
      isFocused,
      isDragAccept,
      isDragReject,
    } = useDropzone({
      accept: ["image/png", "image/jpeg", "image/jpg", "image/gif"],
    });

    const style = useMemo(
      () => ({
        ...(isFocused ? focusedStyle : {}),
        ...(isDragAccept ? acceptStyle : {}),
        ...(isDragReject ? rejectStyle : {}),
      }),
      [isFocused, isDragAccept, isDragReject]
    );

    return (
      <Dropzone onDrop={(acceptedFiles) => setFile(acceptedFiles[0])}>
        {({ getRootProps, getInputProps }) => (
          <div
            className="mt-2 p-5 border-[2px] border-[#E8EDF2] border-dashed dark:border-[#313442]"
            {...getRootProps({ style })}
          >
            <form action="" method="post" id="formAvatar">
              <input
                type={"file"}
                className="hidden"
                id="file"
                onChange={(e) => {
                  onAvatarChange(e);
                }}
                name="file"
                accept="image/png, image/jpeg, image/jpg, image/gif"
                {...getInputProps}
              />
            </form>
            <img
              src="/svg/imageIconTask.svg"
              alt=""
              className="mx-auto mb-5 cursor-pointer"
            />
            <p className="text-[14px] text-[#7E7E8F] dark:text-[#7E7E8F] font-medium text-center">
              Drop your image here, or{" "}
              <span
                className="dark:text-[#7364DB] cursor-pointer"
                onClick={() => {
                  document.getElementById("file")?.click();
                }}
              >
                browse
              </span>
            </p>
            <p className="text-[13px] text-[#9A9AAF] dark:text-[#64646F] mt-2 text-center">
              JPG,PNG and GIF files are allowed
            </p>
          </div>
        )}
      </Dropzone>
    );
  }

  return (
    <div className="bg-[#E8EDF2] mt-[100px] h-full min-h-screen dark:bg-[#0F0F12]">
      <Head>
        <title>Edit - [{user.userName}]</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
        <DefaultSEO />
      </Head>
      <TopBar isLarge showLogo />
      <div className="w-[100%] block relative h-full min-h-[89vh] p-[3em] px-[10%]">
        <PageTitle
          title="Staff Details"
          addBreadcrumb
          linksBreadcrumb={[
            {
              Name: "Home",
              Url: "/",
              icon: "/svg/home-2.svg",
            },
            {
              Name: "Staff",
              Url: "/dashboard/staff",
            },
          ]}
        />
        <div className="flex flex-row w-full h-full py-10 px-10 bg-white rounded-xl border-[1px] border-[#E8EDF2] dark:bg-[#1F2128] dark:border-[#313442] mt-[5%]">
          <div className="hidden lg:flex flex-col gap-5 min-h-[25%] items-start">
            {user.avatar === undefined || null ? (
              <div
                className={`rounded-md border-[.6px] border-[#E8EDF2] dark:border-[#313442] p-2`}
              >
                <div className="flex items-center justify-center bg-gradient-to-r from-[#5C8FFF] to-[#C14BFF] w-[250px] h-[250px] rounded-md">
                  <p className="font-bold text-[2em] text-white">
                    {user.userName.split("")[0] + user.userName.split("")[1]}
                  </p>
                </div>
              </div>
            ) : (
              <img
                src={user.avatar}
                width={250}
                height={250}
                alt="avatar"
                className="border-[.6px] border-[#E8EDF2] dark:border-[#313442] p-2 rounded-md"
              />
            )}
            <StyledDropzone />
            {fileUploadProgress > 1 && (
              <div className="w-full border-[1px] dark:border-[#313442] p-[12px] flex flex-row items-center">
                <img
                  src={fileDataUrl}
                  alt=""
                  srcSet=""
                  className="block max-w-[40px] rounded-sm mr-3"
                />
                <div className="w-full flex flex-row gap-5">
                  <div className="flex flex-col w-full">
                    <p className="text-[14px] mb-2 text-[#7E7E8F] dark:text-[#7E7E8F] font-medium">
                      {file.name.split(".")[0].length > 15
                        ? file.name.split(".")[0].substring(0, 15) +
                          "..." +
                          file.name.split(".")[1]
                        : file.name}
                    </p>
                    <div
                      className={`block h-[3px] rounded-xl bg-[#50D1B2] max-w-full`}
                      style={{ width: `${fileUploadProgress}%` }}
                    ></div>
                  </div>
                  <div>
                    <div className="block h-full">
                      <div className="flex h-full w-[2em] rounded-full items-center justify-center">
                        <img
                          src="/svg/ticketIcon.svg"
                          alt=""
                          srcSet=""
                          className="w-[100%]"
                        />
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>
          <div className="flex flex-col w-full h-full justify-center items-center gap-5">
            <div className="flex flex-col h-full gap-2 w-full px-5 xl:px-10">
              <div
                className={`p-5 w-full rounded-xl mt-5 text-white bg-green-600 dark:bg-green-700 text-center ${
                  sucessDeleteUser || sucessEditUser ? "block" : "hidden"
                } mb-5`}
              >
                <p>
                  {sucessDeleteUser ? "User successfully deleted" : ""}
                  {sucessEditUser ? "User successfully edited" : ""}
                </p>
              </div>
              <div className="flex flex-col xl:flex-row gap-5 w-full h-full justify-start items-left">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="userNameInput"
                    className="block text-sm text-[#07070C] dark:text-white"
                  >
                    Your Name
                  </label>
                  <div className="flex flex-row gap-5">
                    <InputDefault
                      placeholder="User Name"
                      iconPath="/svg/user.svg"
                      name="userNameInput"
                      type="text"
                      onChange={(e: any) => {
                        setUserEdit({
                          ...userEdit,
                          userName: e.target.value,
                        });
                      }}
                      error={errorUserName}
                      required
                      value={userEdit.userName}
                    />
                  </div>
                </div>

                <div className="flex flex-col w-full">
                  <label
                    htmlFor="emailInput"
                    className="block text-sm text-[#07070C] dark:text-white"
                  >
                    E-mail
                  </label>
                  <div className="flex flex-row gap-5">
                    <InputDefault
                      placeholder="Email"
                      iconPath="/svg/sms.svg"
                      name="emailInput"
                      type="email"
                      onChange={(e: any) => {
                        setUserEdit({
                          ...userEdit,
                          email: e.target.value,
                        });
                      }}
                      error={errorEmail}
                      required
                      value={userEdit.email}
                    />
                  </div>
                </div>
              </div>

              <div className="flex flex-col xl:flex-row gap-5 w-full h-full justify-start items-left mt-2">
                <div className="flex flex-col w-full">
                  <label
                    htmlFor="userNameInput"
                    className="block text-sm text-[#07070C] dark:text-white"
                  >
                    Role
                  </label>
                  <div
                    className={`flex flex-row gap-5 relative ${
                      userData.role === "Admin" ? "" : "cursor-not-allowed"
                    }`}
                  >
                    <DropDownInput
                      name="Role"
                      text={userEdit.role}
                      onClick={(e) =>
                        setUserEdit({
                          ...userEdit,
                          role: e.currentTarget.innerHTML,
                        })
                      }
                      classNameInput="dark:placeholder-[#64646F] text-[14px] text-[#9A9AAF] dark:text-[#64646F]"
                      list={["Admin", "General Staff"]}
                      iconPath="/svg/arrow-down.svg"
                      disabled={userData.role === "Admin" ? false : true}
                      className={`${
                        userData.role === "Admin" ? "" : "cursor-not-allowed"
                      }`}
                    />
                  </div>
                </div>
              </div>
              <div className="mt-10 flex flex-row flex-wrap gap-3 items-center w-full h-full justify-start">
                <button
                  type="button"
                  className="bg-[#7364DB] text-white font-semibold py-2 px-4 rounded-lg text-sm dark:text-white text-[14px]"
                  onClick={() => {
                    updateUserFunction();
                  }}
                >
                  Update
                </button>
                <button
                  type="button"
                  className="bg-[#E23738] text-white font-semibold py-2 px-4 rounded-lg text-sm dark:text-white text-[14px]"
                  onClick={() => {
                    deleteUserFunction(user._id);
                  }}
                >
                  Delete
                </button>
                <button
                  type="button"
                  className="bg-[#E8EDF2] text-[#B8B1E4] font-semibold py-2 px-4 rounded-lg text-sm dark:bg-[#313442] text-[14px]"
                  onClick={() => {
                    setSucessDeleteUser(false);
                    setSucessEditUser(false);
                    router.push("/dashboard/staff");
                  }}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StaffEdit;
