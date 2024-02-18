import React from "react";
import { Link } from "react-router-dom";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faMagnifyingGlass, faPlusCircle } from "@fortawesome/free-solid-svg-icons";

interface IProps {
    searchQuery: string;
    filterTheContacts: (event:React.ChangeEvent<HTMLInputElement>) => void;
}

const SearchContact:React.FC<IProps> = (props) => {
    return (
        <>
        <div className="container mx-auto mt-3 p-4">
            <div className="grid grid-cols-12">
                <div className="col-span-12 sm:col-span-10 md:col-span-8 lg:col-span-6">
                    <form onSubmit={(e) => e.preventDefault()}>
                        <div className="flex gap-4">
                        <input value={props.searchQuery} onChange={e => props.filterTheContacts(e)} type="text" className="px-3" placeholder="Search Here" />
                        <button type="submit" className="bg-black py-2 px-3 text-white rounded-lg"><FontAwesomeIcon icon={faMagnifyingGlass} /> Search</button>
                        <Link to={"/contacts/add"} className="bg-green-600 py-2 px-3 text-white rounded-lg"><FontAwesomeIcon icon={faPlusCircle} /> Add New</Link>
                        </div>
                    </form>
                </div>
            </div>
        </div>
        </>
    );
}

export default SearchContact;