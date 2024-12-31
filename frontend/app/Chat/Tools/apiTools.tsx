"use client"

import axios, {AxiosResponse} from "axios";
import { AuthActions } from "@/app/auth/utils";
import { Conversation } from "@/app/stores/chatStore";

// {
//   "sender_id": 3,
//   "message": "test message",
//   "conversation_id": 2,
//   "time": "2024-11-19T11:07:52Z"
// }

const api = axios.create({
    baseURL: 'http://localhost:8000/chat',
    withCredentials: true,
});

const newMessage = async (reciever_id: number, message: string, sender_id: number, conversation_id: number) => {
    const response = await api.post(`/new_message`, {
        sender_id: sender_id,
        message: message,
        conversation_id: conversation_id,
        time: new Date().toISOString(),
    });
    return response;
}

const newConversation = async (user1: number, user2: number) => {
    const response = await api.post(`/new_conversation/${user1}/${user2}`);
    return response.data;
}

const fetchAllUsers = async () => {
    const response : AxiosResponse = await api.get(`/users`);
    return response.data;
}

const fetchConversations = async (user_id: number) => {
    const response : AxiosResponse<Conversation[]> = await api.get(`/${user_id}/conversations`);
    return response.data;
};

const fetchMessages = async (conversation_id: number) => {
    const response : AxiosResponse = await api.get(`/conversation/${conversation_id}/messages`);
    return response.data;
}

export { fetchConversations, fetchMessages, fetchAllUsers, newConversation, newMessage };