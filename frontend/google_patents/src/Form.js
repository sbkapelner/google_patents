import React, { useState, useEffect } from "react";
import "./Form.css";

function Form() {
  const [file, setFile] = useState();

  const fileReader = new FileReader();

  const Storage = () => {
    let storedCsvData = "";
    if (localStorage.getItem("csvdata") === null) {
      storedCsvData = "";
    } else {
      storedCsvData = localStorage.getItem("csvdata");
    }
    return storedCsvData;
  };

  const [csvdata, setCsvData] = useState(Storage());

  useEffect(() => {
    localStorage.setItem("csvdata", csvdata);
  });

  const handleOnChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleOnSubmit = (e) => {
    e.preventDefault();

    if (file) {
      fileReader.onload = function (event) {
        const csvOutput = event.target.result;
        const csvdata = csvOutput;
        setCsvData(csvdata);
      };

      fileReader.readAsText(file);
    }
  };

  return (
    <div style={{ textAlign: "center" }}>
      <h1>Prior Art Report Template</h1>
      <form>
        <input
          type={"file"}
          id={"csvFileInput"}
          accept={".csv"}
          onChange={handleOnChange}
          className="btn-gradient-1"
        />

        <button
          className="btn-gradient-1"
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          Upload CSV
        </button>
        <button
          className="btn-gradient-1"
          onClick={(e) => {
            localStorage.clear();
          }}
        >
          Reset
        </button>
      </form>
      <br></br>
      <form action="http://localhost:8080/submit" method="post">
        <input type="hidden" name="generate" value={csvdata}></input>
        <button type="submit" className="btn-gradient-1">
          Generate Report
        </button>
      </form>
      <br></br>
      <pre>{csvdata}</pre>
    </div>
  );
}

export default Form;
