import React from "react";
import { IUser } from "../models/IUser";

interface IProps {
    user: IUser
}


const UserCard:React.FC<IProps> = ({user}) => {

    const colors = ["bg-blue-400", "bg-orange-400", "bg-yellow-400", "bg-red-400", "bg-green-400", "bg-gray-400 text-white"]

    const color = colors[Math.floor(Math.random() * colors.length)]

    return (
        <div className={`card text-lg flex flex-col gap-1 py-3 px-5 shadow-xl ${color}`}>
            <h2 className="text-xl font-medium text-center">{user.name}         </h2>
            <h2>{user.email}        </h2>
            <h2>{user.website}      </h2>
            <h2>{user.company.name} </h2>
            <h2>{user.address.city} </h2>
        </div>
    )
}

export default UserCard;