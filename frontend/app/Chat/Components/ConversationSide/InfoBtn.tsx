import { SetStateAction, useState } from "react";
import infoImg from "../../../../public/conversationSide/Meatballs_menu.svg";
import Image from "next/image";

const InfoBtn = ({showInfo, setShowInfo}: {showInfo: boolean, setShowInfo: React.Dispatch<SetStateAction<boolean>>}) => {
    return (
        <div className="size-[40px] min-w[300px] flex items-center justify-center bg-blur-dark backdrop-blur-3xl rounded-full border-t border-l shadow-xl border-border hover:bg-hover_color active:bg-active_color translition-all absolute top-0 right-0 z-10" onClick={() => {showInfo ? setShowInfo(false) : setShowInfo(true)}}>
            <Image src={infoImg} alt="info" width={30}/>
        </div>
    )
}

export default InfoBtn;