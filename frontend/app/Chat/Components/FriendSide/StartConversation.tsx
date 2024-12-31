import { useState, useContext, useEffect, useMemo } from "react";
import { fetchAllUsers, fetchUserProfile, newConversation } from "../../Tools/apiTools";
import ChatContext from "../../Tools/ChatContext";
import Image from "next/image";
import avatar from "../../../../public/avatar.png";
import UserTopBar from "../ConversationSide/UserTopBar";
import { UserProfile } from "../../context/ChatContext";

const StartConversation = () => {

    const { UserProfile, userTopBar, conversations, setConversations, setUserTopBar } = useContext(ChatContext);
    const { setAddConversation } = useContext(ChatContext);
    const [Friends, setFriends] = useState([]);
    const [currentUser, setCurrentUser] = useState<UserProfile | null>(null);

    const createConversation = async (Freind_username: string) => {
        try {
            const conversation = await newConversation(UserProfile.user.username, Freind_username);
            if (conversation?.ok)
            {
                const conv = await conversation.json();
                setConversations((prevConversations) => [...prevConversations, conv]);
                const userTofetch = conv.user1 !== UserProfile.id ? conv.user1 : conv.user2;
                const user = await fetchUserProfile(userTofetch);
                console.log("User");
                console.log(user);
                (user && conv) ?  setUserTopBar({conv, userTarget: user}) : ""
            }
            else if (conversation.status === 409)
            {
                const conv = await conversation.json();
            }
        }
        catch (error) {
            console.log(error);
        }
    }

    useEffect( () => {
        const fetchUsers = async () => {
            try {
                const users = await fetchAllUsers();
                if (users.length > 0)
                {
                    const newFriends = users.filter( (user: UserProfile) => { return user.id !== UserProfile.id});
                    console.log(newFriends);
                    console.log(UserProfile)
                    setFriends(newFriends);
                }
                console.log(users); 
            }
            catch (error) {
                console.log(error);
            }
        }
        fetchUsers();
    }, [UserProfile.id])

    useEffect(() => {
        const handleNewConversation = async () => {
            if (currentUser && UserProfile) {
                const response = await newConversation(UserProfile?.id, currentUser.id);
                if (!response) {
                    console.log("Error in newConversation");
                    return;
                }
                
                const conversation: Conversation = await response.json();
                const conversationExists = conversations.find((conv: Conversation) => conv.id === conversation.id);
                if (conversationExists) {
                    console.log("conversationExists: ", conversationExists);
                    setConversationSelected({ conversation: conversationExists, user: currentUser });
                    return;
                }
                console.log("newConversation: ", conversation);
                
                setConversationSelected({ conversation: conversation, user: currentUser });
            }
        }
        handleNewConversation();
    }, [currentUser]);


    return (
        <div className="bg-search_blur w-11/12 h-fit py-5 rounded-3xl backdrop-blur-xl  shadow-xl absolute border-l border-t border-border mx-3.5 top-20 z-10 transition-all flex gap-3 flex-col items-center justify-center">
            {Friends ? Friends.map( (user, index) => {
                return (
                    <div key={index} className="w-11/12 h-[80px] mx-5 flex items-center justify-start gap-3 transition-all hover:bg-gradient-to-r hover:from-hover_color hover:bg-gradient-to-r active:from-active_color" onClick={() => {createConversation(user.user.username); setAddConversation(false)}}>
                        <div className="border rounded-full size-[60px]">
                            <Image src={avatar} alt="avatar" width={60} height={60} className="rounded-full"/>
                        </div>
                        <div className="">
                            <h1 className="text-xl font-bold">{user.user.username}</h1>
                            <p className="text-text_message_color">{user.status ? "Online" : "Offline"}</p>
                        </div>
                    </div>
                )
            }): <h1>No Freinds</h1>}
        </div>
    );
}

export default StartConversation;