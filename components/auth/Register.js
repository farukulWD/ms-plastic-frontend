"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../common/PrimaryButton";
import axiosInstance from "@/utils/axiosInstance";
import formValidation from "@/utils/formValidation";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import ShowError from "../common/ShowError";
import InputElement from "../form/InputElement";
import CustomForm from "../form/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleRegister = async (data) => {
    console.log(data);
  };

  const registerFromResolver = z
    .object({
      name: z.string({ required_error: "Name is required" }),
      email: z
        .string({ required_error: "Email is required" })
        .email({ message: "This is not a valid email." }),
      password: z.string({ required_error: "Password is required" }),
      confirmPassword: z.string({
        required_error: "Confirm Password is required",
      }),
      mobile: z.string({ required_error: "Mobile is required" }),
      profilePicture: z.string().optional(),
    })
    .refine((data) => data.password === data.confirmPassword, {
      message: "Passwords don't match",
      path: ["confirmPassword"],
    });

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="min:w-full md:min-w-[600px] p-[20px] rounded-lg bg-black-secondary items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-2">Welcome Back</h2>
          <h3 className="text-3xl">Please Register here!</h3>
        </div>

        <CustomForm
          onSubmit={handleRegister}
          resolver={zodResolver(registerFromResolver)}
        >
          <InputElement label={"Name"} name={"name"} type="text" />
          <InputElement label={"Email"} name={"email"} type="text" />
          <InputElement label={"Password"} name={"password"} type="password" />
          <InputElement
            label={"Confirm Password"}
            name={"confirmPassword"}
            type="password"
          />
          <InputElement label={"Mobile Number"} name={"mobile"} type="number" />
          <InputElement
            label={"Profile picture"}
            name={"profilePicture"}
            type="text"
          />

          <PrimaryButton
            title={"Register"}
            loading={isLoading}
            className={"w-full text-lg"}
          />

          <p className="mb-4 text-white">
            You have already an account ?{" "}
            <span>
              <Link
                className="dark:hover:text-indigo-500 text-white"
                href={"/auth/login"}
              >
                Login
              </Link>
            </span>
          </p>
        </CustomForm>
      </div>
    </div>
  );
}

export default Register;
