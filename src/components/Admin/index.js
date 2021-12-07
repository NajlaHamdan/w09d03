import React from "react";
import axios from "axios";
import { useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import { getTask } from "./../../reduce/task";
const Admin = () => {
    const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const token = state.tokenReducer.token;
  const id = state.tokenReducer.id;
  console.log(state.task.tasks);
    useEffect(() => {
        getTodos();
    }, [])
    const getTodos = async () => {
        try {
        //   let id = localStorage.getItem("id");
        //   const token = localStorage.getItem("user");
        //   console.log(token);
          const result = await axios.get(`${process.env.REACT_APP_BASE_URL}/getAllTodos`,{
            headers: { Authorization: `Bearer ${token}` },
          });
          console.log(result.data);
          if (result.data === "no todos") {
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
  const deleteTodoByAdmin = async (id) => {
    // let id = localStorage.getItem("id");
    // console.log(itemId);
    // const todoId = itemId;
    // const token = localStorage.getItem("user");
    const result = await axios.delete(
      `${process.env.REACT_APP_BASE_URL}/deleteTodoByAdmin`,
      { id },
      {
        headers: { Authorization: `Bearer ${token}` },
      }
    );
    console.log(result.data);
    getTodos();
  };
  return (<div>
    <form >
      <input type="text" name="task" />
      <button>add task</button>
    </form>
    {state.task.tasks
      ? state.task.tasks.map((item) => (
          <div key={item._id}>
            <p>{item.name}</p>
            <button
              onClick={() => {
                deleteTodoByAdmin(item._id);
              }}
            >
              delete
            </button>
            {/* <button
              onClick={() => {
                update(item._id);
              }}
            >
              update
            </button> */}
          </div>
        ))
      : "no todos for this user"}
  </div>);
};

export default Admin;
