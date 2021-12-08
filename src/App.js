import logo from "./logo.svg";
import "./App.css";
import Login from "./components/Login";
import Todos from "./components/Todos";
import Admin from "./components/Admin";
import SignUp from "./components/Signup";
import { Routes, Route } from "react-router-dom";
function App() {
  return (
    <div className="App">
      <header className="App-header">
        <div className="container">
        <Routes>
          <Route exact path="/login" element={<Login />} />
          <Route exact path="/getTodo" element={<Todos />} />
          <Route exact path="/" element={<SignUp />} />
          <Route exact path="/admin" element={<Admin />} />
        </Routes>
        </div>
      </header>
    </div>
  );
}

export default App;
