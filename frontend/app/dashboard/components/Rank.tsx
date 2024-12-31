import { UserProfile } from "./app/chat/context/ChatContext";
import Image from "next/image";
import avatar from "@/public/Ellipse 209.svg";

const users = [
    {
        id: 1,
        name: "Alex Doe",
        login: "alexdoe",
        email: "",
        avatar: "",
        level: 1,
        points: 100,
        rank: 1,
    },
    {
        id: 2,
        name: "Ivan Doe",
        login: "ivandoe",
        email: "",
        avatar: "",
        level: 1,
        points: 100,
        rank: 2,
    },
    {
        id: 3,
        name: "John Doe",
        login: "johndoe",
        email: "",
        avatar: "",
        level: 1,
        points: 100,
        rank: 3,
    },
]


const UserComponent = (user: any) => {
    return (
        <div className="w-full min-w[300px] h-[70px] flex items-center p-[10px] rounded-3xl border-border border gap-[10px] shadow-xl hover:duration-200 hover:bg-gradient-to-r hover:from-search_color ">
            <h1 className="text-xl text-white">{user.id}</h1>
            <Image src={avatar} alt="avatar" width={50} height={50} />
            <div className="w-full">
                <div>
                    <h1 className="font-bold text-white">{user.name}</h1>
                </div>
                <div className="w-full flex items-center justify-between">
                    <p className="font-bold text-picton_blue">@{user.login}</p>
                    <p className="font-bold text-text_message">LVL: {user.level}</p>
                </div>
            </div>
        </div>
    )
}

const Rank = () => {
    return (
        <div className="w-[600px] h-full p-8">
                <h1 className="text-2xl font-bold text-white text_shadow">Rank</h1>
            <div className="size-full flex flex-col justify-start">
                <ul className="flex flex-col gap-2 p-4 ">
                    {users.map((user) => (
                        <li key={user.id}>
                            <UserComponent {...user} />
                        </li>
                    ))}
                </ul>
            </div>
        </div>
    )
}

export default Rank;