import avatarSender from "../../../../public/Ellipse 4.svg";
import avatarReceiver from "../../../../public//Ellipse 5.svg";
import Avatar from "@/components/navbar/profilebar/Avatar";
import { useChatStore, Message} from "@/app/stores/chatStore";
import { timeHandle } from "../utils/utils";


type MessageProps = {
    message: Message;
}

const MessageComp: React.FC<MessageProps> = ({message}) => {
    
    const user = useChatStore((state) => state.user);

    const msgPosition = user.id === message?.sender ? "justify-end" : "justify-end flex-row-reverse";
    const msgColor = user.id === message?.sender ? "bg-sender_message_background" : "bg-receiver_message_background";

    return (
        <div className={`w-full h-fit flex ${msgPosition} items-end gap-2 transition-all`}>
            <div className={`${msgColor} shadow-xl w-fit h-full flex justify-center p-4 rounded-3xl min-w-[100px]`}>
                <div className="size-full flex flex-col">
                    <div className="w-full h-full">
                        <p className="text-text_message_color font-bold break-words">{message.message}</p>
                    </div>
                    <div className="w-full h-fit flex justify-end">
                        <p className="text-xs text-text_message_color font-bold"> {timeHandle(message.time)} </p>
                    </div>
                </div>
            </div>
            <Avatar width={60} height={60} avatar={user.avatar}/>
            {/* <Image src={user_id === message?.sender ? avatarSender : avatarReceiver} alt="" width={64} height={64} className="rounded-full shadow-lg"/> */}
        </div>
    )
}

export default MessageComp;