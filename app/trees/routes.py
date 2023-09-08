from app.trees import bp
from flask import render_template

@bp.route("/viewer", methods=["GET", "POST"])
def viewer():
    
    return render_template("trees/viewer.html")

@bp.route("/imports", methods=["GET", "POST"])
def imports():
    return render_template("trees/imports.html")