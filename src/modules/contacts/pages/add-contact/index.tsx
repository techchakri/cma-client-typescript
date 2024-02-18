import React, { useEffect, useState } from "react";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import { Link, useNavigate } from "react-router-dom";
import { IContact } from "../../models/IContact";
import { AppDispatch, RootState, useAppDispatch } from "../../../../utils/cma-redux/store";
import * as contactReducer from "../../../../utils/cma-redux/contacts/contacts.reducer";
import * as contactActions from "../../../../utils/cma-redux/contacts/contacts.actions";
import { useSelector } from "react-redux";
import Spinner from "../../../ui/components/Spinner";

const AddContact: React.FC = () => {
  const dispatch:AppDispatch = useAppDispatch();
    const navigate = useNavigate();

  const [contact, setContact] = useState<IContact>({
    name: "",
    imageUrl: "",
    email: "",
    mobile: "",
    company: "",
    title: "",
    groupId: ""
  } as IContact);

  // get data from Redux Store
  const contactState:contactReducer.InitialState = useSelector((store:RootState) => {
    return store[contactReducer.contactFeatureKey];
  })

  const updateInput = (event:React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    setContact((prevState) => ({
        ...prevState,
        [event.target.name]:event.target.value
    }))
  }

  useEffect(() => {
    getAllGroupsFromServer();
  }, []);

  const getAllGroupsFromServer = () => {
    dispatch(contactActions.getAllGroupsAction());
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    console.log(contact)
    dispatch(contactActions.createContactAction({contact:contact}))
    .then((response:any) => {
      if (response && !response.error) {
        navigate("/contacts/admin")
      }
    });
  }

  const {loading, groups} = contactState;

  if (loading) {
    return <Spinner />;
  }

  return (
    <>
      <LayoutHeading heading="Create Contact" color="text-green-600" />
      {/* <pre>{JSON.stringify(contact)}</pre> */}
      {groups.length > 0 && (
        <div className="container mx-auto mt-4">
          <div className="grid grid-cols-12 gap-6">
            <div className="col-span-4">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                  <input
                    type="text"
                    placeholder="Name"
                    className="w-full py-1 px-2"
                    value={contact.name}
                    onChange={(e) => updateInput(e)}
                    name="name"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Photo Url"
                    className="w-full py-1 px-2"
                    value={contact.imageUrl}
                    onChange={(e) => updateInput(e)}
                    name="imageUrl"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Mobile"
                    className="w-full py-1 px-2"
                    value={contact.mobile}
                    onChange={(e) => updateInput(e)}
                    name="mobile"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Email"
                    className="w-full py-1 px-2"
                    value={contact.email}
                    onChange={(e) => updateInput(e)}
                    name="email"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Company"
                    className="w-full py-1 px-2"
                    value={contact.company}
                    onChange={(e) => updateInput(e)}
                    name="company"
                  />
                </div>
                <div>
                  <input
                    type="text"
                    placeholder="Title"
                    className="w-full py-1 px-2"
                    value={contact.title}
                    onChange={(e) => updateInput(e)}
                    name="title"
                  />
                </div>
                <div>
                  <select 
                  name="groupId" 
                  value={contact.groupId}  
                  onChange={(e) => updateInput(e)}
                  className="w-full py-1 px-2">
                    <option value="">Select a Group</option>
                    {groups.map((group) => {
                      return (
                        <option key={group._id} value={group._id}>
                          {group.name}
                        </option>
                      );
                    })}
                  </select>
                </div>
                <div>
                  <button
                    type="submit"
                    className="bg-green-700 text-white py-1 px-2 rounded-md"
                  >
                    Create
                  </button>
                  <Link
                    to={"/contacts/admin"}
                    className="ml-2 bg-black text-white py-1 px-2 rounded-md"
                  >
                    Cancel
                  </Link>
                </div>
              </form>
            </div>
            {
              contact.imageUrl &&             <div className="col-span-6">
              <img src={contact.imageUrl} alt="Image Loading..." className="w-2/3 h-80" />
          </div>
            }
          </div>
        </div>
      )}
    </>
  );
};

export default AddContact;
