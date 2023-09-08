from flask_wtf import FlaskForm
from wtforms import SubmitField, StringField, PasswordField
from wtforms.validators import DataRequired

class LoginForm(FlaskForm):
    password = PasswordField("pass", validators=[DataRequired()])
    login = SubmitField("Zaloguj")