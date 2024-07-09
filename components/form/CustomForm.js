import { Form } from "antd";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function CustomForm({ onSubmit, children, resolver }) {
  const fromConfig = {};
  if (resolver) {
    fromConfig["resolver"] = resolver;
  }
  const methods = useForm(fromConfig);

  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
}
