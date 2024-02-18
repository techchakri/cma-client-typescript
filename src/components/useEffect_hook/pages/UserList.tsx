import React, { useEffect, useState } from "react";
import { IUser } from "../models/IUser";
import { Service } from "../services/Service";
import UserCard from "./UserCard";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";

interface IState {
  loading: boolean;
  errMsg: string;
  users: IUser[];
}

const UserList: React.FC = () => {
  const [state, setState] = useState<IState>({
    loading: false,
    users: [] as IUser[],
    errMsg: "",
  });

  //   const [users, setUsers] = useState<IUser[]>([] as IUser[]);
  //   const [loading, setLoading] = useState<boolean>(false);
  //   const [errMsg, setErrMsg] = useState<string>("");

  /**
   * when the component is fully rendered on DOM
   */
  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));

    setTimeout(() => {
      Service.getAllUsers()
        .then((response) => {
          setState((prevState) => ({ ...prevState, users: response.data }));
          setState((prevState) => ({ ...prevState, loading: false }));
        })
        .catch((error) => {
          setState((prevState) => ({ ...prevState, errMsg: error.message }));
          setState((prevState) => ({ ...prevState, loading: false }));
        });
    }, 2000);
  }, []);

  if (state.loading) {
    return <Spinner />;
  }

  return (
    <>
      {state.errMsg.trim() ? (
        <>
          <ErrorMessage message={state.errMsg} />
        </>
      ) : (
        <>
          <div className="container mx-auto py-3 px-5 shadow-xl">
            <h2 className="font-medium text-2xl">User List</h2>
            <p className=" text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis reprehenderit quidem et dolorum deserunt ipsum. Cum eos
              voluptatem, architecto deleniti alias nulla asperiores ad dicta
              expedita saepe necessitatibus. Ex, nihil illo, temporibus
              recusandae perspiciatis fugit autem incidunt aliquid magnam
              voluptas nemo, deleniti quasi eum exercitationem!
            </p>
          </div>
          {state.users && (
            <div className="container mx-auto mt-6 py-3 px-5 shadow-xl grid grid-cols-3 gap-2">
              {state.users.map((user) => (
                <UserCard key={user.id} user={user} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default UserList;
