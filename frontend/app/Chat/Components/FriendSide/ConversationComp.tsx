import { useState } from "react";
import Image from "next/image";
import AvatarPic from "../../../../public/Ellipse 209.svg";
import { useChatStore, Conversation } from "@/app/stores/chatStore";
import { User } from "@/app/context/userContext";
import { timeHandle } from "../utils/utils";
import Avatar from "@/components/navbar/profilebar/Avatar";


interface ConversationCompProps {
    conversation: Conversation;
}

function findTargetUser(conversation: Conversation, user_id: number) {
    const target: User = conversation.user1?.id === user_id ? conversation.user2 : conversation.user1;
    return target;
}

const ConversationComp: React.FC<ConversationCompProps> = ({ conversation }) => {

    const setConversationSelected = useChatStore((state) => state.setConversationSelected);
    const conversationSelected = useChatStore((state) => state.conversationSelected);
    const user = useChatStore((state) => state.user);
    const [userTarget, setUserTarget] = useState<User | null>(findTargetUser(conversation, user?.id ? user.id : 0));

    const handleConversationClick = async () => {
        if (conversationSelected?.conversation?.id === conversation.id)
            return;
        setConversationSelected({
            conversation: conversation,
            user: userTarget
        });
    };

    return (
        <div onClick={handleConversationClick} className={`${conversationSelected?.conversation?.id === conversation.id ? "bg-gradient-to-r from-active_color transition-all duration-400" : ""} w-full h-20 text-black flex items-center justify-center hover:bg-gradient-to-r hover:from-hover_color duration-400 active:from-active_color transition-all snap-start snap-always`}>
            <div className="w-11/12 h-20 flex items-center justify-center gap-1">
                <div className="flex items-center justify-center">
                <Avatar width={70} height={70} avatar={userTarget.avatar}/>
                </div>
                <div className="w-full flex flex-col items-start justify-center mx-1">
                    <div className="w-11/12 h-8 flex items-center justify-between">
                        <h1 className="text-white font-bold text-lg break-keep">{userTarget?.username}</h1>
                        <h1 className="text-text_message_color font-bold ">{timeHandle(conversation?.last_message?.time)}</h1>
                    </div>
                    <div className="w-full h-[25px] overflow-hidden">
                        <p className="text-text_message overflow-hidden">{ conversation?.last_message?.sender === user?.id ?  `You:${conversation.last_message?.message}` : conversation.last_message?.message}</p>
                    </div>
                </div>
                <div className="">
                    {/* <p className="flex items-center justify-center text-white">{conversationSelected?.conversation?.id === conversation.id ? "" : (conversation.unreaded_msg_counter_user1 !== 0 ? conversation.unreaded_msg_counter_user1 : "")}</p> */}
                </div>
            </div>
        </div>
    );
}

export default ConversationComp;