import UserComp from "./UserComp";
import Image from "next/image";

const UserTopBar = () => {

    return (
        <div className="w-full h-[10%] flex items-center justify-between absolute top-0">
            <div className="size-fit flex items-center">
                <UserComp />
            </div>
        </div>
    )
}

export default UserTopBar;