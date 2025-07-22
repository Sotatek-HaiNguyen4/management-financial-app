"use client";

import { getProfile } from "@/services/userService";
import { useState, useRef, useEffect } from "react";
import { App } from "antd";
import Image from "next/image";

export default function Header() {
  const [open, setOpen] = useState(false);
  const menuRef = useRef<HTMLDivElement>(null);
  const { message } = App.useApp();
  const [infoUser, setInfoUser] = useState<{
    name: string;
    avatar: string | null;
  }>();

  useEffect(() => {
    getApiProfile();

    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  function handleClickOutside(event: MouseEvent) {
    if (menuRef.current && !menuRef.current.contains(event.target as Node)) {
      setOpen(false);
    }
  }

  const getApiProfile = async () => {
    try {
      const data = await getProfile();
      setInfoUser({
        name: data.name || "",
        avatar: data.avatar || "",
      });
    } catch (error) {
      console.log("error: ", error);
    }
  };

  const handleLogout = () => {
    localStorage.removeItem("access_token");
    window.location.href = "/";
  };

  return (
    <header className="w-full h-16 px-4 flex items-center justify-between bg-blue-500 text-white shadow">
      <h1 className="text-lg font-semibold">Quản lý chi tiêu</h1>

      <div className="relative" ref={menuRef}>
        <div
          className="flex items-center gap-2 cursor-pointer"
          onClick={() => setOpen((prev) => !prev)}
        >
          {infoUser?.avatar && (
            <Image
              src={infoUser?.avatar}
              alt="avatar"
              className="w-8 h-8 rounded-full border"
              width={32}
              height={32}
            />
          )}

          <span className="font-medium">{infoUser?.name}</span>
        </div>

        {open && (
          <div className="absolute right-0 mt-2 bg-white text-black shadow-md rounded w-28 z-50">
            <button
              onClick={handleLogout}
              className="w-full text-left px-4 py-2 hover:bg-gray-100"
            >
              Đăng xuất
            </button>
          </div>
        )}
      </div>
    </header>
  );
}
