import os

basedir = os.path.abspath(os.path.dirname(__file__))
ALLOWED_EXTENSIONS = {'ged'}
UPLOAD_FOLDER = os.path.join(basedir, "gedcoms")

def allowed_file(filename):
    return '.' in filename and \
           filename.rsplit('.', 1)[1].lower() in ALLOWED_EXTENSIONS