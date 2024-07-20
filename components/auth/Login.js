"use client";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../common/PrimaryButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/features/auth/authSlice";
import { useLoginMutation } from "@/app/redux/features/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { toast } from "sonner";
import CustomForm from "../form/CustomForm";
import InputElement from "../form/InputElement";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import ForgotPassword from "@/components/auth/ForgotPassword";
import { useGetUserQuery } from "@/app/redux/features/userManagement/userApi";

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();

  const [isOpen, setIsOpen] = useState(false);
  const [userId, setUserId] = useState(null);
  const [accessToken, setAccessToken] = useState(null);

  const { data: userData, isFetching: isUserFetching } = useGetUserQuery(
    userId,
    {
      skip: !userId,
    }
  );

  const loginResolver = z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "This is not a valid email." }),
    password: z.string({ required_error: "Password is required" }),
  });

  const handleLogin = async (data) => {
    const toasterId = toast.loading("Logging in", { position: "top-center" });

    try {
      const res = await login(data).unwrap();
      if (res?.error) {
        toast.error(res.error.data.message, { id: toasterId });
      } else {
        const user = verifyToken(res?.data?.accessToken);

        if (user) {
          setUserId(user?.userId);
          setAccessToken(res?.data?.accessToken);
        }

        toast.success("Login success", {
          position: "top-center",
          duration: 2000,
          id: toasterId,
        });
      }
    } catch (error) {
      toast.error(error?.data?.message, {
        id: toasterId,
        position: "top-center",
        duration: 2000,
      });
    }
  };

  useEffect(() => {
    if (userData && !isUserFetching && accessToken) {
      dispatch(setUser({ user: userData?.data, token: accessToken }));
      router.push(`/dashboard/${userData?.data?.role}`);
    }
  }, [userData, isUserFetching, accessToken]);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="min:w-full md:min-w-[600px] border border-blue-color p-[20px] rounded-lg bg-black-secondary items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl text-white mb-2">Welcome Back</h2>
          <h3 className="text-3xl text-white">Please Login here!</h3>
        </div>

        <CustomForm
          resolver={zodResolver(loginResolver)}
          onSubmit={handleLogin}
        >
          <InputElement
            label={"Email"}
            name={"email"}
            type={"text"}
            placeholder={"Type Your Email"}
          />
          <InputElement
            label={"Password"}
            name={"password"}
            placeholder={"Password"}
            type="password"
          />

          <div className="mb-4">
            <p
              className="dark:hover:text-indigo-500 text-white cursor-pointer"
              onClick={() => setIsOpen(true)}
            >
              Forgot your Password?
            </p>
          </div>

          <PrimaryButton
            title={"Login"}
            loading={isLoading}
            className={"w-full text-lg"}
            type="submit"
          />

          <p className="mb-4 text-white">
            Don't Have any account?{" "}
            <span>
              <Link
                className="dark:hover:text-indigo-500 text-white"
                href={"/auth/register"}
              >
                Register
              </Link>
            </span>
          </p>
        </CustomForm>
      </div>

      <ForgotPassword isOpen={isOpen} setIsOpen={setIsOpen} />
    </div>
  );
}

export default Login;
