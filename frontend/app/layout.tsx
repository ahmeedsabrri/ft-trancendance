"use client";
import React from "react";

import "./globals.css";
import { UserProvider } from "./context/userContext";
import { usePathname } from "next/navigation";

import SideBar from "@/components/sidebar/Sidebar";
import NavBar from "@/components/navbar/NavBar";

// app/layout.tsx

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  const pathname = usePathname();

  if (pathname === "/auth/login" || pathname === "/auth/callback" || pathname === "/auth/register" || pathname === "/auth") {
    return (
      <html lang="en">
        <body className="w-screen h-screen overflow-hidden flex justify-center items-center bg-dashboard bg-center bg-no-repeat bg-cover">
          {children}
        </body>
      </html>
    );
  }
  return (
    <html lang="en">
      <body className="w-screen h-screen overflow-hidden flex justify-center items-center bg-background bg-center bg-no-repeat bg-cover" >
        <UserProvider>
          <SideBar />
          <div className="p-[10px] w-[90%] h-[90%] flex flex-col justify-start items-center mx-8 gap-10">
            <NavBar/>
            { children }
        </div>
        </UserProvider>
      </body>
    </html>
  );
}