import "./App.css";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import {
  BrowserRouter as Router,
  Route,
  Routes,
  Navigate,
} from "react-router-dom";
import Login from "./pages/login";
import Signup from "./pages/signup";
import Home from "./pages/Home";
import { useEffect, useState } from "react";
import axios from "axios";
import apiUrl from "./apiUrl";

function App() {
  const [user, setUser] = useState("");
  const [loading, setLoading] = useState(true);
  useEffect(() => {
    getUser();
  }, []);
  const getUser = async () => {
    try {
      const token = JSON.parse(localStorage.getItem("user")).token;
      if (!token) return;
      const response = await axios.get(`${apiUrl}/api/getUser`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      setUser({
        isLoggedIn: true,
        userData: {
          enail: response.data.email,
          userId: response.data._id,
        },
      });
    } catch (error) {
      toast.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div>
      {!loading && (
        <Router>
          <ToastContainer />
          <Routes>
            <Route
              exact
              path="/"
              element={user ? <Home /> : <Navigate to="login" />}
            ></Route>
            <Route
              path="/login"
              element={user ? <Navigate to="/" /> : <Login setUser={setUser} />}
            ></Route>
            <Route
              path="/register"
              element={
                user ? <Navigate to="/" /> : <Signup setUser={setUser} />
              }
            ></Route>
          </Routes>
        </Router>
      )}
    </div>
  );
}

export default App;
