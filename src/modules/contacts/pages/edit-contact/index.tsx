import React, { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import LayoutHeading from "../../../layout/components/LayoutHeading";
import { IContact } from "../../models/IContact";
import * as contactReducer from "../../../../utils/cma-redux/contacts/contacts.reducer";
import * as contactActions from "../../../../utils/cma-redux/contacts/contacts.actions";
import { AppDispatch, RootState, useAppDispatch } from "../../../../utils/cma-redux/store";
import { useSelector } from "react-redux";


const EditContact: React.FC = () => {
  const dispatch:AppDispatch = useAppDispatch();
  const { contactId } = useParams();
  const navigate = useNavigate();

  // get data from Redux Store
  const contactState:contactReducer.InitialState = useSelector((store:RootState) => {
    return store[contactReducer.contactFeatureKey];
  })

  const {loading, contact:contactRedux, groups} = contactState;

  const [contact,setContact] = useState<IContact>({
      name: "",
      imageUrl: "",
      email: "",
      mobile: "",
      company: "",
      title: "",
      groupId: "",
      _id:""
  } as IContact);

  useEffect(() => {
    dispatch(contactActions.getAllGroupsAction())
  }, []);

  useEffect(() => {
      if (contactId) {
        getContactFromServer(contactId);
    }
  }, [contactId]);

  useEffect(() => {
    if (contactRedux && Object.keys(contactRedux).length > 0 ) {
      setContact({
        name: contactRedux.name,
      imageUrl: contactRedux.imageUrl,
      email: contactRedux.email,
      mobile: contactRedux.mobile,
      company: contactRedux.company,
      title: contactRedux.title,
      groupId: contactRedux.groupId,
      _id: contactRedux._id
      })
    }
  }, [contactRedux])


  const getContactFromServer = (contactId:string) => {
      dispatch(contactActions.getContactAction({contactId}));
  };

  const updateInput = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement | any>) => {
    setContact((prevState) => ({
        ...prevState,
        [event.target.name]: event.target.value
        }))
  };

  const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    if (contactId) {
      dispatch(contactActions.updateContactAction({contact,contactId}))
      .then((response:any) =>{
        if (response && !response.error){
          navigate("/contacts/admin");
        }
      })
    }
    // if (contactId) {
    //     ContactService.updateContact(state.contact, contactId)
    //     .then((response) => {
    //         if (response.data) {
    //             navigate("/contacts/admin")
    //         }
    //     })
    //     .catch((error) => {
    //         console.log(error);
    //     })
    // }
  }

  return (
    <>
      <LayoutHeading heading="Edit Contact" color="text-blue-600" />
      {!loading && groups.length > 0 && (
        <div className="container mx-auto mt-4">
          <div className="grid grid-cols-12 gap-4">
            <div className="col-span-4">
              <form onSubmit={handleSubmit} className="flex flex-col gap-3">
                <div>
                  <input
                  required
                  name="name"
                  value={contact.name}
                    onChange={updateInput}
                    type="text"
                    placeholder="Name"
                    className="w-full py-1 px-2"
                  />
                </div>
                <div>
                  <input
                  required
                  name="imageUrl"
                  value={contact.imageUrl}
                  onChange={updateInput}
                    type="text"
                    placeholder="Photo Url"
                    className="w-full py-1 px-2"
                  />
                </div>
                <div>
                  <input
                  required
                  name="mobile"
                  value={contact.mobile}
                  onChange={updateInput}
                    type="text"
                    placeholder="Mobile"
                    className="w-full py-1 px-2"
                  />
                </div>
                <div>
                  <input
                  required
                  name="email"
                  value={contact.email}
                  onChange={updateInput}
                    type="text"
                    placeholder="Email"
                    className="w-full py-1 px-2"
                  />
                </div>
                <div>
                  <input
                  required
                  name="company"
                  value={contact.company}
                  onChange={updateInput}
                    type="text"
                    placeholder="Company"
                    className="w-full py-1 px-2"
                  />
                </div>
                <div>
                  <input
                  required
                  name="title"
                  value={contact.title}
                  onChange={updateInput}
                    type="text"
                    placeholder="Title"
                    className="w-full py-1 px-2"
                  />
                </div>
                <div>
                  <select 
                  required
                  name="groupId"
                  value={contact.groupId}
                  onChange={updateInput} 
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
                    className="bg-blue-700 text-white py-1 px-2 rounded-md"
                  >
                    Update
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
            <div className="col-span-6">
                <img src={contact.imageUrl} alt="Image Loading..." className="w-2/3 h-80" />
            </div>
          </div>
        </div>
      )}
    </>
  );
};

export default EditContact;
