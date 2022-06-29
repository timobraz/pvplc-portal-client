import cl from "./ReportPreview.module.css";
import RoundButton from "./Reusable/RoundButton";
const ReportPreview = ({ data }) => {
  console.log(data);
  return (
    <div className={cl.total}>
      <span className={cl.text + " " + cl.id}>{data?._id?.slice(-5)}</span>
      <span className={cl.text + " " + cl.name}>{data.createdBy.name}</span>
      <span className={cl.text + " " + cl.time}>{data.timeSpent}</span>

      <span className={cl.text + " " + cl.reserve}>{data.reserve}</span>
      <span className={cl.element + " " + cl.activities}>
        {data.activities.map((activity) => (
          <p key={activity.trail + " : " + activity.type}>{activity.trail + " : " + activity.activity}</p>
        ))}
      </span>
      <RoundButton cl={cl.button} onClick={(e) => submitHandle(e)}>
        View
      </RoundButton>
    </div>
  );
};

export default ReportPreview;
