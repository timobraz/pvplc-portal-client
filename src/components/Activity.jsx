import { useState } from "react";
import Select from "react-select";
import cl from "./Activity.module.css";
import RoundButton from "./Reusable/RoundButton";
import trails from "./trails.json";
import activities from "./activities.json";
const Activity = (props) => {
  const truetrails = trails[props?.reserve?.value];
  const options = truetrails?.map((trail) => {
    return { label: trail, value: trail };
  });
  // console.log(options.find((option) => option.value === props.activity.trail));
  function updateTrail(value, index) {
    const copy = props.activity;
    copy.trail = value;
    props.updateAt(index, copy);
  }

  function updateActivity(value, index) {
    const copy = props.activity;
    copy.activity = value;
    props.updateAt(index, copy);
  }
  function updateQuantity(value, index) {
    const copy = props.activity;
    copy.quantity = parseInt(value);
    props.updateAt(index, copy);
  }
  function updateArea(value, index) {
    const copy = props.activity;
    copy.notes = value;
    props.updateAt(index, copy);
  }
  return (
    <div className={cl.total}>
      <div className={cl.top}>
        <h1 className={cl.title}>Activity #{props.index + 1}</h1>
        <RoundButton cl={cl.smallbutton} onClick={props.delete}>
          Remove
        </RoundButton>
      </div>

      <div className={cl.slot}>
        <span className={cl.label}>Trail</span>
        <Select
          options={options}
          className={cl.input + " " + cl.select}
          placeholder={"Select One"}
          onChange={(pick) => updateTrail(pick?.value, props.index)}
          value={options?.find((option) => option.value === props.activity.trail)}
        />
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Type</span>
        <Select
          options={activities}
          className={cl.input + " " + cl.select}
          placeholder={"Select One"}
          onChange={(pick) => updateActivity(pick?.value, props.index)}
          value={activities
            .find((item) => item.options?.some((option) => option.value == props.activity.activity))
            ?.options?.find((option) => option.value == props.activity.activity)}
        />
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Quantity</span>
        <input type="number" className={cl.input} value={props.activity.quantity} onChange={(e) => updateQuantity(e.target.value, props.index)} />
      </div>
      <div className={cl.slot}>
        <span className={cl.label}>Notes</span>
        <textarea
          name="notes"
          onChange={(e) => updateArea(e.target.value, props.index)}
          className={cl.input + " " + cl.area}
          placeholder="Put your notes here"
          value={props.activity.notes}
        ></textarea>
      </div>
    </div>
  );
};

export default Activity;
