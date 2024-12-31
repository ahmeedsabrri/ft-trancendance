import { useEffect, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import { useChatStore, Conversation } from "@/app/stores/chatStore";
import Image from "next/image";
import empty_conversation from "../../../../public/FriendSide/Empty_State_Illustrations_Light_Mode_No_Conversation.png";
import ConversationComp from "./ConversationComp";
import { fetchConversations } from "../../Tools/apiTools";
import { useUser } from "@/app/context/userContext";
import ConversationsSkeleton from "../utils/ConversationsSkeleton";
import useDelayedLoading from "../utils/utils";

function sortConversationsByDate(conversations: Conversation[] | null) {
    if (!conversations)
        return [];
    return conversations.sort((a: Conversation, b: Conversation) => {
        if (!a.last_message)
            return -1;
        if (!b.last_message)
            return 1;
        return new Date(b.last_message.time).getTime() - new Date(a.last_message.time).getTime();
    });
}

const FriendConversations = () => {

    const socket = useChatStore((state) => state.socket);
    const { user } = useUser();
    const setConversations = useChatStore((state) => state.setConversations);
    const conversations = useChatStore((state) => state.conversations);
    const conversationSelected = useChatStore((state) => state.conversationSelected);
    
    const {data: conversationFetched,  isLoading, isError, refetch} = useQuery({
        queryKey: ["conversations", user?.id, socket?.onmessage],
        queryFn: () => fetchConversations(user?.id ? user?.id : 0),
        refetchOnWindowFocus: false,
        enabled: !!user,
        retryDelay: 2000,
        
    });
    const isReady = useDelayedLoading(isLoading, 3000);

    useEffect(() => {
        if (conversationFetched) {
            console.log(conversationFetched);
            setConversations(sortConversationsByDate(conversationFetched));
        }
    }, [conversationFetched]);

    useEffect(() => {
        if (!socket)
            return;

        const handleMessage = () => {
            refetch();
        }

        socket.addEventListener('message', handleMessage);

        return () => {
            socket.removeEventListener('message', handleMessage);
        };
    }, [socket]);

    if (!conversations)
        return <h1 className="text-white">Loading</h1>;
    return (
        <div className="w-full h-full  flex items-center justify-start flex-col gap-2 overflow-y-scroll snap-y snap-mandatory scrollbar scrollbar-thumb-dark_scroll scrollbar-track-transparent">
            {!conversations ? (<Image className="m-auto" src={empty_conversation} alt="empty_conversation" />) 
                : isReady ? <ConversationsSkeleton />
                : isError ? <h1 className="text-xl text-white">Error</h1> 
                : (
                    Array.isArray(conversations) && conversations.map((conversation: Conversation) => (
                        !(conversation?.last_message) && (conversationSelected?.conversation?.id !== conversation.id) ? (
                            ""
                        ) : (
                            <ConversationComp key={conversation.id} conversation={conversation} />
                        )
                ))
            )}
        </div>
    );
};

export default FriendConversations;