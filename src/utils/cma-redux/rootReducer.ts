import { combineReducers } from "@reduxjs/toolkit";
import * as contactReducer from "./contacts/contacts.reducer";
import * as userReducer from "./users/users.reducer";

const rootReducer: any = combineReducers({
    [contactReducer.contactFeatureKey] : contactReducer.contactSlice.reducer,
    [userReducer.userFeatureKey] : userReducer.userSlice.reducer
})

export default rootReducer;