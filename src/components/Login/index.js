import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";
import { useNavigate } from "react-router";
import { useSelector, useDispatch } from "react-redux";
import { signIn } from "./../../reduce/login";

const Login = () => {
  const state = useSelector((state) => {
    return state;
  });
  console.log(state);
  const dispatch = useDispatch();
  const [token, setToken] = useState("");
  const [id, setId] = useState("");
  const navigate = useNavigate();
  useEffect(() => {
    const token = localStorage.getItem("user");
    const id = localStorage.getItem("id");
    // console.log(token);
    setToken(token);
    setId(id);
  }, []);

  console.log(state);
  const logIn = (e) => {
    try {
      e.preventDefault();
      axios
        .post(`${process.env.REACT_APP_BASE_URL}/login`, {
          email: e.target.email.value,
          password: e.target.password.value,
        })
        .then((result) => {
          // const token = result.data.token;
          // const id = result.data.result._id;
          // localStorage.setItem("user", token);
          // localStorage.setItem("id", id);
          console.log(token, id);
          if (result.data.result.role == "61ac96cfbc01bd4bd3a4f037") {
            navigate(`/getTodo`);
          } else {
            navigate(`/admin`);
          }
          const data = {
            token: result.data.token,
            id: result.data.result._id,
          };
          dispatch(signIn(data));
          setToken(token);
        })
        .catch((err) => {
          console.log(err);
        });
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <div>
      <form onSubmit={logIn} method="post">
        <input type="email" name="email" placeholder='Email' />
        <input type="password" name="password" placeholder="Password" />
        <button type="submit">sign in</button>
      </form>
    </div>
  );
};

export default Login;
