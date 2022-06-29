import React, { createContext, useState } from "react";
export const ReportsContext = createContext();
export const ReportsContextProvider = (props) => {
  const example = {
    _id: 31312,
    name: "Dorian Gray",
    reserve: "San Ramon",
    timeSpent: 160,
    activities: [
      { trail: "Marymount", type: "Vandalism", quantity: 0, notes: "very disrespectful" },
      { trail: "Trail 2", type: "Education", quantity: 0, notes: "helpful intercaction" },
    ],
  };
  const [reports, setReports] = useState([]);

  return <ReportsContext.Provider value={{ reports, setReports }}>{props.children}</ReportsContext.Provider>;
};
