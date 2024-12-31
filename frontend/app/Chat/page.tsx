"use client";
import { useEffect } from "react";
import { useChatStore } from "../stores/chatStore";
import ConversationSide from "./Components/ConversationSide/ConversationSide";
import FriendsSide from "./Components/FriendSide/FriendsSide";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { useUser } from "@/app/context/userContext";
import NavBar from "@/components/navbar/NavBar";

const Chat = () => {
    
    const queryClient = new QueryClient();

    const { user } = useUser();

    const setUser = useChatStore((state) => state.setUser);
    const setSocket = useChatStore((state) => state.setSocket);

    useEffect(() => {

        if (!user)
            return;

        setUser(user);

        const newSocket = new WebSocket(`ws://localhost:8000/ws/chat/${user?.id}`);

        newSocket.onopen = () => {
            console.log("Connected");
            setSocket(newSocket);
        };
        
        newSocket.onclose = () => {
            console.log("Disconnected");
        };
        
        newSocket.onerror = () => {
            console.log("Error");
        };
        
        newSocket.onmessage = (event) => {
            console.log("Message: ", event.data);
        };
        
        return () => {
            newSocket.close();
        }

    }, [user]);

    if (!user)
        return <div className="text-2xl text-white pt-5"> Loading ... </div>;

    return (
        <QueryClientProvider client={queryClient}>
            <div className="size-full rounded-3xl flex items-center justify-center border-t-1 shadow-xl border-t border-l border-border">
                <FriendsSide />
                <ConversationSide/>
            </div>
        </QueryClientProvider>
    )
}

export default Chat;