import { useContext } from "react";
import { ReportsContext } from "../context/reportsContext";
const useReports = () => {
  return useContext(ReportsContext);
};

export default useReports;
