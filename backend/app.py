from flask import Flask, request, send_file, redirect
from script import updateDocument
from datetime import datetime
import os.path

app = Flask(__name__)


@app.route("/submit", methods=["POST"])
def submit():
    err_nodata = request.form["err_nodata"]
    err_datashape = request.form["err_datashape"]

    client_parameters = {
        "patent_no": request.form["patent_no"],
        "title": request.form["title"],
        "inventor": request.form["inventor"],
        "assignee": request.form["assignee"],
        "status": request.form["status"],
        "priority_date": request.form["priority_date"],
    }

    if err_nodata == "true" or err_datashape == "true":
        return redirect(f"http://localhost:3000/")

    data = request.form["generate"].split("\r\n")
    fname = f"{datetime.now().strftime('%Y-%m-%d_%H:%M:%S')}.docx"
    for pat_no in data:
        file = updateDocument(fname, pat_no, client_parameters)
        if os.path.isfile(fname) == False:
            file.create_document()
            file.add_table()
        file.new_row(0)
    return send_file(os.path.join(os.getcwd(), fname), as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True)
