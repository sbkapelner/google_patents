import React, { useState, useEffect } from "react";

function Form() {
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

  const [file, setFile] = useState();

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
        />

        <button
          onClick={(e) => {
            handleOnSubmit(e);
          }}
        >
          IMPORT CSV
        </button>
        <button
          onClick={(e) => {
            localStorage.clear();
          }}
        >
          Reset
        </button>
      </form>
      <br></br>
      <pre>{csvdata}</pre>
    </div>
  );
}

export default Form;
