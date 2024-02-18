import React from "react";
import { IComment } from "../models/IComment";


interface IProps {
    comment: IComment
}


const CommentCard:React.FC<IProps> = ({comment}) => {

    const colors = ["bg-blue-400", "bg-orange-400", "bg-yellow-400", "bg-red-400", "bg-green-400", "bg-gray-400 text-white"]

    const color = colors[Math.floor(Math.random() * colors.length)]

    return (
        <div className={`card text-lg flex flex-col gap-1 py-3 px-5 shadow-xl ${color}`}>
            <h2 className="text-xl font-medium text-center">{comment.name}         </h2>
            <h2>{comment.email}        </h2>
            <h2>{comment.body}</h2>
        </div>
    )
}

export default CommentCard;