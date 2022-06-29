import cl from "./Login.module.css";
import RoundButton from "../components/Reusable/RoundButton";
import { useEffect, useState } from "react";
import { Link, useNavigate, useLocation } from "react-router-dom";
import useApi from "../hooks/useApi";
import useAuth from "../hooks/useAuth";
const Login = () => {
  const [user, setUser] = useState("");
  const [pwd, setPwd] = useState("");
  const [error, setError] = useState("");
  const axios = useApi();
  const navigate = useNavigate();
  const { setAuth } = useAuth();

  useEffect(() => {
    setError("");
  }, [user, pwd]);

  async function submitHandle(event) {
    event.preventDefault();
    const resp = await axios.post("/users/login", { username: user, password: pwd }).catch((err) => {
      setError(err.response.data.message);
    });
    if (resp.data) {
      const user = resp.data.user;
      setAuth({ ...user });
      setUser("");
      setPwd("");
      navigate("/", { replace: true });
    }
  }

  return (
    <div className={cl.total}>
      <h1 className={cl.title}>Login</h1>
      <form className={cl.forms}>
        <label htmlFor="username" className={cl.label}>
          Username
        </label>
        <input type="text" onChange={(e) => setUser(e.target.value)} id="username" className={cl.input} />
        <label htmlFor="username" className={cl.label}>
          Password
        </label>
        <input onChange={(e) => setPwd(e.target.value)} type="password" id="password" className={cl.input} />
        {error && <p className={cl.error}>{error}</p>}
        <RoundButton cl={cl.button} onClick={(e) => submitHandle(e)}>
          Submit
        </RoundButton>
      </form>
    </div>
  );
};

export default Login;
