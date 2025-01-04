'use client'

import { IMAGES } from "@/public/index";
import Image from "next/image"

interface AvatarProps {
    width: number;
    height: number;
}

const Avatar: React.FC<AvatarProps> = ({width, height}) => {
    return (
        <Image
            src={IMAGES.profile}
            alt="Profile Picture"
            width={width}
            height={height}
            className="rounded-full cursor-pointer object-cover"
        />
    )
}

export default Avatar;
