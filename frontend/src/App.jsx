import { useState } from "react";
import {
  BrowserRouter,
  Routes,
  Route,
  Link,
  useNavigate,
} from "react-router-dom";

import "bootstrap/dist/css/bootstrap.min.css";
import "./App.css";
import api from "./api";

import Dashboard from "./pages/Dashboard";
import VisitorRegistration from "./pages/VisitorRegistration";
import VisitRequest from "./pages/VisitRequest";
import Approval from "./pages/Approval";
import GatePass from "./pages/GatePass";
import CheckInOut from "./pages/CheckInOut";
import VisitorHistory from "./pages/VisitorHistory";


function Login() {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      const response = await api.post("login/", {
        username: username,
        password: password,
      });

      const tokens = response.data.data;

      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);

      alert("Login successful");

      navigate("/dashboard");
    } catch (error) {
      console.log("Login Error:", error);

      if (error.response) {
        alert("Invalid username or password");
      } else {
        alert("Cannot connect to Django server");
      }
    }
  };

  return (
    <div className="container mt-5">
      <div
        className="card shadow p-4 mx-auto"
        style={{ maxWidth: "400px" }}
      >
        <h2 className="text-center mb-2">
          Visitor Entry
        </h2>

        <p className="text-center text-muted mb-4">
          Gate Pass Management System
        </p>

        <form onSubmit={handleLogin}>

          <div className="mb-3">
            <label className="form-label">
              Username
            </label>

            <input
              type="text"
              className="form-control"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>


          <div className="mb-3">
            <label className="form-label">
              Password
            </label>

            <input
              type="password"
              className="form-control"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>


          <button
            type="submit"
            className="btn btn-primary w-100"
          >
            Login
          </button>

        </form>
      </div>
    </div>
  );
}


function Navigation() {

  const navigate = useNavigate();

  const logout = () => {

    localStorage.removeItem("access");
    localStorage.removeItem("refresh");

    navigate("/");
  };


  return (
    <nav className="navbar navbar-dark bg-dark px-3">

      <span className="navbar-brand">
        Visitor Entry System
      </span>


      <div className="d-flex gap-2 flex-wrap">

        <Link
          className="btn btn-outline-light btn-sm"
          to="/dashboard"
        >
          Dashboard
        </Link>


        <Link
          className="btn btn-outline-light btn-sm"
          to="/visitor-registration"
        >
          Visitor
        </Link>


        <Link
          className="btn btn-outline-light btn-sm"
          to="/visit-request"
        >
          Visit Request
        </Link>


        <Link
          className="btn btn-outline-light btn-sm"
          to="/approval"
        >
          Approval
        </Link>


        <Link
          className="btn btn-outline-light btn-sm"
          to="/gate-pass"
        >
          Gate Pass
        </Link>


        <Link
          className="btn btn-outline-light btn-sm"
          to="/check-in-out"
        >
          Check-In/Out
        </Link>


        <Link
          className="btn btn-outline-light btn-sm"
          to="/visitor-history"
        >
          History
        </Link>


        <button
          className="btn btn-danger btn-sm"
          onClick={logout}
        >
          Logout
        </button>

      </div>

    </nav>
  );
}


function ProtectedLayout() {

  return (
    <>
      <Navigation />

      <Routes>

        <Route
          path="/dashboard"
          element={<Dashboard />}
        />

        <Route
          path="/visitor-registration"
          element={<VisitorRegistration />}
        />

        <Route
          path="/visit-request"
          element={<VisitRequest />}
        />

        <Route
          path="/approval"
          element={<Approval />}
        />

        <Route
          path="/gate-pass"
          element={<GatePass />}
        />

        <Route
          path="/check-in-out"
          element={<CheckInOut />}
        />

        <Route
          path="/visitor-history"
          element={<VisitorHistory />}
        />

      </Routes>
    </>
  );
}


function App() {

  return (
    <BrowserRouter>

      <Routes>

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/*"
          element={<ProtectedLayout />}
        />

      </Routes>

    </BrowserRouter>
  );
}


export default App;