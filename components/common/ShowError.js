import { notification } from "antd";
import React from "react";

function ShowError(error) {
  return notification.error({ message: error.response.data.message });
}

export default ShowError;
