import React, { useState } from "react";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import { Link, useNavigate } from "react-router-dom";
import { AppDispatch, useAppDispatch } from "../../../../utils/cma-redux/store";
import { IUser } from "../../models/IUser";
import * as userActions from "../../../../utils/cma-redux/users/users.actions";

interface IUserError {
    emailError: string;
    passwordError: string;
}

const LoginUser:React.FC = () => {
    const dispatch:AppDispatch = useAppDispatch();
    const navigate = useNavigate();

    const [user, setUser] = useState<IUser>({
        email: "",
        password: ""
    });

    const [userError, setUserError] = useState<IUserError>({
        emailError: "",
        passwordError: ""
    });

    const validateEmail = (event:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, email: event.target.value});
        const regExp = /^\w+([\\.-]?\w+)*@\w+([\\.-]?\w+)*(\.\w{2,3})+$/;
        // console.log(regExp.test(event.target.value));
        !regExp.test(event.target.value) ? 
                 setUserError({...userError, emailError: "Enter a proper Email"})
                 : setUserError({...userError, emailError: ""});
      }
    
      const validatePassword = (event:React.ChangeEvent<HTMLInputElement>) => {
        setUser({...user, password: event.target.value});
        const regExp = /^(?!.*\s)(?=.*[A-Z])(?=.*[a-z])(?=.*[0-9])(?=.*[@#$%^&*()--+={}\[\]|\\:;"'<>,.?/_]).{8,20}$/;
        // console.log(regExp.test(event.target.value));
        !regExp.test(event.target.value) ? 
                 setUserError({...userError, passwordError: "Enter a proper Password"})
                 : setUserError({...userError, passwordError: ""});
      }

      const checkForEmptyFields = ():boolean => {
        for (let key of Object.keys(user) as (keyof typeof user)[]) {
            if (user[key] === "") {
                return true;
            }
        }
        return false
      }

      const checkForErrorFields = ():boolean => {
        const userItems = Object.entries(userError);
        return userItems.some((item) => item[1].length > 0)
      }
    
      const handleSubmit = (e:React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        dispatch(userActions.loginUserAction({user: user}))
        .then((response:any) => {
            if (response && !response.error) {
                navigate("/")
            }
        });
      }



    return (
        <>
        <LayoutHeading heading="Login User" color=" text-brown-500" />
        <div className="container mx-auto mt-4">
            <div className="grid grid-cols-12">
                <div className="col-span-4">
                    <form onSubmit={(e) => handleSubmit(e)} className="flex flex-col gap-3">
                        <div>
                        <input 
                        required
                        value={user.email}
                        name="email"
                        onChange={(e) => validateEmail(e)}
                        type="text" placeholder="Email" 
                        className={`outline-none w-full py-1 px-2 rounded ${userError.emailError.length > 0 ? "border-red-500 border-2" : ""}`} />
                        {
                            userError.emailError.length > 0 &&
                            <small className="text-red-400">{userError.emailError}</small>
                        }
                        </div>
                        <div>
                        <input 
                        required
                        value={user.password}
                        name="password"
                        onChange={(e) => validatePassword(e)}
                        type="password" placeholder="Password" 
                        className={`outline-none w-full py-1 px-2 rounded ${userError.passwordError.length > 0 ? "border-red-500 border-2" : ""}`} />
                        {
                            userError.passwordError.length > 0 &&
                            <small className="text-red-400">{userError.passwordError}</small>
                        }
                        </div>
                        <div>
                            <button disabled={checkForEmptyFields() || checkForErrorFields()} type="submit" className="bg-green-700 text-white py-1 px-2 rounded-md">Login</button>
                            <Link to={"/"} className="ml-2 bg-black text-white py-1 px-2 rounded-md">Cancel</Link>
                        </div>
                    </form>
                    <small>Don't have an account ? 
                        <Link to={"/users/register"} className="text-blue-700 font-medium"> Register</Link>
                    </small>
                </div>
            </div>
        </div>
        </>
    );
}

export default LoginUser;