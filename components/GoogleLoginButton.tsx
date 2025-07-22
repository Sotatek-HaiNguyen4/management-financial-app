/* eslint-disable @typescript-eslint/no-explicit-any */
"use client";

import { App } from "antd";
import { useRouter } from "next/navigation";
import { useEffect, useRef } from "react";

const API_URL = process.env.NEXT_PUBLIC_SERVER_API;

export default function GoogleLoginButton() {
  const googleButtonRef = useRef(null);
  const { message } = App.useApp();
  const router = useRouter();

  useEffect(() => {
    if (window.google && googleButtonRef.current) {
      window.google.accounts.id.initialize({
        client_id: process.env.NEXT_PUBLIC_GOOGLE_CLIENT_ID!,
        callback: handleCredentialResponse,
      });

      window.google.accounts.id.renderButton(googleButtonRef.current, {
        theme: "outline",
        size: "large",
      });
    }
  }, []);

  const handleCredentialResponse = async (response: any) => {
    const { credential } = response;
    try {
      const res = await fetch(`${API_URL}/auth/google-login`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ credential }),
      });

      const data = await res.json();
      console.log("data: ", data);

      if (data.accessToken) {
        localStorage.setItem("access_token", data.accessToken);
        message.success("Login success.");
        router.push("/home");
      } else {
        message.error("Login error");
      }
    } catch (err) {
      message.error("Login error");
      console.error("Lỗi gửi lên backend:", err);
    }
  };

  return <div ref={googleButtonRef}></div>;
}
