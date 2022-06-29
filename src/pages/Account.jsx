import cl from "./Account.module.css";
import useAuth from "../hooks/useAuth";
import RoundButton from "../components/Reusable/RoundButton";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
const Account = () => {
  const { auth, setAuth } = useAuth();
  console.log(auth);
  const nav = useNavigate();
  const axios = useApi();
  async function signout() {
    const resp = await axios.delete("/users");
    if (resp.status == 200) {
      setAuth({});
      nav("/login");
    }
  }
  return (
    <div className={cl.total}>
      <h1 className={cl.title}>Account Info</h1>
      <div className={cl.slot}>
        <span className={cl.label}>Name</span>
        <span className={cl.data}>{auth.name}</span>
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Email</span>
        <span className={cl.data}>{auth.email}</span>
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Login</span>
        <span className={cl.data}>{auth.login}</span>
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Roles</span>
        <span className={cl.data}>{auth.roles?.join(", ")}</span>
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Date of Creation</span>
        <span className={cl.data}>{auth.createdAt}</span>
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Notes</span>
        <span className={cl.data}>{auth.note}</span>
      </div>
      <RoundButton cl={cl.button} onClick={signout}>
        Sign Out
      </RoundButton>
    </div>
  );
};

export default Account;
