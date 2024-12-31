"use client";
import UserTopBar from "./UserTopBar";
import ConversationMessages from "./ConversationMessages";
import Image from "next/image";
import conversation_not_selected from "../../../../public/conversation_not_selected.png";
import InputComp from "./InputComp";
import { useState } from "react";
import Info from "./Info";
import InfoBtn from "./InfoBtn";
import { useChatStore } from "@/app/stores/chatStore";

const ConversationSide = () => {

    const [showInfo, setShowInfo] = useState(false);
    const conversationSelected = useChatStore((state) => state.conversationSelected);

    return (
        <div className="bg-blur-dark size-full backdrop-blur-3xl rounded-r-3xl flex items-center justify-center py-4 translition-all duration-1000">
            <div className="size-full mx-8 flex flex-col gap-2 items-center justify-center transition-all relative">
                {
                    conversationSelected?.user ? (
                            <>
                                <UserTopBar />
                                <ConversationMessages />
                                <InputComp/>
                                <InfoBtn showInfo={showInfo} setShowInfo={setShowInfo}/> <Info showInfo={showInfo}/>
                            </>
                        ) : (
                            <Image src={conversation_not_selected} alt="empty" width={400} height={400} className=""/>
                        )
                }
            </div>
        </div>
    );
};

export default ConversationSide;