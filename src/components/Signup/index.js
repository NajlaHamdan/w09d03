import React from "react";
import { useSelector, useDispatch } from "react-redux";
import { Navigate } from "react-router";
import { logout } from "./../../reduce/login";
const Signup = () => {
  const state = useSelector((state) => state);
  const dispatch = useDispatch();
  const signout = () => {
    dispatch(logout({ token: "" ,id:""}));
    Navigate('/signup')
  };
  return (
    <div>
      <button onClick={signout}>logOut</button>
    </div>
  );
};

export default Signup;
