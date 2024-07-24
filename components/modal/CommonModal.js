import cn from "@/utils/cn";
import { ConfigProvider, Modal } from "antd";
import React from "react";

function CommonModal({
  isOpen,
  onClose,
  children,
  bgColor,
  className,
  ...rest
}) {
  return (
    <ConfigProvider
      theme={{
        components: {
          Modal: {
            contentBg: bgColor ? bgColor : "#232b2b",
            headerBg: bgColor ? bgColor : "#232b2b",
            titleColor: "#ffffff",
            titleFontSize: "24px",
            titleLineHeight: "normal",
            colorBgMask: "#0e1111",
            colorIcon: "red",
            colorIconHover: "red",
          },
        },
      }}
    >
      <Modal
        centered
        className={cn("bg-black-primary rounded-md", className)}
        open={isOpen}
        onCancel={onClose}
        {...rest}
      >
        {children}
      </Modal>
    </ConfigProvider>
  );
}

export default CommonModal;
