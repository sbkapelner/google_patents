import React from "react";
import "./RadioButtons.css";

function RadioButtons() {
  return (
    <div className="radio">
      <input type="checkbox" name="patent_no" value="on"></input>
      <input type="hidden" name="patent_no" value="off" />
      <label>Patent No </label>

      <input type="checkbox" name="title" value="on"></input>
      <input type="hidden" name="title" value="off" />
      <label>Title </label>

      <input type="checkbox" name="inventor" value="on"></input>
      <input type="hidden" name="inventor" value="off" />
      <label>Inventor </label>

      <input type="checkbox" name="assignee" value="on"></input>
      <input type="hidden" name="assignee" value="off" />
      <label>Assignee </label>

      <input type="checkbox" name="status" value="on"></input>
      <input type="hidden" name="status" value="off" />
      <label>Status </label>

      <input type="checkbox" name="priority_date" value="on"></input>
      <input type="hidden" name="priority_date" value="off" />
      <label>Priority Date </label>

      <input type="checkbox" name="json_only" value="on"></input>
      <input type="hidden" name="json_only" value="off" />
      <label>JSON Only </label>
    </div>
  );
}

export default RadioButtons;
