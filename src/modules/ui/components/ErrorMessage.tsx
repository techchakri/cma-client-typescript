import React from "react";

interface IProps {
    message: string;
}

const ErrorMessage:React.FC<IProps> = ({message}) => {
    return (
        <>
        <div className="container mx-auto mt-6 text-center uppercase">
            <h3 className="font-bold text-2xl text-red-500">{message}</h3>
        </div>
        </>
    );
}

export default ErrorMessage;