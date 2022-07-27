import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import cl from "./ViewUser.module.css";
import RoundButton from "./Reusable/RoundButton";
const User = ({ data, setData }) => {
  const { auth, setAuth } = useAuth();
  console.log(auth);
  const axios = useApi();
  const [error, setError] = useState("");
  const [edit, setEdit] = useState(false);
  const [name, setName] = useState(data.name);
  const [email, setEmail] = useState(data.email);
  const [phone, setPhone] = useState(data.phone);
  const [login, setLogin] = useState(data.login);
  const [roles, setRoles] = useState(data.roles.join(" "));
  const [note, setNote] = useState(data.note);
  const [volunteerID, setVolunteerID] = useState(data.volunteerID);

  const nav = useNavigate();
  async function deleteUser() {
    const resp = await axios.delete("/users/" + data._id).catch((err) => {
      console.log("failed to delete");
      setError("Failed to delete user");
    });
    if (resp?.status === 200) {
      if (login == auth.login) {
        setAuth({});
      }
      setError("");
      nav("/users");
    }
  }
  async function update() {
    const resp = await axios.put("/users/" + data._id, { name, email, note, login, roles, phone,volunteerID }).catch(() => {
      console.log("failed to update");
      setError("Failed to update, make sure all fields are there");
    });
    if (resp?.status == 200 && resp?.data?.user) {
      setEdit(false);
      setError("");
      setData(resp?.data?.user);
      if (resp.data?.user.login == auth.login) {
        setAuth(resp.data?.user);
      }
      setName(resp?.data?.user?.name);
      setLogin(resp?.data?.user?.login);
      setRoles(resp?.data?.user?.roles?.join(" "));
      setNote(resp?.data?.user?.note);
      setVolunteerID(resp?.data?.user?.volunteerID);

    }
  }
  function formatPhone(phone) {
    const split = phone.split("");
    console.log(split);

    // const first = split.splice(3, 0, "-");
    // const second = first.splice(7, 0, "-");
    // console.log(second);
    return second.join("");
  }
  return (
    <div className={cl.total}>
      <div className={cl.slot}>
        <div className={cl.heading}>
          <span className={cl.title}>View User</span>
        </div>
        <label className={cl.label}>Name</label>
        {!edit ? (
          <input type="text" disabled={true} value={data.name} className={cl.value} />
        ) : (
          <input type="text" value={name} className={cl.editing} onChange={(e) => setName(e.target.value)} />
        )}
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>Creation Date</label>
        <input type="text" disabled={true} value={data.createdAt} className={cl.value} />
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>Login</label>
        {edit && (auth?.roles?.includes("ADMIN") || auth?.roles?.includes("MOD")) ? (
          <input type="text" value={login} className={cl.editing} onChange={(e) => setLogin(e.target.value)} />
        ) : (
          <input type="text" disabled={true} value={data.login} className={cl.value} />
        )}
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>Volunteer Hub ID</label>
        {edit && (auth?.roles?.includes("ADMIN") || auth?.roles?.includes("MOD")) ? (
          <input type="text" value={volunteerID} className={cl.editing} onChange={(e) => setVolunteerID(e.target.value)} />
        ) : (
          <input type="text" disabled={true} value={data.volunteerID} className={cl.value} />
        )}
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>Email</label>
        {!edit ? (
          <input type="text" disabled={true} value={data.email} className={cl.value} />
        ) : (
          <input type="text" value={email} className={cl.editing} onChange={(e) => setEmail(e.target.value)} />
        )}
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>Phone</label>
        {!edit ? (
          <input type="text" disabled={true} value={data.phone} className={cl.value} />
        ) : (
          <input type="text" value={phone} className={cl.editing} onChange={(e) => setPhone(e.target.value)} />
        )}
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>Roles</label>
        {edit && (auth?.roles?.includes("ADMIN") || auth?.roles?.includes("MOD")) ? (
          <input type="text" value={roles} className={cl.editing} onChange={(e) => setRoles(e.target.value)} />
        ) : (
          <input type="text" disabled={true} value={data.roles.join(", ")} className={cl.value} />
        )}
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>Notes</label>
        {!edit ? (
          <textarea type="text" disabled={true} value={data.note} className={cl.value} />
        ) : (
          <textarea type="text" value={note} className={cl.editing} onChange={(e) => setNote(e.target.value)} />
        )}
      </div>

      {(auth?.roles?.includes("ADMIN") || auth?.roles?.includes("MOD") || data.login == auth?.login) && (
        <div className="">
          {!edit ? (
            <div className={cl.buttons}>
              <RoundButton cl={cl.button} onClick={() => setEdit(true)}>
                Edit
              </RoundButton>
              <RoundButton cl={cl.button} onClick={deleteUser}>
                Delete
              </RoundButton>
            </div>
          ) : (
            <div className={cl.buttons}>
              <RoundButton cl={cl.button} onClick={update}>
                Update
              </RoundButton>
              <RoundButton cl={cl.button} onClick={() => setEdit(false)}>
                Cancel
              </RoundButton>
            </div>
          )}
        </div>
      )}
      {error && <p className={cl.error}>{error}</p>}
    </div>
  );
};

export default User;
