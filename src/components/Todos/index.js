import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTask } from "./../../reduce/task";
const Todos = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const token = state.tokenReducer.token;
  const id = state.tokenReducer.id;
  console.log(state.task.tasks);
  useEffect(() => {
    getTodos();
  }, []);
  const getTodos = async () => {
    try {
      //   let id = localStorage.getItem("id");
      //   const token = localStorage.getItem("user");
      //   console.log(token);
      const result = await axios.get(`http://localhost:4000/getTodo/${id}`, {
        headers: { Authorization: `Brearer ${token}` },
      });
      console.log(result.data);
      dispatch(getTask(result.data));
      if (result.data === "no todos for this user") {
        dispatch(getTask([]));
      } else {
        const data = {
          tasks: result.data,
        };
        dispatch(getTask(data));
      }
    } catch (err) {
      console.log(err);
    }
  };

  const deleteTodo = () => {};
  const createTask = (id) => {};
  const update = (id) => {};

  return (
    <div>
      <form onSubmit={createTask}>
        <input type="text" name="task" />
        <button>add task</button>
      </form>
      {state.task.tasks
        ? state.task.tasks.map((item) => (
            <div key={item._id}>
              <p>{item.name}</p>
              <button
                onClick={() => {
                  deleteTodo(item._id);
                }}
              >
                delete
              </button>
              <button
                onClick={() => {
                  update(item._id);
                }}
              >
                update
              </button>
            </div>
          ))
        : "no todos for this user"}
    </div>
  );
};

export default Todos;
