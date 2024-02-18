import React, { useEffect, useState } from "react";
import { Service } from "../services/Service";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { IComment } from "../models/IComment";
import CommentCard from "./CommentCard";

interface IState {
  loading: boolean;
  errMsg: string;
  comments: IComment[];
}

const CommentList: React.FC = () => {
  const [state, setState] = useState<IState>({
    loading: false,
    comments: [] as IComment[],
    errMsg: "",
  });

  /**
   * when the component is fully rendered on DOM
   */
  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));

    setTimeout(() => {
      Service.getAllComments()
        .then((response) => {
          setState((prevState) => ({ ...prevState, comments: response.data }));
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
            <h2 className="font-medium text-2xl">Comment List</h2>
            <p className=" text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis reprehenderit quidem et dolorum deserunt ipsum. Cum eos
              voluptatem, architecto deleniti alias nulla asperiores ad dicta
              expedita saepe necessitatibus. Ex, nihil illo, temporibus
              recusandae perspiciatis fugit autem incidunt aliquid magnam
              voluptas nemo, deleniti quasi eum exercitationem!
            </p>
          </div>
          {state.comments && (
            <div className="container mx-auto mt-6 py-3 px-5 shadow-xl grid grid-cols-3 gap-2">
              {state.comments.map((comment) => (
                <CommentCard key={comment.id} comment={comment} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default CommentList;
