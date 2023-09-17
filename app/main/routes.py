from app.main import bp
from flask import render_template, flash, request, redirect, session, url_for
from app.trees.ged_utils import get_view_model, EXAMPLE_FILE

@bp.route("/", methods=["GET", "POST"])
def index():
    if request.method == "POST":
        if request.form.get("example"):
            session["view_model"] = get_view_model(EXAMPLE_FILE)
            session["filename"] = EXAMPLE_FILE
            return redirect(url_for("trees.viewer"))
    return render_template("index.html")
