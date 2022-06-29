import cl from "./Reports.module.css";
import { Outlet } from "react-router-dom";

const Reports = () => {
  return (
    <div className={cl.total}>
      <Outlet />
    </div>
  );
};

export default Reports;
