import { SerializedError, createSlice, isRejectedWithValue } from "@reduxjs/toolkit";
import { IUser } from "../../../modules/users/models/IUser";
import * as userAction from "./users.actions";
import { ToastUtil } from "../../toast-util/ToastUtil";
import { TokenUtil } from "../../token-utils/TokenUtil";

export const userFeatureKey = "userFeature";

export interface InitialState {
    loading: boolean;
    errorMessage: SerializedError;
    user: IUser;
    token: string;
    isAuthenticated: boolean;
};

const InitialState : InitialState = {
    loading : false,
    errorMessage : {} as SerializedError,
    user: {} as IUser,
    token: "",
    isAuthenticated: false
};

export const userSlice = createSlice({
    name: "userSlice",
    initialState: InitialState,
    reducers: {
        logOffAction: (state, action) => {
            state.user = {} as IUser;
            state.token = "";
            TokenUtil.deleteTokenFromSession();
            state.isAuthenticated = false;
            ToastUtil.displaySuccessMessage("Logout is success!");
        }
    },
    extraReducers: (builder) => {
        // Register a User
        builder.addCase(userAction.registerUserAction.pending, (state, action) => {
            state.loading = true;
            state.errorMessage = {} as SerializedError;
        })
        .addCase(userAction.registerUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.errorMessage = {} as SerializedError;
            ToastUtil.displaySuccessMessage(action.payload.msg); 
        })
        .addCase(userAction.registerUserAction.rejected, (state, action) => {
            state.loading = false;
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.payload;
                ToastUtil.displayErrorMessage("Registration is Failed")
            }
        })

        // Login User
        builder.addCase(userAction.loginUserAction.pending, (state, action) => {
            state.loading = true;
            state.errorMessage = {} as SerializedError;
        })
        .addCase(userAction.loginUserAction.fulfilled, (state, action) => {
            state.loading = false;
            state.errorMessage = {} as SerializedError;
            state.user = action.payload.data;
            state.token = action.payload.token;
            state.isAuthenticated = action.payload.token ? true : false;
            TokenUtil.saveTokenToSession(action.payload.token);
            ToastUtil.displaySuccessMessage(action.payload.msg); 
        })
        .addCase(userAction.loginUserAction.rejected, (state, action) => {
            state.loading = false;
            state.user = {} as IUser;
            state.token = "";
            state.isAuthenticated = false;
            TokenUtil.deleteTokenFromSession();
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.payload;
                ToastUtil.displayErrorMessage("Login is Failed")
            }
        })

        // Get User Info
        builder.addCase(userAction.getUserInfoAction.pending, (state, action) => {
            state.loading = true;
            state.errorMessage = {} as SerializedError;
        })
        .addCase(userAction.getUserInfoAction.fulfilled, (state, action) => {
            state.loading = false;
            state.errorMessage = {} as SerializedError;
            state.user = action.payload.data;
            state.isAuthenticated = true;
        })
        .addCase(userAction.getUserInfoAction.rejected, (state, action) => {
            state.loading = false;
            state.user = {} as IUser;
            state.token = "";
            state.isAuthenticated = false;
            if (isRejectedWithValue(action)) {
                state.errorMessage = action.payload;
                ToastUtil.displayErrorMessage("Get User Info Failed");
            }
        })
    }
});

export const {logOffAction} = userSlice.actions;