import React from "react";
import { Link } from "react-router-dom";
import * as userReducer from "../../../../utils/cma-redux/users/users.reducer";
import { useSelector } from "react-redux";
import { RootState } from "../../../../utils/cma-redux/store";
import { TokenUtil } from "../../../../utils/token-utils/TokenUtil";


const HomePage:React.FC = () => {

    // get user data from redux
    const userReduxState: userReducer.InitialState = useSelector((store:RootState) => {
        return store[userReducer.userFeatureKey];
    });

    const {isAuthenticated} = userReduxState; 

    return (
        <>
        <div id="landing-page" className="h-screen">
            <div id="wrapper" className="h-full">
                <div className="h-full flex flex-col gap-4 justify-center items-center">
                    <p className="text-5xl text-orange-500 font-semibold">Contact Manager App</p>
                    <div className="flex gap-2">
                        {
                            TokenUtil.isLoggedIn() && isAuthenticated ? 
                            <Link to={"/contacts/admin"} className="bg-blue-500 text-white py-2 px-3 text-lg rounded-lg">Contacts Admin</Link>
                            : <Link to={"/users/login"} className="bg-yellow-400 text-white py-2 px-3 text-lg rounded-lg">Login</Link> 
                        }
                    
                    </div>
                </div>
            </div>
        </div>
        </>
    );
}

export default HomePage;