import React from "react";
import { IPost } from "../models/IPost";

interface IProps {
    post: IPost
}


const PostCard:React.FC<IProps> = ({post}) => {

    const colors = ["bg-blue-400", "bg-orange-400", "bg-yellow-400", "bg-red-400", "bg-green-400", "bg-gray-400 text-white"]

    const color = colors[Math.floor(Math.random() * colors.length)]

    return (
        <div className={`card text-lg flex flex-col gap-1 py-3 px-5 shadow-xl ${color}`}>
            <h2 className="text-xl font-medium text-center">{post.title}         </h2>
            <h2>{post.body}        </h2>
        </div>
    )
}

export default PostCard;