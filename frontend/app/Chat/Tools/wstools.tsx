
const sendMessage = (type: string ,socket: WebSocket, reciever_id: number, message: string, sender_id: number, conversation_id: number) => {
    socket.send(JSON.stringify({type: type, sender_id : sender_id, reciever_id: reciever_id, message: message, conversation_id: conversation_id, time: new Date().toISOString()}));
    console.log("Message Sent");
    console.log("Message Object: ", {type: type, sender_id : sender_id, reciever_id: reciever_id, message: message, conversation_id: conversation_id, time: new Date().toISOString()});
}

export { sendMessage };