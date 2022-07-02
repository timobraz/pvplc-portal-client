import cl from "./NewReport.module.css";
import DatePicker from "react-datepicker";
import "react-datepicker/dist/react-datepicker.css";
import { useState } from "react";
import RoundButton from "../components/Reusable/RoundButton";
import Select from "react-select";
import Activity from "../components/Activity";
import { useList, useTitle } from "react-use";
import { v4 as uuid } from "uuid";
import reserves from "../components/reserves.json";
import useApi from "../hooks/useApi";
import { useNavigate } from "react-router-dom";

const NewReport = ({ edit, data }) => {
  const nav = useNavigate();
  const axios = useApi();
  const emptyActivity = { trail: "", activity: "", notes: "", quantity: 1, uuid: "" };
  const [error, setError] = useState("");
  useTitle(edit ? "Update Report" : "Create Report");
  const [startDate, setStartDate] = useState(edit ? Date.parse(data.date) : new Date());
  const [startTime, setStartTime] = useState(edit ? data.startTime : "13:10");
  const [endTime, setEndTime] = useState(edit ? data.endTime : "14:40");

  const [reserve, setReserve] = useState(edit ? { label: data.reserve, value: data.reserve } : null);
  const today = new Date();

  const [activities, { removeAt, push, reset, updateAt }] = useList(
    edit ? data.activities : [{ trail: "", activity: "", notes: "", quantity: 1, uuid: "first" }]
  );
  function deleteActivity(index) {
    removeAt(index);
  }

  async function submit(event) {
    event.preventDefault();
    if (!edit) {
      const resp = await axios
        .post("/reports", {
          reserve: reserve?.value,
          activities,
          date: startDate,
          startTime,
          endTime,
        })
        .catch((err) => {
          setError(err.response?.data?.message);
        });
      if (resp?.data) {
        console.log(resp.data);
        setError("");
        nav("/reports");
      }
    } else if (edit) {
      const resp = await axios
        .put("/reports/" + data._id, {
          reserve: reserve?.value,
          activities,
          date: startDate,
          startTime,
          endTime,
        })
        .catch((err) => {
          setError(err.response?.data?.message);
        });
      if (resp?.data) {
        console.log(resp.data);
        setError("");
        nav("/reports");
      }
    }
  }
  function leave() {
    nav("/reports/");
  }
  return (
    <div className={cl.total}>
      <h1 className={cl.title}>New Report</h1>
      <div className={cl.slot}>
        <span className={cl.label}>Date</span>
        <DatePicker selected={startDate} maxDate={today} className={cl.input} onChange={(date) => setStartDate(date)}></DatePicker>
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Start Time</span>
        <input type="time" name="time" id="" className={cl.input} value={startTime} onChange={(event) => setStartTime(event.target.value)} />
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>End Time</span>
        <input type="time" name="time" id="" className={cl.input} value={endTime} onChange={(event) => setEndTime(event.target.value)} />
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Reserve</span>
        <Select
          options={reserves}
          className={cl.input + " " + cl.select}
          placeholder={"Select One"}
          value={reserve}
          onChange={(pick) => setReserve(pick)}
        />
      </div>
      {activities.map((activity, index) => {
        return (
          <Activity
            key={activity.uuid}
            updateAt={updateAt}
            activity={activity}
            index={index}
            delete={() => deleteActivity(index)}
            reserve={reserve}
          />
        );
      })}
      <div className={cl.buttons}>
        <RoundButton
          cl={cl.smallbutton}
          onClick={() => {
            const emptycopy = emptyActivity;
            const id = uuid();
            emptycopy.uuid = id;
            push(emptycopy);
          }}
        >
          Add Activity
        </RoundButton>
        <RoundButton cl={cl.smallbutton} onClick={reset}>
          Reset Activities
        </RoundButton>
      </div>
      <div className={cl.buttons}>
        <RoundButton cl={cl.button} onClick={(e) => submit(e)}>
          {edit ? "Update" : "Submit"}
        </RoundButton>
        {edit && (
          <RoundButton cl={cl.button} onClick={leave}>
            Cancel
          </RoundButton>
        )}
      </div>

      {error && <p className={cl.error}>{error}</p>}
    </div>
  );
};

export default NewReport;
