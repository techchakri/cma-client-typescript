import React, { useEffect, useState } from "react";
import { Service } from "../services/Service";
import TodoCard from "./TodoCard";
import Spinner from "./Spinner";
import ErrorMessage from "./ErrorMessage";
import { ITodo } from "../models/ITodo";

interface IState {
  loading: boolean;
  errMsg: string;
  todos: ITodo[];
}

const TodoList: React.FC = () => {
  const [state, setState] = useState<IState>({
    loading: false,
    todos: [] as ITodo[],
    errMsg: "",
  });

  /**
   * when the component is fully rendered on DOM
   */
  useEffect(() => {
    setState((prevState) => ({ ...prevState, loading: true }));

    setTimeout(() => {
      Service.getAllTodos()
        .then((response) => {
          setState((prevState) => ({ ...prevState, todos: response.data }));
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
            <h2 className="font-medium text-2xl">Todo List</h2>
            <p className=" text-base">
              Lorem ipsum dolor sit amet consectetur adipisicing elit.
              Reiciendis reprehenderit quidem et dolorum deserunt ipsum. Cum eos
              voluptatem, architecto deleniti alias nulla asperiores ad dicta
              expedita saepe necessitatibus. Ex, nihil illo, temporibus
              recusandae perspiciatis fugit autem incidunt aliquid magnam
              voluptas nemo, deleniti quasi eum exercitationem!
            </p>
          </div>
          {state.todos && (
            <div className="container mx-auto mt-6 py-3 px-5 shadow-xl grid grid-cols-3 gap-2">
              {state.todos.map((todo) => (
                <TodoCard key={todo.id} todo={todo} />
              ))}
            </div>
          )}
        </>
      )}
    </>
  );
};

export default TodoList;
