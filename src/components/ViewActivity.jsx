import cl from "./Report.module.css";
const ViewActivity = ({ activity, index }) => {
  return (
    <div className={cl.activity}>
      <div className={cl.heading}>
        <span className={cl.title}>Activity #{index + 1}</span>
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>Trail</label>
        <input type="text" disabled={true} value={activity.trail} className={cl.value} />
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>Type</label>
        <input type="text" disabled={true} value={activity.activity} className={cl.value} />
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>Quantity</label>
        <input type="text" disabled={true} value={activity.quantity} className={cl.value} />
      </div>
      <div className={cl.slot}>
        <label className={cl.label}>Notes</label>
        <textarea type="text" disabled={true} value={activity.notes} className={cl.value} />
      </div>
      <div className={cl.slot}>
        {activity.pictures?.length > 0 && (
          <>
            <label className={cl.label}>Pictures</label>
            <div className={cl.pictures}>
              {activity.pictures.map((picture, index) => (
                <div className={cl.pictureslot} key={picture}>
                  <p className={cl.index}>{index + 1}</p>
                  <img src={picture} alt="" className={cl.picture} />
                </div>
              ))}
            </div>
          </>
        )}
      </div>
    </div>
  );
};

export default ViewActivity;
