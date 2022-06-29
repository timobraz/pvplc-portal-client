import useReports from "../hooks/useReports";
import cl from "./ReportList.module.css";
import cl2 from "./ReportPreview.module.css";
import { useEffect } from "react";
import ReportPreview from "./ReportPreview";
import useApi from "../hooks/useApi";
const ReportList = (props) => {
  const { reports, setReports } = useReports();
  const axios = useApi();
  console.log(reports);
  useEffect(() => {
    async function getReports() {
      const resp = await axios.get("/reports");
      if (resp?.data?.reports) {
        console.log(resp.data.reports);
        setReports(resp.data.reports);
      }
    }
    getReports();
  }, []);
  return (
    <div className={cl.list}>
      <div className={cl2.total}>
        <span className={cl.text}>ID</span>
        <span className={cl.text + " " + cl2.name}>Name</span>
        <span className={cl.text}>Minutes</span>

        <span className={cl.text + " " + cl2.reserve}>Reserve Name</span>
        <span className={cl.text}>Trail:Activity</span>
        <span className={cl.text}>Read More</span>
      </div>

      {reports?.map((report) => (
        <ReportPreview key={report._id} data={report} />
      ))}
    </div>
  );
};

export default ReportList;
