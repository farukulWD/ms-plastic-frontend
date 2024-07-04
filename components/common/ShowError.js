import { notification } from "antd";
import React from "react";

function ShowError(error) {
  return notification.error({
    message: error?.data?.message || "Something went wrong",
  });
}

export default ShowError;
