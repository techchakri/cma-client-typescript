import { createAsyncThunk } from "@reduxjs/toolkit";
import { IContact } from "../../../modules/contacts/models/IContact";
import { ContactService } from "../../../modules/contacts/services/ContactService";
import { IGroup } from "../../../modules/contacts/models/IGroup";
import { AuthUtil } from "../../auth-utils/AuthUtil";

export const getAllContactsAction: any = createAsyncThunk("contact/getAllContactsAction", async (payload: {}, {rejectWithValue}):Promise<IContact[] | any> => {
    try {
        if (AuthUtil.isSetTokenToHeader()) {
        const response = await ContactService.getAllContacts();
        return response.data;
    }
    } catch(error:any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error)
    }
})

export const getContactAction: any = createAsyncThunk("contact/getContactAction", async (payload: {contactId:string}, {rejectWithValue}): Promise<IContact | any> => {
    try {
        if (AuthUtil.isSetTokenToHeader()) {
        const {contactId} = payload;
        const response = await ContactService.getContact(contactId);
        return response.data
        }
    } catch (error:any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error)
    }
})

export const createContactAction: any = createAsyncThunk("contact/createContactAction", async (payload: {contact:IContact},{rejectWithValue}): Promise<IContact|any> => {
    try {
        if (AuthUtil.isSetTokenToHeader()) {
        const {contact} = payload;
        const response = await ContactService.createContact(contact);
        return response.data;
        }
    } catch (error:any) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error);
    }
})

export const updateContactAction: any = createAsyncThunk("contact/updateContactAction", async (payload: {contact:IContact, contactId: string}, {rejectWithValue}):Promise<IContact|any> => {
    try {
        if (AuthUtil.isSetTokenToHeader()) {
        const {contact, contactId} = payload;
        const response = await ContactService.updateContact(contact, contactId);
        return response.data; 
        }
    } catch (error:any) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error);
    }
})

export const deleteContactAction: any = createAsyncThunk("contact/deleteContactAction", async (payload: {contactId: string}, {rejectWithValue}):Promise<{}|any> => {
    try {
        if (AuthUtil.isSetTokenToHeader()) {
        const {contactId} = payload;
        const response = await ContactService.deleteContact(contactId);
        return response.data;
        }
    } catch (error:any) {
        if (!error.response) {
            throw error;
        }
        return rejectWithValue(error);
    }
})


export const getAllGroupsAction: any = createAsyncThunk("contact/getAllGroupsAction", async (payload: {}, {rejectWithValue}):Promise<IGroup[] | any> => {
    try {
        const response = await ContactService.getAllGroups();
        return response.data;
    } catch(error:any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error)
    }
})

export const getGroupAction: any = createAsyncThunk("contact/getGroupAction", async (payload: {contact:IContact}, {rejectWithValue}): Promise<IGroup | any> => {
    try {
        const {contact} = payload;
        const response = await ContactService.getGroup(contact);
        return response.data
    } catch (error:any) {
        if (!error.response) {
            throw error
        }
        return rejectWithValue(error)
    }
})
