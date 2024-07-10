"use client";
import React, { useState } from "react";
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

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();
  const [login, { isLoading }] = useLoginMutation();
  const [isOpen, setIsOpen] = useState(false);

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
      const user = verifyToken(res?.data?.accessToken);
      dispatch(setUser({ user: user, token: res?.data?.accessToken }));
      toast.success("Login success", {
        id: toasterId,
        position: "top-center",
        duration: 2000,
      });
      router.push("/dashboard");
    } catch (error) {
      toast.error(error?.data?.message, {
        id: toasterId,
        position: "top-center",
        duration: 2000,
      });
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="min:w-full md:min-w-[600px] p-[20px] rounded-lg bg-black-secondary items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-2">Welcome Back</h2>
          <h3 className="text-3xl">Please Login here!</h3>
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
            type="password"
            placeholder={"Type your password"}
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
