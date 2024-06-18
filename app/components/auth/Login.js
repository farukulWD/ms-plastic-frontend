import { DotLottiePlayer } from "@dotlottie/react-player";
import { Input } from "antd";

import React, { useState } from "react";
import InputElement from "../common/InputElement";

function Login() {
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

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="grid md:grid-cols-2 max-w-[1300px] items-center justify-center">
        <div>
          <DotLottiePlayer
            src="/login_animation.lottie"
            autoplay
            loop
          ></DotLottiePlayer>
        </div>
        <div>
          <InputElement
            label={"Email"}
            name={"email"}
            value={formData.email}
            onChange={handleChange}
            placeholder={"Enter Email"}
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
      </div>
    </div>
  );
}

export default Login;
