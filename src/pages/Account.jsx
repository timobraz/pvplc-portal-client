import cl from "./Account.module.css";
import useAuth from "../hooks/useAuth";
import RoundButton from "../components/Reusable/RoundButton";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import { useTitle } from "react-use";
import { useState } from "react";
const Account = () => {
  const { auth, setAuth } = useAuth();
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(auth.name);
  const [email, setEmail] = useState(auth.email);
  const [note, setNote] = useState(auth.note);
  const [error, setError] = useState("");

  useTitle("Account");
  const nav = useNavigate();
  const axios = useApi();
  async function signout() {
    try {
      await axios.delete("/users");
    } catch (error) {
      console.log("error when signing out");
    } finally {
      setAuth({});
      nav("/login");
    }
  }
  async function update() {
    const resp = await axios.put("/users/", { name, email, note }).catch(() => {
      console.log("failed to update");
      setError("Failed to update, make sure all fields are there");
    });
    if (resp?.status == 200 && resp?.data?.user) {
      setAuth(resp.data.user);
      setEdit(false);
      setError("");
    }
  }
  function cancel() {
    setEdit(false);
  }
  return (
    <div className={cl.total}>
      <h1 className={cl.title}>Account Info</h1>
      <div className={cl.slot}>
        <span className={cl.label}>Name</span>
        {edit ? (
          <input type="text" value={name} className={cl.input} onChange={(e) => setName(e.target.value)} />
        ) : (
          <span className={cl.data}>{auth.name}</span>
        )}
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Email</span>
        {edit ? (
          <input type="text" value={email} className={cl.input} onChange={(e) => setEmail(e.target.value)} />
        ) : (
          <span className={cl.data}>{auth.email}</span>
        )}
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
        {edit ? (
          <textarea type="text" value={note} className={cl.input} onChange={(e) => setNote(e.target.value)} />
        ) : (
          <span className={cl.data}>{auth.note}</span>
        )}
      </div>
      {edit ? (
        <>
          <div className={cl.buttons}>
            <RoundButton cl={cl.button} onClick={update}>
              Update
            </RoundButton>
            <RoundButton cl={cl.button} onClick={cancel}>
              Cancel
            </RoundButton>
          </div>
          <h3 className={cl.error}>{error}</h3>
        </>
      ) : (
        <div className={cl.buttons}>
          <RoundButton cl={cl.button} onClick={signout}>
            Sign Out
          </RoundButton>
          <RoundButton cl={cl.button} onClick={() => setEdit(true)}>
            Edit
          </RoundButton>
        </div>
      )}
    </div>
  );
};

export default Account;
