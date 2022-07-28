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
import jsontocsv from "json-to-csv-export";
import DatePicker from "react-datepicker";
const ReportList = (props) => {
  const { reports, setReports } = useReports();
  const [reserve, setReserve] = useState(null);
  const [trail, setTrail] = useState(null);
  const [startDate, setStartDate] = useState(new Date(2022, 0, 1));
  const [endDate, setEndDate] = useState(new Date());
  const [volunteer, setVolunteer] = useState(null);
  const [volunteeroptions, setVolunteeroptions] = useState([]);
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
    async function getVolunteers() {
      const resp = await axios.get("/users/volunteers");
      console.log(resp?.data);
      if (resp?.data?.users) {
        const namespick = resp.data.users.map((user) => {
          return { value: user._id, label: user.name };
        });
        console.log(namespick);
        setVolunteeroptions(namespick);
      }
    }
    getVolunteers();
  }, []);

  async function filterReports() {
    const resp = await axios.get(
      `/reports?${startDate ? "start=" + startDate : ""}&${endDate ? "end=" + endDate : ""}&${reserve?.value ? "reserve=" + reserve.value : ""}&${
        trail?.value ? "trail=" + trail.value : ""
      }&${volunteer?.value ? "volunteer=" + volunteer.value : ""}`
    );
    if (resp?.data?.reports) {
      console.log(resp.data.reports);
      setReports(resp.data.reports);
    }
  }
  async function getSubtotals() {
    const resp = await axios.get(
      `/reports/subtotals?${startDate ? "start=" + startDate : ""}&${endDate ? "end=" + endDate : ""}&${
        reserve?.value ? "reserve=" + reserve.value : ""
      }&${trail?.value ? "trail=" + trail.value : ""}&${volunteer?.value ? "volunteer=" + volunteer.value : ""}`
    );
    if (resp?.data?.subtotal) {
      console.log(resp.data.subtotal);
      const mapped = resp.data.subtotal.map((subtotal) => {
        return { totalHours: subtotal.totalhours, totalMinutes: subtotal.totalminutes, user: subtotal.user_doc[0].name };
      });
      jsontocsv(mapped, "subtotalhours.csv");
    }
  }
  async function getTotal() {
    const resp = await axios.get(
      `/reports/total?${startDate ? "start=" + startDate : ""}&${endDate ? "end=" + endDate : ""}&${
        reserve?.value ? "reserve=" + reserve.value : ""
      }&${trail?.value ? "trail=" + trail.value : ""}&${volunteer?.value ? "volunteer=" + volunteer.value : ""}`
    );
    if (resp?.data?.total) {
      console.log(resp.data.total);
      const total = resp.data.total;
      const mapped = total.map((subtotal) => {
        return {
          ...subtotal,
          createdBy: subtotal.createdBy.name,
          activities: JSON.stringify(subtotal.activities).replace(/\\|"/gm, "").replace(/(,)/gm, ";"),
        };
      });
      jsontocsv(mapped, "totals.csv", ", ");
    }
  }

  // function downloadObjectAsJson(exportObj, exportName) {
  //   const dataStr = "data:text/json;charset=utf-8," + encodeURIComponent(JSON.stringify(exportObj));
  //   const downloadAnchorNode = document.createElement("a");
  //   downloadAnchorNode.setAttribute("href", dataStr);
  //   downloadAnchorNode.setAttribute("download", exportName + ".json");
  //   document.body.appendChild(downloadAnchorNode); // required for firefox
  //   downloadAnchorNode.click();
  //   downloadAnchorNode.remove();
  // }
  return (
    <div className={cl.list}>
      <div className={cl.filter}>
        <h3 className={cl.title}>Filter Results</h3>
        <div className={cl.settings}>
          <DatePicker selected={startDate} maxDate={new Date()} className={cl.input} onChange={(date) => setStartDate(date)}></DatePicker>
          <DatePicker selected={endDate} maxDate={new Date()} className={cl.input} onChange={(date) => setEndDate(date)}></DatePicker>
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
          <Select
            className={cl.selector}
            options={volunteeroptions ? [{ value: "", label: "Any" }].concat(volunteeroptions) : []}
            placeholder="Filter volunteer"
            value={volunteer}
            onChange={(pick) => setVolunteer(pick)}
          />
          <RoundButton cl={cl.button} onClick={filterReports}>
            Filter
          </RoundButton>
          {auth?.roles.includes("ADMIN") && (
            <RoundButton cl={cl.button} onClick={getSubtotals}>
              Get Hour Subtotals
            </RoundButton>
          )}
          {auth?.roles.includes("ADMIN") && (
            <RoundButton cl={cl.button} onClick={getTotal}>
              Get Full Data
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
