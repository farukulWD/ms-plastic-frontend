"use client";
import React from "react";
import CommonModal from "../modal/CommonModal";
import CustomForm from "../form/CustomForm";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import InputElement from "../form/InputElement";
import PrimaryButton from "../common/PrimaryButton";
import { useForgotPasswordMutation } from "@/app/redux/features/auth/authApi";
import { toast } from "sonner";

function ForgotPassword({ isOpen, setIsOpen }) {
  const [forgotPassword, { isLoading }] = useForgotPasswordMutation();
  const forgotResolver = z.object({
    email: z
      .string({ required_error: "Email is required" })
      .email({ message: "This is not a valid email." }),
  });

  const handleForgot = async (data) => {
    const toasterId = toast.loading("Forgot Password", {
      position: "top-center",
    });
    try {
      const res = await forgotPassword(data).unwrap();
      toast.success("Forgot Please check Your Email", {
        id: toasterId,
        position: "top-center",
      });
      setIsOpen(false);
    } catch (error) {
      toast.error(error?.data?.message, {
        id: toasterId,
        position: "top-center",
        duration: 2000,
      });
    }
  };
  return (
    <CommonModal
      isOpen={isOpen}
      onClose={() => setIsOpen(false)}
      footer={false}
      title={"Reset Your Password"}
      mask
    >
      <CustomForm
        onSubmit={handleForgot}
        resolver={zodResolver(forgotResolver)}
        className="pt-5"
      >
        <InputElement name={"email"} label={"Email"} />

        <PrimaryButton
          className={"w-full"}
          type={"submit"}
          title={"Forgot Your Password"}
          loading={isLoading}
        />
      </CustomForm>
    </CommonModal>
  );
}

export default ForgotPassword;
