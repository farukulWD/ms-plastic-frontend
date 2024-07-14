"use client";

import { ConfigProvider } from "antd";
import React from "react";

function AntConfigProvider({ children }) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorBgContainer: "#181823",
          colorText: "white",
        },
        components: {
          Table: {
            headerBg: "#4E4FEB",
            borderColor: "transprent",
            headerSplitColor: "transprent",
          },
          Layout: {
            headerBg: "#181823",
            siderBg: "#181823",
          },
          Menu: {
            darkItemBg: "#181823",
            darkItemSelectedBg: "#060608",
            darkSubMenuItemBg: "#181823",
          },
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}

export default AntConfigProvider;
