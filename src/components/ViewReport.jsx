import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import useApi from "../hooks/useApi";
import Loader from "./Reusable/Loader";
const ViewReport = () => {
  const axios = useApi();
  const { id } = useParams();
  const [report, setReport] = useState(null);
  console.log(id);
  useEffect(() => {
    async function queryReport(id) {
      const resp = await axios.get("/reports/" + id).catch(() => {
        console.log("Error caught");
      });
      if (resp?.data) {
        console.log(resp?.data);
        setReport(JSON.stringify(resp.data));
      }
    }
    queryReport(id);
  }, []);
  return <>{report ? report : <Loader />}</>;
};

export default ViewReport;
