"use client";
import { notification } from "antd";
import React, { useState } from "react";
import InputElement from "../common/InputElement";
import axios from "axios";
import PrimaryButton from "../common/PrimaryButton";
import ShowError from "../common/ShowError";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchRoute = searchParams.get("redirect");
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });
  const [errors, setErrors] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const validation = (data) => {
    const { email, password } = data;
    let valid = true;
    let tempErrors = { email: "", password: "" };

    if (!email) {
      tempErrors.email = "Email is required";
      valid = false;
    }
    if (!password) {
      tempErrors.password = "Password is required";
      valid = false;
    }

    setErrors(tempErrors);
    return valid;
  };

  const handleLogin = async () => {
    setErrors({});
    if (!validation(formData)) {
      return;
    }

    try {
      setIsLoading(true);
      const result = await axiosInstance.post("/auth/login", formData);
      setIsLoading(false);
      notification.success({ message: "Login success" });
      if (searchRoute) {
        router.push(searchRoute);
      } else {
        router.push("/dashboard");
      }
    } catch (error) {
      setIsLoading(false);
      ShowError(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="min:w-full md:min-w-[600px] p-[20px] rounded-lg bg-black-secondary items-center justify-center">
        <div className="text-center ">
          <h2 className="text-xl">Welcome Back</h2>
          <h3 className="text-3xl ">Please Login here!</h3>
        </div>
        <div>
          <InputElement
            label={"Email"}
            name={"email"}
            value={formData.email}
            onChange={handleChange}
            placeholder={"Enter Email"}
            errorMessage={errors.email}
          />
          <InputElement
            label={"Password"}
            name={"password"}
            value={formData.password}
            onChange={handleChange}
            placeholder={"Enter Password"}
            type="password"
            errorMessage={errors.password}
          />
        </div>

        <PrimaryButton
          onClick={handleLogin}
          title={"Login"}
          loading={isLoading}
          className={""}
        />
      </div>
    </div>
  );
}

export default Login;
