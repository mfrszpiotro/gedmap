from app import create_app, Config
app = create_app(Config)
if __name__ == '__main__':
    app.run(host='0.0.0.0')