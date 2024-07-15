"use client";

import React, { useEffect } from "react";
import CustomForm from "../form/CustomForm";
import InputElement from "../form/InputElement";
import PrimaryButton from "../common/PrimaryButton";
import { z } from "zod";
import { zodResolver } from "@hookform/resolvers/zod";
import { useRouter, useSearchParams } from "next/navigation";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/features/auth/authSlice";
import { useResetPasswordMutation } from "@/app/redux/features/auth/authApi";
import { toast } from "sonner";

export default function ResetPasswordCom() {
  const dispatch = useDispatch();
  const router = useRouter();
  const searchParams = useSearchParams();
  const token = searchParams.get("token");

  useEffect(() => {
    dispatch(setUser({ user: "", token: token }));
  }, [token]);

  const [resetPassword, { isLoading }] = useResetPasswordMutation();
  const handleReset = async (data) => {
    delete data["confirmPassword"];
    const toasterId = toast.loading("Password reseting", { duration: 2000 });

    try {
      const res = await resetPassword(data).unwrap();
      if (res.error) {
        toast.error(res.error.data.message, { id: toasterId });
      } else {
        toast.success("Password Reset success", { id: toasterId });
        router.push("/auth/login");
      }
    } catch (error) {
      toast.error(error?.data?.message, { id: toasterId, duration: 2000 });
    }
  };
  const resetResolver = z
    .object({
      email: z
        .string({ required_error: "Email is required" })
        .email({ message: "This is not a valid email." }),
      password: z.string({ required_error: "Password is required" }),
      confirmPassword: z.string({
        required_error: "Confirm Password is required",
      }),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });
  return (
    <div className="min:w-full md:min-w-[600px] border border-blue-color p-[20px] rounded-lg bg-black-secondary items-center justify-center">
      <div className="text-center">
        <h2 className="text-xl text-white mb-2">Reset</h2>
        <h3 className="text-3xl text-white">Your Password Here!</h3>
      </div>
      <CustomForm onSubmit={handleReset} resolver={zodResolver(resetResolver)}>
        <InputElement name="email" label={"Email"} type="text" />
        <InputElement
          name={"password"}
          label={"New Password"}
          type="password"
        />
        <InputElement
          name={"confirmPassword"}
          label={"Confirm Password"}
          type="password"
        />

        <PrimaryButton
          title={"Reset Password"}
          type="submit"
          loading={isLoading}
          className={"w-full"}
        />
      </CustomForm>
    </div>
  );
}
