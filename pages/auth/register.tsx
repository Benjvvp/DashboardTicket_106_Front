import type { NextPage } from "next";
import Head from "next/head";
import Image from "next/image";
import TopBar from "../../components/Navigation/TopBar";
import { InputDefault } from "../../components/Inputs";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { registerUser } from "../../helpers/serverRequests/authUser";
import { getItem, saveItem } from "../../helpers/localStorage";
import { UserContext } from "../../contexts/userContext/UserContext";
import { redirect } from "next/dist/server/api-utils";
import { useRouter } from "next/router";
import DefaultSEO from "../../components/SEO";

const Register: NextPage = () => {
  const router = useRouter();

  const [errorUserName, setErrorUserName] = useState("");
  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");
  const [errorConfirmPassword, setErrorConfirmPassword] = useState("");
  const [errorAuthCode, setErrorAuthCode] = useState("");

  const [registerCorrectly, setRegisterCorrectly] = useState(false);

  const [intentToSendForm, setIntentToSendForm] = useState(false);

  const { setIsLoggedIn, setUserData } = useContext(UserContext);

  type registerFormType = {
    userName: string;
    email: string;
    password: string;
    passwordConfirmation: string;
    AuthCode: string;
  };

  const [registerForm, setRegisterForm] = useState<registerFormType>({
    userName: "",
    email: "",
    password: "",
    passwordConfirmation: "",
    AuthCode: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    //Check all errors
    if (
      errorAuthCode === "" &&
      errorEmail === "" &&
      errorPassword === "" &&
      errorConfirmPassword === "" &&
      errorUserName === ""
    ) {
      try {
        const data: registerFormType = registerForm;
        const response = await registerUser(data);
        if (response.status === 200) {
          saveItem("token", response.data.token);
          console.log(await getItem("token"))
          setIsLoggedIn(true);
          setUserData(response.data.user);
          setRegisterCorrectly(true);
          setTimeout(() => {
            router.push("/");
          }, 2000);
        }
        if (response.status === 400) {
          if (response.data.message === "AuthCode is incorrect") {
            setErrorAuthCode("AuthCode is incorrect");
          }
          if (response.data.message === "User already exists (email)") {
            setErrorEmail("Use other email, this email is already used");
          }
          if (response.data.message === "User already exists (username)") {
            setErrorUserName("Use other username, this username is already used");
          }
        }
      } catch (error) {
        console.log(error);
      }
    }
  };

  useEffect(() => {
    if (!intentToSendForm) return;

    if (registerForm.userName.length > 0 && registerForm.userName.length < 5) {
      setErrorUserName("User name must be at least 5 characters");
    } else {
      setErrorUserName("");
    }

    if (registerForm.email.length === 0) {
      setErrorEmail("Email is required");
    } else {
      setErrorEmail("");
    }

    if(registerForm.email.split('').includes('@') === false) {
      setErrorEmail("Email is not valid");
    } else {
      setErrorEmail("");
    }

    if (registerForm.password.length === 0) {
      setErrorPassword("Password is required");
    } else {
      setErrorPassword("");
    }

    if (registerForm.password.length > 0 && registerForm.password.length < 8) {
      setErrorPassword("Password must be at least 8 characters");
    } else {
      setErrorPassword("");
    }


    if (registerForm.passwordConfirmation.length > 0 && registerForm.passwordConfirmation.length < 8) {
      setErrorConfirmPassword("Password must be at least 8 characters");
    } else {
      setErrorConfirmPassword("");
    }

    if (registerForm.password !== registerForm.passwordConfirmation) {
      setErrorConfirmPassword(
        "Password and password confirmation must be the same"
      );
    } else {
      setErrorConfirmPassword("");
    }

    if (registerForm.AuthCode.length === 0) {
      setErrorAuthCode("Auth code is required");
    } else {
      setErrorAuthCode("");
    }
  }, [registerForm, intentToSendForm]);

  return (
    <div className="bg-[#E8EDF2] h-full min-h-screen dark:bg-[#313442]">
      <Head>
        <title>Register - Project Demo</title>
        <meta name="description" content="Login project" />
        <link rel="icon" href="/favicon.ico" />
        <DefaultSEO />
      </Head>
      <TopBar onlyLogo showActionButton />
      <div className="h-full py-10 flex items-center justify-center">
        <div className="max-w-md w-full space-y-2 border border-[#E8EDF2] rounded-2xl bg-[#ffffff] py-12 px-4 sm:px-6 lg:px-8 dark:bg-[#1F2128] dark:border-[#313442]">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/svg/Launching1.svg"
              alt="Launching"
            />
            <h2 className="text-center text-[24px] font-bold text-[#07070C] dark:text-white">
              Create an account
            </h2>
            <p className="mt-2 text-center text-sm text-[#7E7E8F] dark:text-[#8B8B93]">
              You are welcome!
            </p>
            <p
              className={`${
                registerCorrectly ? "flex" : "hidden"
              } bg-green-500 rounded-xl items-center justify-center py-5 mt-10`}
            >
              <span className="text-center text-sm text-[#fff] font-medium px-5">
                You have successfully signed!
                <br />
                <br />
                Redirecting to dashboard
              </span>
            </p>
          </div>
          <div className="mt-2 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 bg-white dark:bg-transparent sm:p-2">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="col-span-1 sm:col-span-3">
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
                            setRegisterForm({
                              ...registerForm,
                              userName: e.target.value,
                            });
                          }}
                          error={errorUserName}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-span-1 sm:col-span-3">
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
                            setRegisterForm({
                              ...registerForm,
                              email: e.target.value,
                            });
                          }}
                          error={errorEmail}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-span-1 sm:col-span-3">
                      <label
                        htmlFor="passwordInput"
                        className="block text-sm text-[#07070C] dark:text-white"
                      >
                        Password
                      </label>
                      <div className="flex flex-row gap-5">
                        <InputDefault
                          placeholder="Password"
                          iconPath="/svg/eye.svg"
                          name="passwordInput"
                          type="password"
                          onChange={(e: any) => {
                            setRegisterForm({
                              ...registerForm,
                              password: e.target.value,
                            });
                          }}
                          error={errorPassword}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-span-1 sm:col-span-3">
                      <label
                        htmlFor="passwordConfirmationInput"
                        className="block text-sm text-[#07070C] dark:text-white"
                      >
                        Confirm Password
                      </label>
                      <div className="flex flex-row gap-5">
                        <InputDefault
                          placeholder="Confirm Password"
                          iconPath="/svg/eye.svg"
                          name="passwordConfirmationInput"
                          type="password"
                          onChange={(e: any) => {
                            setRegisterForm({
                              ...registerForm,
                              passwordConfirmation: e.target.value,
                            });
                          }}
                          error={errorConfirmPassword}
                          required
                        />
                      </div>
                    </div>

                    <div className="col-span-1 sm:col-span-3">
                      <label
                        htmlFor="authCodeInput"
                        className="block text-sm text-[#07070C] dark:text-white"
                      >
                        Auth Code
                      </label>
                      <div className="flex flex-row gap-5">
                        <InputDefault
                          placeholder="Authentication Code"
                          iconPath="/svg/warning-2.svg"
                          name="authCodeInput"
                          type="text"
                          onChange={(e: any) => {
                            setRegisterForm({
                              ...registerForm,
                              AuthCode: e.target.value,
                            });
                          }}
                          error={errorAuthCode}
                          required
                        />
                      </div>
                    </div>
                  </div>
                  <div className="pt-5">
                    <button
                      type="submit"
                      className="flex justify-center py-3 w-full border border-transparent font-[16px] font-medium rounded-md text-white bg-[#7364DB] hover:outline hover:outline-4 hover:outline-[#B2A7FF] focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-500 ease-in-out"
                      onClick={() => setIntentToSendForm(true)}
                    >
                      Sign Up
                    </button>
                  </div>
                  <div className="pt-10">
                    <p className="text-center text-[14px] text-[#07070C] dark:text-[#656575]">
                      Already have an account?{" "}
                      <Link href="/auth/login">
                        <a className="text-[#7364DB] hover:text-[#B2A7FF] dark:text-[#7364DB]">
                          Sign In
                        </a>
                      </Link>
                    </p>
                  </div>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Register;
