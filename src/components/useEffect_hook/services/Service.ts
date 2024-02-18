import axios from "axios";
import { IUser } from "../models/IUser";
import { ITodo } from "../models/ITodo";
import { IComment } from "../models/IComment";
import { IPost } from "../models/IPost";

export class Service {
    private static serverUrl:string = "https://jsonplaceholder.typicode.com";

    public static getAllUsers(): Promise<{data:IUser[]}> {
        const dataUrl:string = `${this.serverUrl}/users`;
        return axios.get(dataUrl);
    }

    public static getAllTodos(): Promise<{data:ITodo[]}> {
        const dataUrl:string = `${this.serverUrl}/todos`;
        return axios.get(dataUrl);
    }

    public static getAllComments(): Promise<{data:IComment[]}> {
        const dataUrl:string = `${this.serverUrl}/comments`;
        return axios.get(dataUrl);
    }

    public static getAllPosts() {

        const dataUrl:string = `${this.serverUrl}/posts`;
        return axios.get(dataUrl);

    }
}