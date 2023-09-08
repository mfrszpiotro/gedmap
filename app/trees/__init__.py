from flask import Blueprint

bp = Blueprint("trees", __name__)

from app.trees import routes