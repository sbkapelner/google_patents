from flask import Flask, request, send_file
from script import updateDocument
from datetime import datetime
import os.path

app = Flask(__name__)


@app.route("/submit", methods=["POST"])
def submit():
    data = request.form["generate"].split("\r\n")
    fname = f"{datetime.now().strftime('%Y-%m-%d_%H:%M:%S')}.docx"
    for pat_no in data:
        file = updateDocument(fname, pat_no)
        if os.path.isfile(fname) == False:
            file.create_document()
            file.add_table()
        file.new_row(0)
    return send_file(fname, as_attachment=True)


if __name__ == "__main__":
    app.run(debug=True)
