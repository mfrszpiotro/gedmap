from app.trees import bp
from flask import render_template, request, flash, redirect, url_for, session
from werkzeug.utils import secure_filename
from app.trees.ged_utils import allowed_file, UPLOAD_FOLDER, get_view_model
import os


@bp.route("/viewer", methods=["GET", "POST"])
def viewer():
    return render_template("trees/viewer.html")


@bp.route("/imports", methods=["GET", "POST"])
def imports():
    if request.method == "POST":
        if "file" not in request.files:
            flash("No file part", "error")
            return redirect(request.url)

        file = request.files["file"]
        if file.filename == "":
            flash("No selected file", "error")
            return redirect(request.url)

        if file and allowed_file(file.filename):
            filename = secure_filename(file.filename)
            file.save(os.path.join(UPLOAD_FOLDER, filename))
            session["test"] = get_view_model(filename)
            return redirect(url_for("trees.viewer"))

    return render_template("trees/imports.html")
