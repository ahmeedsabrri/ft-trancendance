'use client'

import { IMAGES } from "@/public/index";
import SideBarItem from "./SideBarItems";
import Link from 'next/link'
import { link } from "fs";

const Pattern = [
    {src: IMAGES.HomePage, alt: "home page", title: "Home" , link: "/dashboard"},
    {src: IMAGES.Game, alt: "Game page", title: "Game", link: "/PongGame"},
    {src: IMAGES.Ranking, alt: "Raking page", title: "Ranking", link: "/ranking"},
    {src: IMAGES.Chat, alt: "Chat page", title: "Chat", link: "/chat"},
    {src: IMAGES.Stats, alt: "Stats page", title: "Stats", link: "/stats"},
    {src: IMAGES.Settings, alt: "Settings page", title: "Settings", link: "/setting"},
];
const SideBar = () => {
    return (
        <div className="bg-gray-500 bg-opacity-30 backdrop-blur-xl w-[80px] h-[33%] flex flex-col justify-center items-center gap-y-4 rounded-full border border-white/10 mx-9 p-4">
            
            { Pattern.map((item, index) => {
                return <SideBarItem key={index} src={item.src} alt={item.alt} title={item.title} link={item.link}/>
            })}
        </div>
    )
}

export default SideBar;