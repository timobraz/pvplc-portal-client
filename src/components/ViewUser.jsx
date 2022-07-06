import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { useTitle } from "react-use";
import useApi from "../hooks/useApi";
import Loader from "./Reusable/Loader";
import User from "./User";
const ViewUser = () => {
  const axios = useApi();
  const { id } = useParams();
  const nav = useNavigate();
  const [data, setData] = useState(null);
  useTitle("View User");
  useEffect(() => {
    async function queryUser(id) {
      const resp = await axios.get("/users/" + id).catch(() => {
        console.log("Error caught");
        nav("/users");
      });
      if (resp?.data) {
        console.log(resp.data);
        setData(resp?.data?.user);
      }
    }
    queryUser(id);
  }, []);
  return data ? <User data={data} setData={setData} /> : <Loader />;
};

export default ViewUser;
