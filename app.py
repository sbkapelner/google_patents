from flask import Flask, render_template, request
from priority_dates import get_priority_date as dt

app = Flask(__name__)


@app.route("/")
def index():
    return render_template("form.html")


@app.route("/results", methods=("GET", "POST"))
def result():
    data = request.form["name"]
    return data


if __name__ == "__main__":
    app.run(debug=True)
