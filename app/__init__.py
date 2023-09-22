from flask import Flask
from app.extensions import sesh

class Config:
    SESSION_TYPE = 'filesystem'
    SECRET_KEY = "test" # os.environ.get("FLASK_SECRET_KEY")

def create_app(config_class=Config):
    app = Flask(__name__)
    app.config.from_object(config_class)

    #db.init_app(app)
    sesh.init_app(app)
    with app.app_context():
        pass

    # Register blueprints here
    from app.auth import bp as auth_bp
    from app.main import bp as main_bp
    from app.trees import bp as trees_bp

    app.register_blueprint(main_bp)
    app.register_blueprint(auth_bp, url_prefix="/auth")
    app.register_blueprint(trees_bp, url_prefix="/trees")

    return app