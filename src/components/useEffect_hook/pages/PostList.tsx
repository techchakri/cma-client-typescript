import React, { useEffect, useState } from "react";
import { Service } from "../services/Service";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { IPost } from "../models/IPost";
import PostCard from "./PostCard";

interface IState {
  loading: boolean;
  errMsg: string;
  posts: IPost[];
}

const PostList: React.FC = () => {
  const [state, setState] = useState<IState>({
    loading: false,
    posts: [] as IPost[],
    errMsg: "",
  });

  /**
   * when the component is fully rendered on DOM
   */
  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));
    setState((prevState) => ({ ...prevState, errMsg: "" }));
    setTimeout(() => {
      Service.getAllPosts()
        .then((response) => {
            setState((prevState) => ({ ...prevState, posts: response.data }));
            setState((prevState) => ({ ...prevState, loading: false }));
        })
        .catch((error) => {
          setState((prevState) => ({ ...prevState, errMsg: error.message }));
          setState((prevState) => ({ ...prevState, loading: false }));
          console.log(error);
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
            <h2 className="font-medium text-2xl">Post List</h2>
            <p className=" text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis reprehenderit quidem et dolorum deserunt ipsum. Cum eos
              voluptatem, architecto deleniti alias nulla asperiores ad dicta
              expedita saepe necessitatibus. Ex, nihil illo, temporibus
              recusandae perspiciatis fugit autem incidunt aliquid magnam
              voluptas nemo, deleniti quasi eum exercitationem!
            </p>
          </div>
          {state.posts && (
            <div className="container mx-auto mt-6 py-3 px-5 shadow-xl grid grid-cols-3 gap-2">
              {state.posts.map((post) => (
                <PostCard key={post.id} post={post} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default PostList;
