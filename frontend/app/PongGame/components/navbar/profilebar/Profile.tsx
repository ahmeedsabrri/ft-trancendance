'use client'

import ProfileInfo from "./ProfileInfo";

const Profile = () => {
    return (
        <div className="h-full w-full flex items-center justify-end gap-x-[8px]">

            <div className="p-[14px] relative bg-gray-500 bg-opacity-30 backdrop-blur-xl rounded-full border border-white/10">
                <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-8 text-white">
                    <path strokeLinecap="round" strokeLinejoin="round" d="M14.857 17.082a23.848 23.848 0 0 0 5.454-1.31A8.967 8.967 0 0 1 18 9.75V9A6 6 0 0 0 6 9v.75a8.967 8.967 0 0 1-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 0 1-5.714 0m5.714 0a3 3 0 1 1-5.714 0" />
                </svg>
                <span className="p-[6px] absolute rounded-2xl bg-red-500 top-[1px] right-[3px]"></span>
            </div>

            <div className="px-[25px] py-[8px] flex items-center justify-between gap-x-[20px] bg-gray-500 bg-opacity-30 backdrop-blur-2xl rounded-full border border-white/10">
                <div className="p-[2px] rounded-2xl border border">
                    <svg fill="none" viewBox="0 0 24 24" strokeWidth="1.5" stroke="currentColor" className="size-4 text-white">
                        <path strokeLinecap="round" strokeLinejoin="round" d="m19.5 8.25-7.5 7.5-7.5-7.5" />
                    </svg>
                </div>
                <ProfileInfo />
            </div>
        </div>
    )
}

export default Profile;