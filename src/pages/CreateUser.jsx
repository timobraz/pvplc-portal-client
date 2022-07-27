import { useState } from "react";
import { useNavigate } from "react-router-dom";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
import cl from "../pages/Account.module.css";
import genpass from "generate-password-browser";
import RoundButton from "../components/Reusable/RoundButton";
const CreateUser = () => {
  const { auth, setAuth } = useAuth();
  console.log(auth);
  const axios = useApi();
  const [error, setError] = useState("");
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [volunteerID,setVolunteerID]=useState("")
  const [login, setLogin] = useState("");
  const [password, setPassword] = useState(
    genpass.generate({
      length: 10,
      numbers: true,
    })
  );
  const [roles, setRoles] = useState("VOLUNTEER");
  const [note, setNote] = useState("");
  const nav = useNavigate();

  async function create() {
    const resp = await axios.post("/users", { name, email, login, password, roles, note, phone,volunteerID }).catch((err) => {
      console.log("Couldnt make user");
      setError("Failed to create User");
    });
    if (resp?.status === 200 && resp?.data) {
      console.log("created user");
      nav("/users");
    }
  }
  return (
    <div className={cl.total}>
      <h1 className={cl.title}>Create User</h1>
      <div className={cl.slot}>
        <span className={cl.label}>Name</span>
        <input type="text" name="name" id="" className={cl.input} value={name} onChange={(event) => setName(event.target.value)} />
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Login</span>
        <input type="text" name="login" id="" className={cl.input} value={login} onChange={(event) => setLogin(event.target.value)} />
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Volunteer Hub ID</span>
        <input type="text"  id="" className={cl.input} value={volunteerID} onChange={(event) => setVolunteerID(event.target.value)} />
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Password</span>
        <input type="text" name="phone" id="" className={cl.input} value={password} onChange={(event) => setPassword(event.target.value)} />
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Email</span>
        <input type="text" name="email" id="" className={cl.input} value={email} onChange={(event) => setEmail(event.target.value)} />
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Phone</span>
        <input type="text" name="email" id="" className={cl.input} value={phone} onChange={(event) => setPhone(event.target.value)} />
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Roles</span>
        <input type="text" name="roles" id="" className={cl.input} value={roles} onChange={(event) => setRoles(event.target.value)} />
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Note</span>
        <textarea name="note" type="text" value={note} className={cl.input} onChange={(e) => setNote(e.target.value)} />
      </div>
      <div className={cl.buttons}>
        <RoundButton cl={cl.button} onClick={create}>
          Create
        </RoundButton>
        <RoundButton cl={cl.button} onClick={() => nav(-1)}>
          Back
        </RoundButton>
      </div>
      {error && <span className={cl.error}>{error}</span>}
    </div>
  );
};

export default CreateUser;
