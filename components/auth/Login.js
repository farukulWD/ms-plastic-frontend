"use client";
import React from "react";
import InputElement from "../common/InputElement";
import PrimaryButton from "../common/PrimaryButton";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/features/auth/authSlice";
import { useLoginMutation } from "@/app/redux/features/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";
import { toast } from "sonner";
import { useForm, useFormContext } from "react-hook-form";
import CustomFrom from "../form/CustomFrom";
import CustomInput from "../form/CustomInput";

function Login() {
  const dispatch = useDispatch();
  const router = useRouter();

  const [login, { isLoading }] = useLoginMutation();

  const handleLogin = async (data) => {
    console.log(data);
    // const toasterId = toast.loading("Logging in", { position: "top-center" });

    // try {
    //   const res = await login(data).unwrap();
    //   const user = verifyToken(res?.data?.accessToken);
    //   dispatch(setUser({ user: user, token: res?.data?.accessToken }));
    //   toast.success("Login success", {
    //     id: toasterId,
    //     position: "top-center",
    //     duration: 2000,
    //   });
    //   router.push("/dashboard");
    // } catch (error) {
    //   toast.error(error?.data?.message, {
    //     id: toasterId,
    //     position: "top-center",
    //     duration: 2000,
    //   });
    // }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="min:w-full md:min-w-[600px] p-[20px] rounded-lg bg-black-secondary items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-2">Welcome Back</h2>
          <h3 className="text-3xl">Please Login here!</h3>
        </div>
        <CustomFrom onSubmit={handleLogin}>
          <CustomInput label={"Email"} name={"email"} type={"text"} />
          <CustomInput label={"Password"} name={"password"} type="password" />

          <div className="mb-4">
            <Link
              className="dark:hover:text-indigo-500 text-white"
              href={"/auth/forgot-password"}
            >
              Forgot your Password?
            </Link>
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
        </CustomFrom>
      </div>
    </div>
  );
}

export default Login;
