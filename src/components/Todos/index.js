import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTask } from "./../../reduce/task";
import Logout from "./../Logout";
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
      const result = await axios.get(
        `${process.env.REACT_APP_BASE_URL}/getTodo/${id}`,
        {
          headers: { Authorization: `Brearer ${token}` },
        }
      );
      console.log(result.data);
      //   dispatch(getTask(result.data));
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
  const createTask = async (e) => {
    try {
      e.preventDefault();
      //   const token = localStorage.getItem("user");
      //   let id = localStorage.getItem("id"); //userId
      // const todoId="61acc1437063cd2253f029d4";
      console.log(e.target.task.value);
      const name = e.target.task.value;
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/createTodo`,
        {
          name,
          id,
        },
        {
          headers: { Authorization: `Brearer ${token}` },
        }
      );
      console.log(result);
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };
  const deleteTodo = async (todoId) => {
    // let id = localStorage.getItem("id");
    // console.log(itemId);
    // const todoId = itemId;
    // const token = localStorage.getItem("user");
    const result = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/deleteTodo/${id}/${todoId}`,
      {
        headers: { Authorization: `Brearer ${token}` },
      }
    );
    console.log(result.data);
    getTodos();
  };
  const update = async (todoId) => {
    try {
      const name = prompt("enter your todo");
      console.log(name.value);
      console.log(todoId);
      //   const token = localStorage.getItem("user");
      //   let id = localStorage.getItem("id"); //userId
      // const todoId="61acc1437063cd2253f029d4";
      // console.log(e.target.task.value);
      // const name = e.target.task.value;
      const result = await axios.post(
        `${process.env.REACT_APP_BASE_URL}/updateById`,
        {
          name,
          id,
          todoId,
        },
        {
          headers: { Authorization: `Brearer ${token}` },
        }
      );
      console.log(result);
      getTodos();
    } catch (err) {
      console.log(err);
    }
  };

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
      <Logout />
    </div>
  );
};

export default Todos;
