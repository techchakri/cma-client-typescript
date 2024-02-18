import axios from "axios";
import { IUser } from "../models/IUser";

export class UserService {
    private static serverUrl : string = process.env.REACT_APP_EXPRESS_SERVER_URL ? process.env.REACT_APP_EXPRESS_SERVER_URL : "";

    /**
     * Usage: Register a User
     * Method: POST
     * URL: http://localhost:9000/users/register
     * body: username, email, password
     * params: user
     * access: PUBLIC
     */
    public static registerUser(user:IUser): Promise<{data: {msg: string, data:IUser}}> {
        const dataUrl: string = `${this.serverUrl}/users/register`;
        return axios.post(dataUrl, user); 
    }

    /**
     * Usage: Login a User
     * Method: POST
     * URL: http://localhost:9000/users/login
     * body: email, password
     * params: user
     * access: PUBLIC
     */

    public static loginUser(user:IUser): Promise<{data: {msg: string, data: IUser, token: string}}> {
        const dataUrl: string = `${this.serverUrl}/users/login`;
        return axios.post(dataUrl, user);
    }


    /**
     * Usage: Get User Info
     * Method: GET
     * URL: http://localhost:9000/users/me
     * body: no-body
     * params: no-params
     * access: PRIVATE
     */

    public static getUserInfo():Promise<{data: {data: IUser}}>{
        const dataUrl: string = `${this.serverUrl}/users/me`
        return axios.get(dataUrl)
    }

}