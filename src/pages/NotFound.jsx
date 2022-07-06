import { useNavigate, Link } from "react-router-dom";
import cl from "./NotFound.module.css";
const NotFound = () => {
  const nav = useNavigate();
  return (
    <div className={cl.total}>
      <h1 className={cl.header}>Page was not found</h1>
      <Link to="/" className={cl.link}>
        Go to home page
      </Link>
    </div>
  );
};

export default NotFound;
