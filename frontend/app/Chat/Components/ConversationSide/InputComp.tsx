import Image from 'next/image';
import document_icon from '../../../../public/conversationSide/documents_icon.png';
import React, { useEffect, useRef, useState } from 'react';
import { sendMessage } from '../../Tools/wstools';
import sendIcon from '../../../../public/conversationSide/Send_hor.svg';
import { useChatStore } from '@/app/stores/chatStore';

const InputComp = () => {
    
    const socket = useChatStore((state) => state.socket);
    const user = useChatStore((state) => state.user);
    const conversationSelected = useChatStore((state) => state.conversationSelected);

    const [message, setMessage] = useState<string | null>("");
    const [okToSend, setOkToSend] = useState<boolean>(false);
    const inputRef = useRef<HTMLInputElement>(null);

    if (socket === null || user === null || conversationSelected === null)
        throw new Error("socket or UserProfile || conversationSelected is NULL in InputComp");


    function checkMessageAbellity(message: string) {
        setMessage(message);
        if (message.trim().length > 0)
            setOkToSend(true);
        else
            setOkToSend(false);
    }

    const sendFun = (e: any) => {
        const msg = message?.trim();
        if (msg && msg.length > 0 && conversationSelected?.user && conversationSelected?.conversation)
            sendMessage("chat_message", socket ,conversationSelected?.user?.id, msg, user.id, conversationSelected?.conversation?.id);
        setMessage("");
        setOkToSend(false);
    }

    const  handelMousePress = (e: React.MouseEvent<HTMLButtonElement>) => {
        sendFun(e);
        if (inputRef.current)
            inputRef.current.value = "";
    }
    
    const handelKeyPress = async (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (okToSend && (e.key === 'Enter' || e.key === 'NumpadEnter'))
        {
            sendFun(e);
            (e.target as HTMLInputElement).value = "";
        }
    }

    return (
        <div className="w-full  mx-4 h-fit flex items-center gap-5 mb-4">
            <div className="bg-icon_color w-[50px] h-[45px] rounded-full flex items-center justify-center">
                <Image src={document_icon} alt="" className=""/>
            </div>
            <div className="bg-search_blur size-full flex items-center px-2 rounded-full shadow-search_inner">
                <input ref={inputRef} onKeyDown={handelKeyPress} type="text" className="size-full bg-transparent text-text_message mx-3 outline-none" placeholder="Type a message..." onChange={(e) => {checkMessageAbellity(e.target.value)}}/>
                <button onClick={(e) => handelMousePress(e)} className={`${okToSend ? "" : "hidden"}`}><Image src={sendIcon} alt="" width={35} className="rounded-full shadow-2xl bg-border_button p-[5px] " /></button>
            </div>
        </div>
    )
}

export default InputComp;