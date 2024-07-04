"use client";
import { notification } from "antd";
import React, { useState } from "react";
import InputElement from "../common/InputElement";
import PrimaryButton from "../common/PrimaryButton";
import ShowError from "../common/ShowError";
import { useRouter } from "next/navigation";
import { useSearchParams } from "next/navigation";
import axiosInstance from "@/utils/axiosInstance";
import formValidation from "@/utils/formValidation";
import Link from "next/link";
import { useDispatch } from "react-redux";
import { setUser } from "@/app/redux/features/auth/authSlice";
import { useLoginMutation } from "@/app/redux/features/auth/authApi";
import { verifyToken } from "@/utils/verifyToken";

function Login() {
  const dispatch = useDispatch();
  // const [isLoading, setIsLoading] = useState(false);
  const searchParams = useSearchParams();
  const router = useRouter();
  const searchRoute = searchParams.get("redirect");
  const [errors, setErrors] = useState({});

  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const [login, { error, isLoading }] = useLoginMutation();

  const handleLogin = async () => {
    setErrors({});
    const rules = {
      email: { required: true },
      password: { required: true },
    };
    const { isValid, errors } = formValidation(formData, rules);
    if (!isValid) {
      setErrors(errors);
      return;
    }

    const res = await login(formData).unwrap();
    const user = verifyToken(res?.data?.accessToken);
    dispatch(setUser({ user: user, token: res?.data?.accessToken }));
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="min:w-full md:min-w-[600px] p-[20px] rounded-lg bg-black-secondary items-center justify-center">
        <div className="text-center ">
          <h2 className="text-xl mb-2">Welcome Back</h2>
          <h3 className="text-3xl ">Please Login here!</h3>
        </div>
        <div>
          <InputElement
            label={"Email"}
            name={"email"}
            value={formData.email}
            onChange={handleChange}
            placeholder={"Enter Email"}
            errorMessage={errors?.email}
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
          <div className="mb-4">
            <Link
              className="dark:hover:text-indigo-500 text-white"
              href={"/auth/forgot-password"}
            >
              Forgot your Password ?
            </Link>
          </div>

          <PrimaryButton
            onClick={handleLogin}
            title={"Login"}
            loading={isLoading}
            className={"w-full text-lg"}
          />

          <p className="mb-4">
            Don't Have any account ?{" "}
            <span>
              <Link
                className="dark:hover:text-indigo-500 text-white"
                href={"/auth/register"}
              >
                Register
              </Link>
            </span>
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
