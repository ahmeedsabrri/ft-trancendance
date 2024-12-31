import { create } from "zustand";
import { User } from "@/app/context/userContext";

export interface Message {
    id: number;
    sender: number;
    message: string;
    conversation_id: number;
    time: string;
}
  
export interface Conversation {
    id: number;
    user1: User;
    user2: User;
    last_message: Message;
    unreaded_msg_counter_user1: number;
    unreaded_msg_counter_user2: number;
}
  
interface ConversationSelected {
    conversation: Conversation | null;
    user: User | null;
}

interface ChatStore {
    user: User | null;
    setUser: (user: User) => void;
    socket: WebSocket | null;
    setSocket: (socket: WebSocket) => void;
    Loading: boolean;
    search: string;
    setSearch: (search: string) => void;
    conversations: Conversation[];
    setConversations: (conversations: Conversation[]) => void;
    addConversation: (conversation: Conversation) => void;
    messages: Message[];
    setMessages: (messages: Message[]) => void;
    conversationSelected: ConversationSelected | null;
    setConversationSelected: (conversationSelected: ConversationSelected) => void;
    friends: User[];
    setFriends: (friends: User[]) => void;
}

const useChatStore = create<ChatStore>((set) => ({
    user: null,
    setUser: (user: User) => set({ user }),
    socket: null,
    setSocket: (socket: WebSocket) => set({ socket }),
    Loading: false,
    search: "",
    setSearch: (search: string) => set({ search }),
    conversations: [],
    setConversations: (conversations: Conversation[]) => set({ conversations }),
    addConversation: (conversation: Conversation) => set((state) => ({ conversations: [conversation, ...state.conversations] })),
    messages: [],
    setMessages: (messages: Message[]) => set({ messages}),
    conversationSelected: null,
    setConversationSelected: (conversationSelected: ConversationSelected) => set({ conversationSelected }),
    friends: [],
    setFriends: (friends: User[]) => set({ friends }),
}));

export { useChatStore };