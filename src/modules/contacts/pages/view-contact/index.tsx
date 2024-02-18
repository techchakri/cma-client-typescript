import React, { useEffect} from "react";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import { Link, useParams } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCircleArrowLeft  } from "@fortawesome/free-solid-svg-icons";
import { IContact } from "../../models/IContact";
import * as contactReducer from "../../../../utils/cma-redux/contacts/contacts.reducer"
import * as contactActions from "../../../../utils/cma-redux/contacts/contacts.actions"
import { AppDispatch, RootState, useAppDispatch } from "../../../../utils/cma-redux/store";
import { useSelector } from "react-redux";
import Spinner from "../../../ui/components/Spinner";

interface IState {
    loading: boolean,
    contact: IContact;
    errorMessage: string;
}

const ViewContact:React.FC = () => {
    const dispatch:AppDispatch = useAppDispatch();
    const {contactId} = useParams(); // get the contact id from URL

    // get data from Redux Store
    const contactState:contactReducer.InitialState = useSelector((store:RootState) => {
        return store[contactReducer.contactFeatureKey];
    });


    const {loading, contact, group, errorMessage} = contactState; 

    useEffect(() => {
        if (contactId) {
            getContactInfoFromServer(contactId);
        }
    }, [contactId]);

    const getContactInfoFromServer = (contactId:string) => {
        dispatch(contactActions.getContactAction({contactId:contactId}))
        .then((response:any) => {
            if (response && !response.error && Object.keys(contact).length > 0) {
                    dispatch(contactActions.getGroupAction({contact:contact}))
            }
        })
    };


    if (loading) {
        return <Spinner />
    }

    if (Object.keys(errorMessage).length > 0) {
        return <h2>Something went wrong!!!</h2>
    }

    return (
        <>
        <LayoutHeading heading="View Contact" color="text-yellow-500" />
        {contact && Object.keys(contact).length > 0 && group && Object.keys(group).length > 0 && (
        <section className="container mx-auto mt-4">
            <div className="grid grid-cols-12">
                <div className="col-span-3">
                    <img src={contact.imageUrl} className="w-full h-64" alt="" />
                </div>
                <div className="col-span-6">
                    <div className="border-2 bg-white rounded-md py-1">
                        <div className="border-b-2 py-2 px-3">
                        Name: <span className="font-semibold">{contact.name}</span>
                        </div>
                        <div className="border-b-2 py-2 px-3">
                        Mobile: <span className="font-semibold">{contact.mobile}</span>
                        </div>
                        <div className="border-b-2 py-2 px-3">
                        Email: <span className="font-semibold">{contact.email}</span>
                        </div>
                        <div className="border-b-2 py-2 px-3">
                        Company: <span className="font-semibold">{contact.company}</span>
                        </div>
                        <div className="border-b-2 py-2 px-3">
                        Title: <span className="font-semibold">{contact.title}</span>
                        </div>
                        <div className="py-2 px-3">
                        Group: <span className="font-semibold">{group.name}</span>
                        </div>
                    </div>
                </div>
            </div>
            
        </section>
)}
<div className="container mx-auto mt-4">
<Link to={"/contacts/admin"} className="bg-yellow-500 py-2 px-4 rounded-md"><FontAwesomeIcon icon={faCircleArrowLeft} /> Back</Link>
</div>

        </>
    );
}

export default ViewContact;