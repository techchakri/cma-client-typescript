import React, { useState, useEffect, ChangeEvent } from "react";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import SearchContact from "../../components/search-contact";
import { IContact } from "../../models/IContact";
import AdminCard from "../../components/admin-card";
import * as contactActions from "../../../../utils/cma-redux/contacts/contacts.actions";
import * as contactReducer from "../../../../utils/cma-redux/contacts/contacts.reducer";
import { AppDispatch, RootState, useAppDispatch } from "../../../../utils/cma-redux/store";
import { useSelector } from "react-redux";
import Spinner from "../../../ui/components/Spinner";

interface IState {
  loading: boolean;
  contacts: IContact[];
  filteredContacts: IContact[];
  errorMessage: string;
}

const AdminContact: React.FC = () => {
  const dispatch:AppDispatch = useAppDispatch();
  const [searchQuery, setSearchQuery] = useState<string>("");

  // get data from Redux Store
  const contactState:contactReducer.InitialState = useSelector((store:RootState) => {
    return store[contactReducer.contactFeatureKey];
  })

  const {loading, contacts, errorMessage} = contactState;

  const [filteredContacts, setFilteredContacts] = useState<IContact[]>(contacts)


  const filterTheContacts = (event:ChangeEvent<HTMLInputElement>):void => {
    // keep it alone for sometime
    setSearchQuery(event.target.value);
    const searchFilteredContacts:IContact[] = contacts.filter((contact) => contact.name.toLowerCase().trim().includes(event.target.value.toLowerCase().trim()));
    setFilteredContacts(searchFilteredContacts);
  }

  useEffect(() => {
    getAllContactsFromServer();
  }, []);

  const deleteContactFromServer = (contactId:string): void => {
    dispatch(contactActions.deleteContactAction({contactId}))
    .then((response:any) => {
      if (response && !response.error) {
        getAllContactsFromServer();
      }
    })
  }

  const getAllContactsFromServer = (): void => {
    // dispatch an action
    dispatch(contactActions.getAllContactsAction())
  };

  if (loading) {
    return <Spinner />;
  }

  if (Object.keys(errorMessage).length > 0) {
    return <h1>Something went wrong!!</h1>;
  }


  return (
    <>
      <LayoutHeading heading={"Contact Manager"} color={"text-red-500"} />

      <SearchContact searchQuery={searchQuery} filterTheContacts={filterTheContacts} />
          
          {
            contacts.length > 0 ? (
              <div className="container mx-auto mt-3 p-4">
              <div className="grid grid-cols-12 gap-2">
                {contacts.map((contact) => (
                  <div key={contact._id} className="col-span-12 md:col-span-10 lg:col-span-8 xl:col-span-6">
                    <AdminCard deleteContactFromServer={deleteContactFromServer} contact={contact} />
                  </div>
                ))}
              </div>
            </div>
            ): (
              <div className="text-center text-4xl text-red-400">No Contacts Found</div>
            )
          }
    </>
  );
};

export default AdminContact;
