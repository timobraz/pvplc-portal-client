import cl from "./Users.module.css";
import RoundButton from "./Reusable/RoundButton";
import { useNavigate } from "react-router-dom";
const UserPreview = ({ data }) => {
  const nav = useNavigate();
  async function submitHandle(e) {
    e.preventDefault();
    nav("/users/" + data?._id);
  }
  return (
    <div className={cl.previewtotal}>
      <span className={cl.value}>{data?._id?.substring(0, 6)}</span>

      <span className={cl.value}>{data?.name}</span>
      <span className={cl.value}>{data?.login}</span>
      <span className={cl.value + " " + cl.different}>{data?.email}</span>
      <span className={cl.value}>{data?.roles[0]}</span>
      <span className={cl.value}>Active</span>
      <RoundButton cl={cl.button} onClick={(e) => submitHandle(e)}>
        View
      </RoundButton>
    </div>
  );
};

export default UserPreview;
