import profile from "@/public/Ellipse 209.svg";
import Image from "next/image";
import Link from "next/link";
import ProfileLink from "@/public/conversationSide/User_alt.svg";
import pingPong from "@/public/conversationSide/Pipette _fill.svg";
import Gamepad from "@/public/conversationSide/Gamepad.svg";
import block from "@/public/conversationSide/close_ring.svg";
import { useChatStore } from "@/app/stores/chatStore";

const Info = ( {showInfo}: {showInfo:boolean} ) => {

    const conversationSelected = useChatStore((state) => state.conversationSelected);

    return (
        <>
            {showInfo && 
                <div className="size-fit bg-blur-dark backdrop-blur-[100px] rounded-2xl border-t border-l shadow-xl border-border  flex flex-col justify-center transition-all duration-500 ease-in-out absolute -top-2 -right-2 p-4">
                        <div className="w-full h-full flex justify-start items-center flex flex-col gap-4 p-2">
                            <div className="w-full h-[30%] flex items-center justify-center">
                                <Image src={profile} alt="info" width={120} />
                            </div>
                            <div className="flex flex-col items-center justify-center">
                                <h1 className="text-3xl text-white font-bold">{conversationSelected.user?.username}</h1>
                                <h1 className="text-lg text-message_background">{conversationSelected.user?.status ? "Online" : "Offline"}</h1>
                            </div>
                        </div>
                        <div className="w-full flex items-center justify-center gap-2">
                            <div className="size-[60px] flex items-center justify-center">
                                <Link rel="preload" href="#">
                                    <Image src={ProfileLink} alt="info" width={50} className="hover:size-[56px] active:size-[52px] transition-all" />
                                </Link>
                            </div>
                            <div className="size-[60px] flex items-center justify-center">
                                <Link rel="preload" href="#">
                                    <Image src={pingPong} alt="info" width={50} className="hover:size-[56px] active:size-[52px] transition-all" />
                                </Link>
                            </div>
                            <div className="size-[60px] flex items-center justify-center">
                                <Link rel="preload" href="#">
                                    <Image src={Gamepad} alt="info" width={50} className="hover:size-[56px] active:size-[52px] transition-all" />
                                </Link>
                            </div>
                            <div className="size-[60px] flex items-center justify-center">
                                <Link rel="preload" href="#">
                                    <Image src={block} alt="info" width={50} className="hover:size-[56px] active:size-[52px] transition-all" />
                                </Link>
                            </div>
                        </div>
                    </div>
            }
        </>
    )
}

export default Info;