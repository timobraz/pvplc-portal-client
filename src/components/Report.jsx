import cl from "./Report.module.css";
import ViewActivity from "./ViewActivity";
import RoundButton from "./Reusable/RoundButton";
import useAuth from "../hooks/useAuth";
import useApi from "../hooks/useApi";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const Report = ({ data, setEdit }) => {
  const { auth } = useAuth();
  const axios = useApi();
  const [error, setError] = useState("");
  const nav = useNavigate();
  async function deleteReport() {
    const resp = await axios.delete("/reports/" + data._id).catch((err) => {
      console.log("failed to delete");
      setError("Failed to delete report");
    });
    if (resp?.status === 200) {
      setError("");
      nav("/reports");
    }
  }
  return (
    <div className={cl.total}>
      <div className={cl.slot}>
        <div className={cl.heading}>
          <span className={cl.title}>View Report</span>
        </div>
        <label className={cl.label}>Name</label>
        <input type="text" disabled={true} value={data.createdBy.name} className={cl.value} />
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>Submission Date</label>
        <input type="text" disabled={true} value={data.createdAt} className={cl.value} />
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>Trail Watch Date</label>
        <input type="text" disabled={true} value={data.date} className={cl.value} />
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>Reserve</label>
        <input type="text" disabled={true} value={data.reserve} className={cl.value} />
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>Start Time</label>
        <input type="text" disabled={true} value={data.startTime} className={cl.value} />
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>End Time</label>
        <input type="text" disabled={true} value={data.endTime} className={cl.value} />
      </div>
      {data.activities.map((activity, index) => (
        <ViewActivity key={activity.uuid} activity={activity} index={index} />
      ))}
      {(auth?.roles?.includes("ADMIN") || auth?.roles?.includes("MOD") || data.createdBy.email == auth?.email) && (
        <div className={cl.buttons}>
          <RoundButton cl={cl.button} onClick={() => setEdit(true)}>
            Edit
          </RoundButton>
          <RoundButton cl={cl.button} onClick={deleteReport}>
            Delete
          </RoundButton>
        </div>
      )}
      {error && <p className={cl.error}>{error}</p>}
    </div>
  );
};

export default Report;
