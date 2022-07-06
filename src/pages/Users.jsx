import cl from "../components/Users.module.css";
import { Outlet } from "react-router-dom";

const Users = (props) => {
  return (
    <div className={cl.total}>
      <Outlet />
    </div>
  );
};

export default Users;
