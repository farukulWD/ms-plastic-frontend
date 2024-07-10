"use client";
import Link from "next/link";
import React from "react";
import PrimaryButton from "../common/PrimaryButton";
import { useRouter } from "next/navigation";
import InputElement from "../form/InputElement";
import CustomForm from "../form/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import FileInput from "../form/FileInput";
import { useRegisterMutation } from "@/app/redux/features/auth/authApi";
import { toast } from "sonner";

function Register() {
  const router = useRouter();
  const [register, { isLoading }] = useRegisterMutation();
  const handleRegister = async (data) => {
    const formData = new FormData();
    formData.append("data", JSON.stringify(data));
    formData.append("file", data.profilePicture);
    const toasterId = toast.loading("creating", { position: "top-center" });
    try {
      await register(formData).unwrap();
      toast.success("User register success", {
        id: toasterId,
        position: "top-center",
        duration: 2000,
      });
      router.push("/auth/login");
    } catch (error) {
      toast.error(error?.data?.message, {
        id: toasterId,
        position: "top-center",
        duration: 2000,
      });
    }
  };

  const registerFormResolver = z
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
      profilePicture: z.instanceof(File).optional(),
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
          resolver={zodResolver(registerFormResolver)}
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
          <FileInput
            className={"w-full"}
            label={"Profile picture"}
            name={"profilePicture"}
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
