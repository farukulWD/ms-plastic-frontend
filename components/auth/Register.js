"use client";

import Link from "next/link";
import React, { useState, useEffect } from "react";
import PrimaryButton from "../common/PrimaryButton";
import InputElement from "../common/InputElement";
import axiosInstance from "@/utils/axiosInstance";
import formValidation from "@/utils/formValidation";
import { useRouter } from "next/navigation";
import { notification } from "antd";
import ShowError from "../common/ShowError";

function Register() {
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    password: "",
    mobile: null,
    profilePicture: "",
    confirmPassword: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((pre) => ({
      ...pre,
      [name]: value,
    }));
  };

  useEffect(() => {
    if (formData.password !== formData.confirmPassword) {
      setErrors((pre) => ({
        ...pre,
        confirmPassword: "Passwords do not match",
      }));
    } else {
      setErrors((pre) => {
        const { confirmPassword, ...rest } = pre;
        return rest;
      });
    }
  }, [formData.password, formData.confirmPassword]);

  const handleRegister = async () => {
    setErrors({});
    const rules = {
      name: { required: true },
      email: { required: true },
      password: { required: true },
      mobile: { required: true },
      profilePicture: { required: true },
    };

    const { isValid, errors: validationErrors } = formValidation(
      formData,
      rules
    );
    if (!isValid) {
      setErrors(validationErrors);
      return;
    }

    try {
      setIsLoading(true);
      const result = await axiosInstance.post("/user/create-user", formData);
      notification.success({ message: "Register has been success" });
      router.push("/auth/login");
      setIsLoading(false);
    } catch (error) {
      setIsLoading(false);
      ShowError(error);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="min:w-full md:min-w-[600px] p-[20px] rounded-lg bg-black-secondary items-center justify-center">
        <div className="text-center">
          <h2 className="text-xl mb-2">Welcome Back</h2>
          <h3 className="text-3xl">Please Register here!</h3>
        </div>

        <div>
          <InputElement
            label={"Name"}
            name={"name"}
            value={formData.name}
            onChange={handleChange}
            placeholder={"Enter your name"}
            errorMessage={errors?.name}
            type="text"
          />
          <InputElement
            label={"Email"}
            name={"email"}
            value={formData.email}
            onChange={handleChange}
            placeholder={"Enter Email"}
            errorMessage={errors?.email}
            type="text"
          />
          <InputElement
            label={"Password"}
            name={"password"}
            value={formData.password}
            onChange={handleChange}
            placeholder={"Enter Password"}
            type="password"
            errorMessage={errors?.password}
          />
          <InputElement
            label={"Confirm Password"}
            name={"confirmPassword"}
            value={formData.confirmPassword}
            onChange={handleChange}
            placeholder={"Enter confirm password"}
            type="password"
            errorMessage={errors?.confirmPassword}
          />
          <InputElement
            label={"Mobile Number"}
            name={"mobile"}
            value={formData.mobile}
            onChange={handleChange}
            placeholder={"Enter Your Phone Number"}
            type="number"
            errorMessage={errors?.mobile}
          />
          <InputElement
            label={"Profile picture"}
            name={"profilePicture"}
            value={formData.profilePicture}
            onChange={handleChange}
            placeholder={"Profile picture"}
            type="text"
            errorMessage={errors?.profilePicture}
          />

          <PrimaryButton
            onClick={handleRegister}
            title={"Register"}
            loading={isLoading}
            className={"w-full text-lg"}
          />

          <p className="mb-4">
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
        </div>
      </div>
    </div>
  );
}

export default Register;
