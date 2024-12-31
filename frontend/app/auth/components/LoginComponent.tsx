"use client";

import React from "react";
import { useState } from "react";
import { useForm } from "react-hook-form";
import { AuthActions } from "../utils";
import { useRouter } from "next/navigation";
import Link from "next/link";
import OauthButton from './OauthButtonComponent';



type FormData = {
    username: string;
    password: string;
};
export default function LoginComponent() {
    const [formData, setFormData] = useState<FormData>({
        username: "",
        password: "",
    });
    
    
    // const [showForm,setState] = useState<boolean>(true)
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
    
      const { login } = AuthActions();
    
      const onSubmit = () => {
        login(formData.username, formData.password)
          .then(() => {
            console.log("Logged in successfully");
            router.push("/dashboard");
          })
          .catch((err) => {
            console.log(err);
            setError("root", { type   : "manual"}); 
          });
      };
  return (
    <div className="w-10/12 h-4/6  rounded-3xl flex flex-row items-center justify-center border-t-1 shadow-xl border-t border-l border-border">
    <div className="bg-[#4f4f4f61] backdrop-blur-xl size-full border-t border-l border-border rounded-3xl py-4 flex flex-col justify-center items-center">
        <div className="w-full h-20 flex justify-center items-center">
          <h1 className="text-5xl font-bold font-serif text-white flex justify-center">SIGN IN</h1>
        </div> 
        <OauthButton/>
        <div className="flex flex-col justify-center items-center w-[500px] min-h-[300px] opacity-100 ">
            <div className="w-full h-3/4 flex flex-col justify-center items-center">
              <form className="flex flex-col justify-end items-center m-2 ">
                <input
                  type="text"
                  name="username"
                  placeholder="Username"
                  className="placeholder-white placeholder-opacity-50 bg-transparent backdrop-blur-lg p-2 rounded-full w-[250px] h-[50px] m-2 outline-slate-400 drop-shadow-2xl shadow-2xl"
                  value={formData.username}
                  onChange={handleChange}
                  />
                <input
                  type="password"
                  placeholder="Password"
                  className="placeholder-white placeholder-opacity-50 bg-transparent backdrop-blur-lg p-2 rounded-full w-[250px] h-[50px] m-2 outline-slate-400 drop-shadow-2xl shadow-2xl"
                  {...register("password", { required: true })}
                  value={formData.password}
                  onChange={handleChange}
                  />
                {errors.password && (
                    <span className="text-xs text-red-600">Password is required</span>
                )}
                <div className="w-full h-2/5 flex flex-col items-center justify-end">
                  <button
                    className="transition ease-in-out delay-150 bg-black text-white font-bold bg-transparent backdrop-blur-lg  hover:bg-zinc-900 rounded-full p-2 my-2 w-[250px] h-[50px]  drop-shadow-2xl"
                    type="submit"
                    onClick={handleSubmit(onSubmit)}
                    >
                    Sign in
                  </button>
                  <label htmlFor="" className="text-[12px] ">
                    don’t have an account?{" "}<Link href="/auth/register" className="hover:text-white opacity-45">Register</Link>
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
