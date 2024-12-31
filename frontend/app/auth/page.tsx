"use client";

import React, {  useState} from 'react';
export default function  Auth () {


  const [showForm,setState] = useState<boolean>(true)


  return (
   <div className='flex flex-col items-center justify-center h-screen w-screen'>
    <div className="w-10/12 h-4/6  rounded-[4rem] flex flex-row items-center justify-center border-t-1 shadow-xl border-t border-l border-border backdrop-blur-xl">
      <div className="w-[50%] h-[100%] flex flex-col items-center justify-center">
        <h1 className="font-bold text-white mb-4">Welcome to the Auth Page</h1>
        <p className="text-white">Please login or register to continue</p>
      </div>
      <div className="w-[50%] h-[100%] flex flex-col items-center justify-center">
        <button
          onClick={() => setState(!showForm)}
          className="text-white underline mt-4"
        >
          Dont have an account? Register here
        </button>
      </div>
    </div>
   </div>
  );
}
