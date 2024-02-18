import React from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faEye,
  faPenToSquare,
  faTrashAlt,
} from "@fortawesome/free-regular-svg-icons";
import { Link } from "react-router-dom";
import { IContact } from "../../models/IContact";

interface IProps {
    contact: IContact,
    deleteContactFromServer: (contactId:string) => void
}

const AdminCard:React.FC<IProps> = (props) => {
    const {imageUrl, name, email, mobile, _id} = props.contact;

    const clickDelete = (contactId:string) => {
      props.deleteContactFromServer(contactId);
    }

    return (
        <>
        <div id="card" className="grid grid-cols-12 gap-3 bg-gray-100 py-3 px-2 rounded items-center">
              <div className="col-span-3">
                <img src={imageUrl} alt="" className="w-full h-36 rounded-[50%] shadow-lg object-cover" />
              </div>
              <div className="col-span-8">
                <div className="border-2 bg-white py-1 rounded-md">
                  <div className="py-2 px-4 border-b-2">Name : <span className="font-semibold">{name}</span></div>
                  <div className="py-2 px-4 border-b-2">Mobile : <span className="font-semibold">{mobile}</span></div>
                  <div className="py-2 px-4">Email : <span className="font-semibold">{email}</span></div>
                </div>
              </div>
              <div className="col-span-1">
                <div className=" flex flex-col gap-1 justify-center">
                  <Link to={`/contacts/view/${_id}`}>
                    <FontAwesomeIcon
                      icon={faEye}
                      className="bg-yellow-500 rounded-md p-3"
                    />
                  </Link>
                  <Link to={`/contacts/edit/${_id}`}>
                    <FontAwesomeIcon
                      icon={faPenToSquare}
                      className="bg-blue-500 rounded-md text-white p-3"
                    />
                  </Link>
                  <button onClick={() => clickDelete(_id)}>
                    <FontAwesomeIcon
                      icon={faTrashAlt}
                      className="bg-red-500 rounded-md text-white p-3"
                    />
                  </button>
                </div>
              </div>
            </div>
        </>
    );
}

export default AdminCard;