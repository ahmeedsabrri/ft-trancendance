import Image from "next/image";
import AvatarPic from "../../../../public/Ellipse 209.svg"
import { useState } from "react";
import { useChatStore } from "@/app/stores/chatStore";
import Avatar from "@/components/navbar/profilebar/Avatar";
const UserComp = () => {

    const conversationSelected = useChatStore((state) => state.conversationSelected);
    
    const [isOpened, setIsOpened] = useState(false);
    

    return (
        <div className="bg-blur-dark backdrop-blur-3xl w-fit h-14 flex items-center justify-center p-1 rounded-full border-t border-l shadow-xl border-border  hover:bg-hover_color active:bg-active_color translition-all">
            <div className="size-fit flex items-center justify-center">
                <div className="size-fit" onClick={() => {setIsOpened(!isOpened)}} >
                <Avatar width={50} height={50} avatar={conversationSelected?.user.avatar}/>
                    {/* <Image src={AvatarPic} alt="" width={50} height={50} className="rounded-full shadow-2xl"/> */}
                </div>
                {isOpened ? 
                    <div className="w-fit h-full p-1 transition-all">
                        <div className="size-fit h-full m-1 p-2">
                            <h1 className="font-bold">{conversationSelected?.user?.username}</h1>
                            <p>{conversationSelected?.user?.status ? "Online": "Offline"}</p>
                        </div>
                    </div>
                    : <div className="transition-all"></div>
                }
            </div>
        </div>
    );
}

export default UserComp;