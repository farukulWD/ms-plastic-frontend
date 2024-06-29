import { DotLottiePlayer } from "@dotlottie/react-player";
import { Button, Input, notification } from "antd";

import React, { useState } from "react";
import InputElement from "../common/InputElement";
import axios from "axios";
import PrimaryButton from "../common/PrimaryButton";

function Login() {
  const [isLoading, setIsLoading] = useState(false);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setFormData((pre) => {
      return {
        ...pre,
        [e.target.name]: e.target.value,
      };
    });
  };

  const handleLogin = async () => {
    try {
      setIsLoading(true);
      const result = await axios.post(
        "http://localhost:5000/api/v1/auth/login",
        formData
      );
      setIsLoading(false);
      notification.success({ message: "Login success" });
    } catch (error) {
      setIsLoading(false);
      notification.error({ message: error.message });
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
            errorMessage={"Email is required"}
          />
          <InputElement
            label={"Password"}
            name={"password"}
            value={formData.password}
            onChange={handleChange}
            placeholder={"Enter Password"}
            type="password"
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
