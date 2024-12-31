"use client";

import { useEffect, useRef, useState } from "react";
import { useQuery } from "@tanstack/react-query";
import MessageComp from "./MessageComp";
import { fetchMessages } from "../../Tools/apiTools";
import { Message } from "postcss";
import { useChatStore } from "@/app/stores/chatStore";
import MessagesSkeleton from "../utils/MessagesSkeleton";
import useDelayedLoading from "../utils/utils";

const ConversationMessages = () => {

    const socket = useChatStore((state) => state.socket);
    const conversationSelected = useChatStore((state) => state.conversationSelected);
    const conversationRef = useRef(null);
    const [messages, setMessages] = useState<Message[]>([]);

    useEffect(() => {
        
        const handleMessage = (event: MessageEvent) => {
            const data = JSON.parse(event.data);
            if (data.type === "new_message") {
                if (data.conversation_id === conversationSelected?.conversation?.id) {
                    setMessages((prevMessages) => {
                        const updatedMessages = [...prevMessages, data];
                        return updatedMessages;
                    });
                }
            }
        };
    
        socket?.addEventListener('message', handleMessage);
    
        return () => {
            socket?.removeEventListener('message', handleMessage);
        };

    }, [conversationSelected]);

    useEffect(() => {
        if (conversationRef.current) {
          conversationRef.current.scrollTo({
            top: conversationRef.current.scrollHeight,
            behavior: "smooth",
          });
        }
      }, [conversationSelected, messages]);

    const { data: fetchedMessages, isLoading, isError } = useQuery({
        queryKey: ["messages", conversationSelected?.conversation?.id],
        queryFn: () => fetchMessages(conversationSelected?.conversation?.id ? conversationSelected?.conversation?.id : 0),
        refetchOnWindowFocus: false,
        enabled: !!conversationSelected,
    });

    const isReady = useDelayedLoading(isLoading, 500);

    useEffect(() => {
        if (fetchedMessages) {
            setMessages(fetchedMessages);
        }
    }, [fetchedMessages]);

    return (
        <div ref={conversationRef} className="size-full scrollable-y overflow-y-scroll snap-y snap-mandatory scrollbar scrollbar-thumb-transparent scrollbar-track-transparent scroll-auto">
            <div className="flex flex-col h-full">
                <div className="flex-grow"></div>
                <ul className="flex flex-col items-center gap-5 p-5">
                    {
                        isReady ? <MessagesSkeleton/> : isError ? <h1 className="text-xl text-text_message_color">Error</h1> :
                            Array.isArray(messages) ? messages.map((message) => {
                                return <MessageComp message={message} key={message.id} />
                            }) : <div></div>
                    }
                </ul>
            </div>
        </div>
    );
};

export default ConversationMessages;