import { Form } from "antd";
import React from "react";
import { FormProvider, useForm } from "react-hook-form";

export default function CustomForm({
  onSubmit,
  children,
  resolver,
  defaultValues,
  className,
}) {
  const formConfig = {};
  if (resolver) {
    formConfig["resolver"] = resolver;
  }
  console.log(defaultValues);

  if (defaultValues) {
    formConfig["defaultValues"] = defaultValues;
  }

  const methods = useForm(formConfig);

  return (
    <FormProvider {...methods}>
      <Form
        className={className}
        layout="vertical"
        onFinish={methods.handleSubmit(onSubmit)}
      >
        {children}
      </Form>
    </FormProvider>
  );
}
