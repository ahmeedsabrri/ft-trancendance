"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "../utils";
import { useRouter } from "next/navigation";

import Link from "next/link";
type FormData = {
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    password: string;
    confirmPassword: string;
};
export default function RegisterComponent() {
    const [formData, setFormData] = useState<FormData>({
        firstName: "",
        lastName: "",
        username: "",
        email: "",
        password: "",
        confirmPassword: "",
    });

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData((prevState: FormData) => ({
          ...prevState,
          [name]: value,
        }));
    };
    const {
        register,
        handleSubmit,
        formState: { errors },
        setError,
      } = useForm<FormData>();
    
      const router = useRouter();
    
      const { register: registerUser } = AuthActions(); // Note: Renamed to avoid naming conflict with useForm's register
    
      const onSubmit = () => {
        registerUser(formData.firstName, formData.lastName, formData.email, formData.username, formData.password)
          .then(() => {
            console.log("Registered successfully");
            router.push("/dashboard");
          })
          .catch((err) => {
            setError("root", { type: "manual", message: err.json.detail });
          });
      };
    
    return (
      <div className="w-10/12 h-4/6  rounded-3xl flex flex-row items-center justify-center border-t-1 shadow-xl border-t border-l border-border">
      <div className="bg-[#4f4f4f61] backdrop-blur-xl size-full border-t border-l border-border rounded-3xl py-4 flex flex-col justify-center items-center">
        <div className="w-full h-20 flex justify-center items-center">
          <h1 className="text-5xl font-bold font-serif text-white flex justify-center">SIGN IN</h1>
        </div> 
    <div className="flex flex-col justify-center items-center w-full h-[400px]"> 
            <div className="w-full h-full flex flex-col justify-start items-center">
              <form className="flex flex-col justify-center items-center m-4 " >
                <div className="flex flex-row w-full justify-around items-center">
                  <input
                    type="text"
                    name="firstName"
                    placeholder="First Name"
                    className="placeholder-white placeholder-opacity-50 bg-transparent backdrop-blur-lg p-2 rounded-full w-[110px] h-[55px] m-2 outline-slate-400 drop-shadow-2xl shadow-2xl"
                    value={formData.firstName}
                    onChange={handleChange}
                    />
                  <input
                    type="text"
                    name="lastName"
                    placeholder="Last Name"
                    className="placeholder-white placeholder-opacity-50 bg-transparent backdrop-blur-lg p-2 rounded-full w-[110px] h-[55px] m-2 outline-slate-400 drop-shadow-2xl shadow-2xl"
                    value={formData.lastName}
                    onChange={handleChange}
                    />
                </div>
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="placeholder-white placeholder-opacity-50 bg-transparent backdrop-blur-lg p-2 rounded-full w-[250px] h-[70px] m-2 outline-slate-400 drop-shadow-2xl shadow-2xl"
                  value={formData.username}
                    onChange={handleChange}
                  />
                <input
                  type="text"
                  name="email"
                  placeholder="Email"
                  className="placeholder-white placeholder-opacity-50 bg-transparent backdrop-blur-lg p-2 rounded-full w-[250px] h-[70px] m-2 outline-slate-400 drop-shadow-2xl shadow-2xl"
                  value={formData.email}
                    onChange={handleChange}
                  />
                <input
                  type="password"
                  name="password"
                  placeholder="Password"
                  className="placeholder-white placeholder-opacity-50 bg-transparent backdrop-blur-lg p-2 rounded-full w-[250px] h-[70px] m-2 outline-slate-400 drop-shadow-2xl shadow-2xl"
                  value={formData.password}
                    onChange={handleChange}
                  />
                <input
                  type="password"
                  name="confirmPassword"
                  placeholder="Confirm Password"
                  className="placeholder-white placeholder-opacity-50 bg-transparent backdrop-blur-lg p-2 rounded-full w-[250px] h-[70px] m-2 outline-slate-400 drop-shadow-2xl shadow-2xl"
                  value={formData.confirmPassword}
                    onChange={handleChange}
                  />
                <div className="w-full h-2/5 flex flex-col items-center justify-start ">
                  <button
                    className="transition ease-in-out delay-150 bg-black text-white font-bold bg-transparent backdrop-blur-lg  rounded-full p-2 my-2 w-[250px] h-[50px] hover:bg-zinc-900 drop-shadow-2xl shadow-2xl"
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    >
                    Sign up
                  </button>
                  <label htmlFor="" className="text-[12px] py-2">
                    already have an account?{" "}<Link href="/auth/login" className="hover:text-white opacity-45">Login</Link>
                  </label>
                  {errors.root && (
                    <span className="text-xs text-red">{errors.root.message}</span>
                )}
                </div>
              </form>
        </div>
    </div>
    </div>
    </div>
  );
}