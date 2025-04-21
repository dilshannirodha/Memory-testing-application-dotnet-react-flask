import React, { useContext } from "react";
import { Link } from "react-router-dom";
import AppContext from "../contexts/AppContext";
import { useNavigate } from "react-router-dom";
import { LogOut, LogIn, Home, User, MessageSquare } from "lucide-react";

const Navbar = () => {
  const { isLoggedIn, setIsLoggedIn } = useContext(AppContext);
  const navigate = useNavigate();

  const LogoutButton = () => {
    localStorage.removeItem("token");
    setIsLoggedIn(false);
    navigate("/home");
  };

  return (
    <div className="flex flex-col h-screen bg-blue-700 text-white p-4 fixed left-0 top-0 w-64">
      <h2 className="text-2xl font-bold mb-6 text-center">MemoryTest</h2>

      <ul className="flex-grow space-y-2">
        <li>
          <Link
            to="/"
            className="block p-2 rounded hover:bg-blue-400 transition duration-300"
          >
            <Home className="inline-block w-6 h-6 text-white-500" />
            {" Home"}
          </Link>
        </li>
        <li>
          <Link
            to="/ask-ai"
            className="block p-2 rounded hover:bg-blue-400 transition duration-300"
          >
            <MessageSquare className="inline-block w-6 h-6 text-white-500" />
            {" Ask AI"}
          </Link>
        </li>
        <li>
          <Link
            to="/profile"
            className="block p-2 rounded hover:bg-blue-400 transition duration-300"
          >
            <User className="inline-block w-6 h-6 text-white-500" />
            {" Profile"}
          </Link>
        </li>
      </ul>

      <div className="mt-auto space-y-2">
        {isLoggedIn ? (
          <button onClick={LogoutButton}>
            <Link
              to="/logout"
              className="block p-2 rounded hover:bg-blue-400 transition duration-300"
            >
              <LogOut className="w-9 h-9 text-white-600" />
              {"  Logout"}
            </Link>
          </button>
        ) : (
          <>
            <Link
              to="/login"
              className="block p-2 rounded hover:bg-blue-400 transition duration-300"
            >
              <LogIn className="inline-block w-9 h-9 text-white-600" />
              {"  Login"}
            </Link>
          </>
        )}
      </div>
    </div>
  );
};

export default Navbar;
