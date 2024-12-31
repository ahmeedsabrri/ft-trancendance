"use client"

import { useEffect, useState } from "react";
import avatar_img from "@/public/Ellipse 4.svg";
import Image from "next/image";
import { fetchAllUsers, newConversation } from "../../Tools/apiTools";
import { Conversation, useChatStore } from "@/app/stores/chatStore";
import { User } from "@/app/context/userContext";
import { useQuery } from "@tanstack/react-query";
import FriendsSkeleton from "../utils/FriendsSkeleton";
import useDelayedLoading from "../utils/utils";

function filterFriends(friends: User[] | null, search: string) {
    if (!friends)
        return [];
    return friends.filter((friend: User) => friend.username.toLowerCase().includes(search));
}

function sortFriendsByName(friends: User[] | null) {
    if (!friends)
        return [];
    return friends.sort((a: User, b: User) => a.username.toLowerCase().localeCompare(b.username.toLowerCase()));
}

const Inputcomponent = () => {
    const setSearch = useChatStore((state) => state.setSearch);

    return (
        <div className="w-11/12 min-h-[60px] flex justify-center items-center ">
            <div className='size-full rounded-2xl bg-search_blur backdrop-blur-2xl flex justify-end shadow-search_inner'>
                <input className="bg-transparent w-11/12 font-bold placeholder:text-search_color outline-none color-search_color text-search_color" placeholder='Search...' onChange={(e) => {setSearch(e.target.value.toLowerCase())}}/>
            </div>
        </div>
    )
}

const SearchAndFriendShow = () => {

    return (
        <div className="w-full h-fit flex flex-col items-center justify-center">
            <Inputcomponent />
            <FriendShow/>
        </div>
    );
}

const FriendShow = () => {

    const friends = useChatStore((state) => state.friends);
    const user = useChatStore((state) => state.user);
    const setFriends = useChatStore((state) => state.setFriends);
    const [currentUser, setCurrentUser] = useState<User | null>(null);
    const conversationSelected = useChatStore((state) => state.conversationSelected);
    const setConversationSelected = useChatStore((state) => state.setConversationSelected);
    const conversations = useChatStore((state) => state.conversations);
    const addConversation = useChatStore((state) => state.addConversation);
    const search = useChatStore((state) => state.search);
    
    const {data: FriendsFetched, isLoading, isError} = useQuery({
        queryKey: ["friends", user?.id],
        queryFn: () => fetchAllUsers(),
        refetchOnWindowFocus: false,
        enabled: !!user,
    })
    const isReady = useDelayedLoading(isLoading, 3000);
    
    useEffect(() => {
        if (FriendsFetched) {
            setFriends(FriendsFetched);
        }
    }, [FriendsFetched]);

    useEffect(() => {
        const handleNewConversation = async () => {
            if (currentUser && user) {
                try {
                    const conversation: Conversation = await newConversation(user?.id, currentUser.id);
    
                    if (!conversation) {
                        console.error("Failed to create or fetch conversation.");
                        return;
                    }
    
                    const conversationExists = Array.isArray(conversations) && conversations.find((conv: Conversation) => conv.id === conversation.id);
     
                    if (conversationExists) {
                        setConversationSelected({ conversation: conversationExists, user: currentUser });
                    } else {
                        console.log(conversations);
                        setConversationSelected({ conversation, user: currentUser });
                        addConversation(conversation);
                    }
                } catch (err) {
                    console.error("Error creating new conversation:", err);
                }
            }
        };
    
        handleNewConversation();
    }, [currentUser, user]);

   
    return (
        <div className="w-11/12 h-[150px] flex items-center justify-center">
            <ul className="w-full flex items-center scrollable-x overflow-x-scroll snap-x snap-mandatory scrollbar scrollbar-thumb-dark_scroll scrollbar-track-transparent">
                {isReady ? <FriendsSkeleton/> : sortFriendsByName(filterFriends(friends, search))?.map((friend: User) => {
                    return (
                        console.log(`Friend: ${friend}`),
                        <li key={friend.id} onClick={() => {conversationSelected?.user?.id !== friend?.id && setCurrentUser(friend)}} className="flex flex-col items-center min-w-[90px] h-[110px] p-2 gap-2 snap-start snap-always hover:bg-hover_color active:bg-active_color transition-all rounded-xl">
                            <Image src={avatar_img} alt="avatar"/>
                            <p className="text-text_message_color whitespace-nowrap">{friend.username}</p>
                        </li>
                    )
                })}
            </ul>
        </div>
    );
}



export default SearchAndFriendShow;