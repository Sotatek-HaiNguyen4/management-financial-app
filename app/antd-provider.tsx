"use client";
import "@ant-design/v5-patch-for-react-19";
import { ConfigProvider } from "antd";
import React from "react";

export default function AntdProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <ConfigProvider
      theme={{
        token: {
          colorPrimary: "#1677ff",
        },
      }}
    >
      {children}
    </ConfigProvider>
  );
}
