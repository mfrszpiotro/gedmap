from app.auth import bp
from flask import render_template, url_for, redirect, flash, session
from app.auth.forms import LoginForm


@bp.route("/login", methods=["GET", "POST"])
def login():
    if session.get("logged", False):
        return redirect(url_for("logout"))

    else:
        login_form = LoginForm()
        if login_form.validate_on_submit():
            if login_form.password.data == "test" and login_form.login.data == True:
                session["logged"] = True
                return redirect(url_for("index"))

            flash("Niepoprawne hasło", "error")

    return render_template("auth/login.html", login_form=login_form)


@bp.route("/logout", methods=["GET", "POST"])
def logout():
    if session.get("logged", False):
        session.pop("logged")
        return redirect(url_for("index"))
    return redirect(url_for("index"))
