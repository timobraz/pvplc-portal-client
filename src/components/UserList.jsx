import { useEffect, useState } from "react";
import { useTitle } from "react-use";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import UserPreview from "./UserPreview";
import cl from "./Users.module.css";
import RoundButton from "./Reusable/RoundButton";
import { useNavigate } from "react-router-dom";

const UserList = () => {
  const { auth } = useAuth();
  const nav = useNavigate();
  const [users, setUsers] = useState([]);
  const axios = useApi();
  useTitle("Users List");
  console.log(users);
  useEffect(() => {
    async function getUsers() {
      const resp = await axios.get("/users");
      if (resp?.data?.users) {
        console.log(resp.data.users);
        setUsers(resp.data.users);
      }
    }
    getUsers();
  }, []);

  function create() {
    nav("/users/create");
  }
  return (
    <div className={cl.listtotal}>
      {auth?.roles?.includes("ADMIN") && (
        <RoundButton cl={cl.greenbutton} onClick={create}>
          Add User
        </RoundButton>
      )}
      <div className={cl.previewtotal}>
        <span className={cl.text}>ID</span>
        <span className={cl.text + " " + cl.name}>Name</span>
        <span className={cl.text}>Login</span>
        <span className={cl.text + " " + cl.reserve}>Email</span>
        <span className={cl.text}>Role</span>
        <span className={cl.text}>Status</span>
        <span className={cl.text}>More</span>
      </div>
      {users
        .slice()
        .reverse()
        ?.map((user) => (
          <UserPreview key={user._id} data={user} />
        ))}
    </div>
  );
};

export default UserList;
