import type { NextPage } from "next";
import Head from "next/head";
import TopBar from "../../components/Navigation/TopBar";
import { InputDefault } from "../../components/Inputs";
import Link from "next/link";
import { useContext, useEffect, useState } from "react";
import { loginUser, registerUser } from "../../helpers/serverRequests/authUser";
import { saveItem } from "../../helpers/localStorage";
import { UserContext } from "../../contexts/userContext/UserContext";
import { useRouter } from "next/router";

const Login: NextPage = () => {
  const router = useRouter();

  const [errorEmail, setErrorEmail] = useState("");
  const [errorPassword, setErrorPassword] = useState("");

  const [loginCorrectly, setloginCorrectly] = useState(false);

  const [intentToSendForm, setIntentToSendForm] = useState(false);

  const { setIsLoggedIn, setUserData } = useContext(UserContext);

  type loginFormType = {
    email: string;
    password: string;
  };

  const [loginForm, setloginForm] = useState<loginFormType>({
    email: "",
    password: "",
  });

  const handleSubmit = async (e: any) => {
    e.preventDefault();
    try {
      const data: loginFormType = loginForm;
      const response = await loginUser(data);
      if (response.status === 200) {
        saveItem("token", response.data.token);
        setIsLoggedIn(true);
        setUserData(response.data.user);
        setloginCorrectly(true);
        setTimeout(() => {
          router.push("/");
        }, 2000);
      }
      if (response.status === 400) {
        if (response.data.message === "User not found") {
          setErrorEmail("User not found");
        }
        if (response.data.message === "Incorrect password") {
          setErrorPassword("Incorrect password");
        }
      }
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    if (!intentToSendForm) return;

    if (loginForm.email.length === 0) {
      setErrorEmail("Email is required");
    } else {
      setErrorEmail("");
    }

    if(loginForm.email.split('').includes('@') === false) {
      setErrorEmail("Email is not valid");
    } else {
      setErrorEmail("");
    }

    if (loginForm.password.length === 0) {
      setErrorPassword("Password is required");
    } else {
      setErrorPassword("");
    }

    if (loginForm.password.length > 0 && loginForm.password.length < 8) {
      setErrorPassword("Password must be at least 8 characters");
    } else {
      setErrorPassword("");
    }

  }, [loginForm, intentToSendForm]);

  return (
    <div className="bg-[#E8EDF2] h-full min-h-screen">
      <Head>
        <title>Login - Project Demo</title>
        <meta name="description" content="Login project" />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <TopBar onlyLogo />
      <div className="h-full py-10 flex items-center justify-center">
        <div className="max-w-md w-full space-y-2 border border-[#E8EDF2] rounded-2xl bg-[#ffffff] py-12 px-4 sm:px-6 lg:px-8">
          <div>
            <img
              className="mx-auto h-12 w-auto"
              src="/svg/LandingSuccess1.svg"
              alt="Icon"
            />
            <h2 className="text-center text-[24px] font-bold text-[#07070C]">
              Welcome Back!
            </h2>
            <p className="mt-2 text-center text-sm text-[#7E7E8F]">
              Let’s build something great
            </p>
            <p
              className={`${
                loginCorrectly ? "flex" : "hidden"
              } bg-green-500 rounded-xl items-center justify-center py-5 mt-10`}
            >
              <span className="text-center text-sm text-[#fff] font-medium px-5">
                You have successfully logged in!
                <br />
                <br />
                Redirecting to dashboard
              </span>
            </p>
          </div>
          <div className="mt-2 md:mt-0 md:col-span-2">
            <form onSubmit={handleSubmit}>
              <div className="overflow-hidden sm:rounded-md">
                <div className="px-4 bg-white sm:p-2">
                  <div className="grid grid-cols-1 gap-6">
                    <div className="col-span-1 sm:col-span-3">
                      <label
                        htmlFor="emailInput"
                        className="block text-sm text-[#07070C]"
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
                            setloginForm({
                              ...loginForm,
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
                        className="block text-sm text-[#07070C]"
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
                            setloginForm({
                              ...loginForm,
                              password: e.target.value,
                            });
                          }}
                          error={errorPassword}
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
                      Sign In
                    </button>
                  </div>
                  <div className="pt-5 w-full">
                    <a className="text-sm text-[#B2A7FF] block text-right" href="#">
                      Forgot password?
                    </a>
                  </div>
                  <div className="pt-10">
                    <p className="text-center text-[14px] text-[#07070C]">
                    Don’t have an account?{" "}
                      <Link href="/auth/register">
                        <a className="text-[#7364DB] hover:text-[#B2A7FF]">
                         Sign up
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

export default Login;
