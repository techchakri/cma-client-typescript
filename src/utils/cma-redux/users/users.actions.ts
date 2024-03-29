import { createAsyncThunk } from "@reduxjs/toolkit";
import { IUser } from "../../../modules/users/models/IUser";
import { UserService } from "../../../modules/users/services/UserService";
import { AuthUtil } from "../../auth-utils/AuthUtil";

/**
 * PUBLIC
 */
export const registerUserAction: any = createAsyncThunk("user/registerUserAction", async (payload: {user:IUser}, {rejectWithValue}):Promise<{msg: string, data:IUser} | any> => {
    try {
        const {user} = payload;
        const response = await UserService.registerUser(user);
        return response.data;
    } catch(error:any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error)
    }
})

/**
 * PUBLIC
 */
export const loginUserAction: any = createAsyncThunk("user/loginUserAction", async (payload: {user:IUser}, {rejectWithValue}):Promise<{msg: string, data:IUser, token: string} | any> => {
    try {
        const {user} = payload;
        const response = await UserService.loginUser(user);
        return response.data;
    } catch(error:any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error)
    }
})

/**
 * PRIVATE
 */
export const getUserInfoAction: any = createAsyncThunk("user/getUserInfoAction", async (payload: {}, {rejectWithValue}):Promise<{data: IUser} | any> => {
    try {
        if (AuthUtil.isSetTokenToHeader()) {
        const response = await UserService.getUserInfo();
        return response.data;
        }
    } catch(error:any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error)
    }
})