import useReports from "../hooks/useReports";
import cl from "./ReportList.module.css";
import cl2 from "./ReportPreview.module.css";
import { useEffect, useState } from "react";
import ReportPreview from "./ReportPreview";
import useApi from "../hooks/useApi";
import Select from "react-select";
import { useTitle } from "react-use";
import RoundButton from "./Reusable/RoundButton";
import reserves from "./reserves.json";
import trails from "./trails.json";
import useAuth from "../hooks/useAuth";

const months = [
  { value: "", label: "Any" },
  { value: 0, label: "January" },
  { value: 1, label: "February" },
  { value: 2, label: "March" },
  { value: 3, label: "April" },
  { value: 4, label: "May" },
  { value: 5, label: "June" },
  { value: 6, label: "July" },
  { value: 7, label: "August" },
  { value: 8, label: "September" },
  { value: 9, label: "October" },
  { value: 10, label: "November" },
  { value: 11, label: "December" },
];

const years = [
  { value: "", label: "Any" },
  { value: 2022, label: "2022" },
  { value: 2021, label: "2021" },
  { value: 2020, label: "2020" },
  { value: 2019, label: "2019" },
];
const ReportList = (props) => {
  const { reports, setReports } = useReports();
  const [month, setMonth] = useState(null);
  const [year, setYear] = useState(null);
  const [reserve, setReserve] = useState(null);
  const [trail, setTrail] = useState(null);
  const { auth } = useAuth();
  const truetrails = trails[reserve?.label];
  const trailoptions = truetrails?.map((trail) => {
    return { label: trail, value: trail };
  });
  const axios = useApi();
  useTitle("Report List");
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

  async function filterReports() {
    const resp = await axios.get(
      `/reports?${month?.value ? "month=" + month.value : ""}&${year?.value ? "year=" + year.value : ""}&${
        reserve?.value ? "reserve=" + reserve.value : ""
      }&${trail?.value ? "trail=" + trail.value : ""}`
    );
    if (resp?.data?.reports) {
      console.log(resp.data.reports);
      setReports(resp.data.reports);
    }
  }
  async function getSubtotals() {
    const resp = await axios.get(
      `/reports/subtotals?${month?.value ? "month=" + month.value : ""}&${year?.value ? "year=" + year.value : ""}&${
        reserve?.value ? "reserve=" + reserve.value : ""
      }&${trail?.value ? "trail=" + trail.value : ""}`
    );
    if (resp?.data?.subtotal) {
      console.log(resp.data.subtotal);
      downloadObjectAsJson(resp.data.subtotal, "subtotals");
    }
  }

  function downloadObjectAsJson(exportObj, exportName) {
    const mapped = exportObj.map((subtotal) => {
      return { totalHours: subtotal.totalhours, totalMinutes: subtotal.totalminutes, user: subtotal.user_doc[0].name };
    });
    const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(mapped));
    const downloadAnchorNode = document.createElement("a");
    downloadAnchorNode.setAttribute("href", dataStr);
    downloadAnchorNode.setAttribute("download", exportName + ".json");
    document.body.appendChild(downloadAnchorNode); // required for firefox
    downloadAnchorNode.click();
    downloadAnchorNode.remove();
  }
  return (
    <div className={cl.list}>
      <div className={cl.filter}>
        <h3 className={cl.title}>Filter Results</h3>
        <div className={cl.settings}>
          <Select className={cl.selector} options={years} placeholder="Filter Year" value={year} onChange={(pick) => setYear(pick)} />
          <Select
            className={cl.selector}
            options={year?.value ? months : []}
            placeholder="Filter Month"
            value={month}
            onChange={(pick) => setMonth(pick)}
          />
          <Select
            className={cl.selector}
            options={[{ value: "", label: "Any" }].concat(reserves)}
            placeholder="Filter Reserve"
            value={reserve}
            onChange={(pick) => setReserve(pick)}
          />
          <Select
            className={cl.selector}
            options={reserve?.value ? [{ value: "", label: "Any" }].concat(trailoptions) : []}
            placeholder="Filter Trail"
            value={trail}
            onChange={(pick) => setTrail(pick)}
          />
          <RoundButton cl={cl.button} onClick={filterReports}>
            Filter
          </RoundButton>
          {auth?.roles.includes("ADMIN") && (
            <RoundButton cl={cl.button} onClick={getSubtotals}>
              Get Subtotals
            </RoundButton>
          )}
        </div>
      </div>
      <h1 className={cl.title}>Report List</h1>
      <div className={cl2.total}>
        <span className={cl.text}>ID</span>
        <span className={cl.text + " " + cl2.name}>Name</span>
        <span className={cl.text}>Minutes</span>

        <span className={cl.text + " " + cl2.reserve}>Reserve Name</span>
        <span className={cl.text}>Trail:Activity</span>
        <span className={cl.text}>Read More</span>
      </div>

      {reports
        ?.slice()
        .reverse()
        .map((report) => (
          <ReportPreview key={report._id} data={report} />
        ))}
    </div>
  );
};

export default ReportList;
