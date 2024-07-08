import { Form } from "antd";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function CustomFrom({ onSubmit, children }) {
  const methods = useForm();
  return (
    <FormProvider {...methods}>
      <Form layout="vertical" onFinish={methods.handleSubmit(onSubmit)}>
        {children}
      </Form>
    </FormProvider>
  );
}
