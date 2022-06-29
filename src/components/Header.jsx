import { Link } from "react-router-dom";
import useAuth from "../hooks/useAuth";
import cl from "./Header.module.css";

const Header = () => {
  const { auth } = useAuth();
  return (
    <nav className={cl.header}>
      <Link to="/" className={cl.logo}>
        <img src="./pvplc.jpg" alt="logo" className={cl.logo} />
      </Link>

      <Link to="/reports" className={`${cl.link}`}>
        Reports
      </Link>
      <Link to="/users" className={`${cl.link}`}>
        Users
      </Link>
      {auth?.roles?.includes("VOLUNTEER") && (
        <Link to="/create" className={`${cl.link}`}>
          New Report
        </Link>
      )}

      {auth?.roles?.includes("ADMIN") && (
        <Link to="/admin" className={`${cl.link}`}>
          Admin Panel
        </Link>
      )}
      {Object.keys(auth).length === 0 ? (
        <Link to="/login" className={`${cl.link}`}>
          Login
        </Link>
      ) : (
        <Link to="/account" className={`${cl.link}`}>
          Account
        </Link>
      )}
    </nav>
  );
};

export default Header;
