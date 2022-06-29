import ReportList from "../components/ReportList";
import cl from "./Reports.module.css";
import Select from "react-select";
const options = [
  { value: "January", label: "January" },
  { value: "February", label: "February" },
  { value: "March", label: "March" },
];

const Reports = () => {
  return (
    <div className={cl.total}>
      <div className={cl.filter}>
        <h3 className={cl.text}>Filter Results</h3>
        <div className={cl.settings}>
          <Select options={options} />
          <Select options={options} />
        </div>
      </div>
      <h1 className={cl.title}>Report List</h1>
      <ReportList />
    </div>
  );
};

export default Reports;
