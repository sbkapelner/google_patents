import React, { useState, useEffect } from "react";
import "./Form.css";
import RadioButtons from "./RadioButtons";

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

  const [errors, setErrors] = useState({ nodata: false, datashape: false });

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

  const validate = () => {
    const errormsgs = {};

    errormsgs.nodata = csvdata === "" ? true : false;

    if (errormsgs.nodata === true) {
      alert("No data");
    }

    errormsgs.datashape = csvdata.includes(",") ? true : false;

    if (errormsgs.datashape === true) {
      alert("Data must be a single column");
    }

    setErrors(errormsgs);
  };

  return (
    <div className="Form" style={{ textAlign: "center" }}>
      <h1 className="title">Prior Art Report Template</h1>
      <p>
        <a
          className="link"
          href="https://storage.cloud.google.com/misc_37510/sample.docx"
        >
          | sample report |
        </a>
      </p>
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
      <form
        //action="http://35.208.101.199:8080/submit"
        action="http://localhost:8080/submit"
        method="post"
        onSubmit={validate}
      >
        <RadioButtons></RadioButtons>
        <br></br>
        <input type="hidden" name="generate" value={csvdata}></input>
        <input type="hidden" name="err_nodata" value={errors.nodata} />
        <input type="hidden" name="err_datashape" value={errors.datashape} />
        <button type="submit" className="btn-gradient-1">
          Generate Report
        </button>
      </form>
      <br></br>
      <textarea cols="30" rows="10" value={csvdata} className="data"></textarea>
      <br></br>
      <div className="copyright">
        <p className="title">Copyright &copy; Sarah Kapelner </p>
        <p>All Rights Reserved.</p>
      </div>
    </div>
  );
}

export default Form;
