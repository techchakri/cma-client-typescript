import React from "react";
import spinnerImg from "../../../assets/img/loading.gif";

const Spinner:React.FC = () => {
    return <div className="flex justify-center items-center h-screen">
        <img src={spinnerImg} alt="Loading Data ..." />
    </div>
}

export default Spinner;