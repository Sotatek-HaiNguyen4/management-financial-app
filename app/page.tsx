"use client";

import GoogleLoginButton from "@/components/GoogleLoginButton";
import { Loading3QuartersOutlined } from "@ant-design/icons";
import { useRouter } from "next/navigation";
import { useEffect, useState } from "react";

export default function Homepage() {
  const router = useRouter();
  const [checkAccessToken, setCheckAccessToken] = useState<boolean | null>(
    null
  );

  useEffect(() => {
    const token = localStorage.getItem("access_token");
    if (token) {
      router.replace("/home");
    } else {
      setCheckAccessToken(false);
    }
  }, []);

  if (checkAccessToken === null) return null;

  return (
    <div className="flex justify-center items-center h-[100vh]">
      <div className="border p-16 rounded-2xl border-blue-300 w-[400px]">
        <h1 className="text-center text-2xl pb-10 text-blue-500">Đăng nhập</h1>
        <GoogleLoginButton />
      </div>
    </div>
  );
}
