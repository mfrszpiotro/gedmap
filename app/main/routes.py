from app.main import bp
from flask import render_template, flash

@bp.route("/", methods=["GET", "POST"])
def index():
    return render_template("index.html")
