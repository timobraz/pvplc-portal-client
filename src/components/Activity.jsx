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
  function updateTrail(value, index) {
    const copy = props.activity;
    copy.trail = value;
    props.updateAt(index, copy);
  }
  async function updatePictures(e, index) {
    const files = e.files;
    const copy = props.activity;
    const response = await getBase64(files[0]);
    copy.pictures = [...copy.pictures, response];
    console.log(copy.pictures);
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
  async function getBase64(file) {
    const result = await new Promise((resolve, reject) => {
      var reader = new FileReader();
      reader.readAsDataURL(file);

      console.log(file);

      reader.onload = () => {
        resolve(reader.result);
      };
      reader.onerror = () => reject();
    });
    return result;
  }
  function deletePicture(indexpic, index) {
    const copy = props.activity;
    const picturecopy = copy.pictures;
    picturecopy.splice(indexpic, 1);
    copy.pictures = picturecopy;
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
      <div className={cl.slot}>
        <span className={cl.label}>Pictures</span>
        <input type="file" className={cl.input} onChange={(e) => updatePictures(e.target, props.index)} accept="image/png, image/gif, image/jpeg" />
        {props.activity.pictures?.length > 0 && (
          <div className={cl.pictures}>
            {props.activity.pictures.map((picture, index) => (
              <div className={cl.pictureslot} key={picture}>
                <p className={cl.index}>{index + 1}</p>
                <img src={picture} alt="" className={cl.picture} onClick={() => deletePicture(index, props.index)} />
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default Activity;
