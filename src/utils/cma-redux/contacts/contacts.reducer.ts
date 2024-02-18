import {
  SerializedError,
  createSlice,
  isRejectedWithValue,
} from "@reduxjs/toolkit";
import { IContact } from "../../../modules/contacts/models/IContact";
import { IGroup } from "../../../modules/contacts/models/IGroup";
import * as contactActions from "./contacts.actions";
import { ToastUtil } from "../../toast-util/ToastUtil";

export const contactFeatureKey = "contactFeature";

export interface InitialState {
  loading: boolean;
  errorMessage: SerializedError;
  contacts: IContact[];
  contact: IContact;
  groups: IGroup[];
  group: IGroup;
}

const initialState: InitialState = {
  loading: false,
  errorMessage: {} as SerializedError,
  contacts: [] as IContact[],
  contact: {} as IContact,
  groups: [] as IGroup[],
  group: {} as IGroup,
};

export const contactSlice = createSlice({
  name: "contactSlice",
  initialState: initialState,
  reducers: {},
  extraReducers: (builder) => {
    /**
     * Get all contacts
     */
    builder
      .addCase(contactActions.getAllContactsAction.pending, (state, action) => {
        state.errorMessage = {} as SerializedError;
        state.loading = true;
      })
      .addCase(
        contactActions.getAllContactsAction.fulfilled,
        (state, action) => {
          state.errorMessage = {} as SerializedError;
          state.loading = false;
          state.contacts = action.payload;
        }
      )
      .addCase(
        contactActions.getAllContactsAction.rejected,
        (state, action) => {
          state.loading = false;
          state.contacts = [] as IContact[];
          if (isRejectedWithValue(action)) {
            state.errorMessage = action.payload;
            ToastUtil.displayErrorMessage("Get All Contacts Failed")
          }
        }
      );

    /**
     * Get contact
     */
    builder
      .addCase(contactActions.getContactAction.pending, (state, action) => {
        state.errorMessage = {} as SerializedError;
        state.loading = true;
      })
      .addCase(contactActions.getContactAction.fulfilled, (state, action) => {
        state.errorMessage = {} as SerializedError;
        state.loading = false;
        state.contact = action.payload;
      })
      .addCase(contactActions.getContactAction.rejected, (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("Get Contact Failed")
        }
      });

    /**
     * Create contact
     */
    builder
      .addCase(contactActions.createContactAction.pending, (state, action) => {
        state.errorMessage = {} as SerializedError;
        state.loading = true;
      })
      .addCase(
        contactActions.createContactAction.fulfilled,
        (state, action) => {
          state.errorMessage = {} as SerializedError;
          state.loading = false;
          state.contact = action.payload;
          ToastUtil.displaySuccessMessage("Contact is Created Successfully")
        }
      )
      .addCase(contactActions.createContactAction.rejected, (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("Create Contact is Failed")
        }
      });

    /**
     * Update contact
     */

    builder
      .addCase(contactActions.updateContactAction.pending, (state, action) => {
        state.errorMessage = {} as SerializedError;
        state.loading = true;
      })
      .addCase(
        contactActions.updateContactAction.fulfilled,
        (state, action) => {
          state.errorMessage = {} as SerializedError;
          state.loading = false;
          state.contact = action.payload;
          ToastUtil.displaySuccessMessage("Update Contact is Successfully")
        }
      )
      .addCase(contactActions.updateContactAction.rejected, (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("Update Contact is Failed")
        }
      });

    /**
     * Delete contact
     */

    builder
      .addCase(contactActions.deleteContactAction.pending, (state, action) => {
        state.errorMessage = {} as SerializedError;
        state.loading = true;
      })
      .addCase(
        contactActions.deleteContactAction.fulfilled,
        (state, action) => {
          state.errorMessage = {} as SerializedError;
          state.loading = false;
          ToastUtil.displayInfoMessage("Contact is Deleted Successfully")
        }
      )
      .addCase(contactActions.deleteContactAction.rejected, (state, action) => {
        state.loading = false;
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("Contact Delete is Failed")
        }
      });

    /**
     * Get all groups
     */
    builder
    .addCase(contactActions.getAllGroupsAction.pending, (state, action) => {
      state.errorMessage = {} as SerializedError;
      state.loading = true;
    })
    .addCase(
      contactActions.getAllGroupsAction.fulfilled,
      (state, action) => {
        state.errorMessage = {} as SerializedError;
        state.loading = false;
        state.groups = action.payload;
      }
    )
    .addCase(
      contactActions.getAllGroupsAction.rejected,
      (state, action) => {
        state.loading = false;
        state.groups = [] as IGroup[];
        if (isRejectedWithValue(action)) {
          state.errorMessage = action.payload;
          ToastUtil.displayErrorMessage("Get Groups are Failed")
        }
      }
    );

  /**
   * Get group
   */
  builder
    .addCase(contactActions.getGroupAction.pending, (state, action) => {
      state.errorMessage = {} as SerializedError;
      state.loading = true;
    })
    .addCase(contactActions.getGroupAction.fulfilled, (state, action) => {
      state.errorMessage = {} as SerializedError;
      state.loading = false;
      state.group = action.payload;
    })
    .addCase(contactActions.getGroupAction.rejected, (state, action) => {
      state.loading = false;
      if (isRejectedWithValue(action)) {
        state.errorMessage = action.payload;
        ToastUtil.displayErrorMessage("Get Group is Failed")
      }
    });
  },
});
