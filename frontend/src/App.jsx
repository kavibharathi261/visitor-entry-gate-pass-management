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
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    if (!username || !password) {
      alert("Please enter username and password");
      return;
    }

    try {
      setLoading(true);

      const response = await api.post("login/", {
        username,
        password,
      });

      const tokens = response.data.data;

      localStorage.setItem("access", tokens.access);
      localStorage.setItem("refresh", tokens.refresh);

      navigate("/dashboard");
    } catch (error) {
      console.error("Login Error:", error);

      if (error.response) {
        alert("Invalid username or password");
      } else {
        alert("Cannot connect to Django server");
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-page">
      <div className="login-showcase">
        <div className="brand-mark">VG</div>

        <div className="showcase-content">
          <span className="eyebrow">SMART • SECURE • SIMPLE</span>

          <h1>
            Visitor Entry
            <br />
            Management System
          </h1>

          <p>
            A smarter way to manage visitor registrations,
            approvals and digital gate passes.
          </p>

          <div className="security-note">
            <span className="security-icon">✓</span>
            Secure and organised visitor management
          </div>
        </div>

        <div className="showcase-footer">
          VISITOR MANAGEMENT PORTAL
        </div>
      </div>

      <div className="login-form-section">
        <div className="login-form-card">
          <div className="mobile-brand">VG</div>

          <span className="form-eyebrow">WELCOME BACK</span>
          <h2>Sign in to your account</h2>

          <p className="form-description">
            Enter your credentials to continue.
          </p>

          <form onSubmit={handleLogin}>
            <div className="login-field">
              <label htmlFor="username">Username</label>
              <input
                id="username"
                type="text"
                placeholder="Enter your username"
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                autoComplete="username"
                required
              />
            </div>

            <div className="login-field">
              <label htmlFor="password">Password</label>

              <div className="password-wrapper">
                <input
                  id="password"
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter your password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  autoComplete="current-password"
                  required
                />

                <button
                  type="button"
                  className="show-password"
                  onClick={() => setShowPassword(!showPassword)}
                >
                  {showPassword ? "Hide" : "Show"}
                </button>
              </div>
            </div>

            <button
              type="submit"
              className="login-submit"
              disabled={loading}
            >
              {loading ? "Signing in..." : "Sign In"}
              {!loading && <span>→</span>}
            </button>
          </form>

          <div className="login-security">
            <span>🔒</span> Authorised access only
          </div>
        </div>

        <p className="login-copyright">
          © Visitor Entry Management System
        </p>
      </div>
    </div>
  );
}

function Navigation() {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("access");
    localStorage.removeItem("refresh");
    navigate("/");
  };

  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark px-3">
      <Link className="navbar-brand me-4" to="/dashboard">
        Visitor Management
      </Link>

      <div className="navbar-nav flex-row flex-wrap">
        <Link className="nav-link px-2" to="/dashboard">
          Dashboard
        </Link>

        <Link className="nav-link px-2" to="/register">
          Visitor Registration
        </Link>

        <Link className="nav-link px-2" to="/visit-request">
          Visit Request
        </Link>

        <Link className="nav-link px-2" to="/approval">
          Approval
        </Link>

        <Link className="nav-link px-2" to="/gate-pass">
          Gate Pass
        </Link>

        <Link className="nav-link px-2" to="/check-in-out">
          Check In/Out
        </Link>

        <Link className="nav-link px-2" to="/visitor-history">
          Visitor History
        </Link>
      </div>

      <button
        type="button"
        className="btn btn-outline-light btn-sm ms-auto"
        onClick={handleLogout}
      >
        Logout
      </button>
    </nav>
  );
}

function ProtectedLayout({ children }) {
  const token = localStorage.getItem("access");

  if (!token) {
    return <Login />;
  }

  return (
    <>
      <Navigation />
      <main className="container-fluid py-4">
        {children}
      </main>
    </>
  );
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />

        <Route
          path="/dashboard"
          element={
            <ProtectedLayout>
              <Dashboard />
            </ProtectedLayout>
          }
        />

        <Route
          path="/register"
          element={
            <ProtectedLayout>
              <VisitorRegistration />
            </ProtectedLayout>
          }
        />

        <Route
          path="/visit-request"
          element={
            <ProtectedLayout>
              <VisitRequest />
            </ProtectedLayout>
          }
        />

        <Route
          path="/approval"
          element={
            <ProtectedLayout>
              <Approval />
            </ProtectedLayout>
          }
        />

        <Route
          path="/gate-pass"
          element={
            <ProtectedLayout>
              <GatePass />
            </ProtectedLayout>
          }
        />

        <Route
          path="/check-in-out"
          element={
            <ProtectedLayout>
              <CheckInOut />
            </ProtectedLayout>
          }
        />

        <Route
          path="/visitor-history"
          element={
            <ProtectedLayout>
              <VisitorHistory />
            </ProtectedLayout>
          }
        />

        <Route path="*" element={<Login />} />
      </Routes>
    </BrowserRouter>
  );
}

export { App as default };

