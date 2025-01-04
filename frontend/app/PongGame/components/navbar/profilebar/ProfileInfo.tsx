import Avatar from "./Avatar";

const ProfileInfo = () => {
    return (
        <>
            <div className="flex flex-col justify-center items-start">
                <h2 className="text-[17px] font-semibold text-white ">khalid zerri</h2>
                <h2 className="text-[15px] font-semibold text-blue-300 -mt-1">@kzerri</h2>
            </div>
            <Avatar width={40} height={40}/>
        </>
    )
}

export default ProfileInfo;