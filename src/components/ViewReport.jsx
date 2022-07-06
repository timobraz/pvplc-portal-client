import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { useTitle } from "react-use";
import useApi from "../hooks/useApi";
import NewReport from "../pages/NewReport";
import Report from "./Report";
import Loader from "./Reusable/Loader";
const ViewReport = () => {
  const axios = useApi();
  const { id } = useParams();
  const [report, setReport] = useState(null);
  const [edit, setEdit] = useState(false);
  useTitle("View Report");
  useEffect(() => {
    async function queryReport(id) {
      const resp = await axios.get("/reports/" + id).catch(() => {
        console.log("Error caught");
      });
      if (resp?.data) {
        console.log(resp.data);
        setReport(resp?.data);
      }
    }
    queryReport(id);
  }, []);
  return report ? edit == true ? <NewReport edit={true} data={report} /> : <Report setEdit={setEdit} data={report} /> : <Loader />;
};

export default ViewReport;
