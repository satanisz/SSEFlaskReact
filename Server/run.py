
from darkapp import app, socketio
from darkapp import db

if __name__ == '__main__':
    # this will automaticly create entire db structure
    db.create_all()      # first check for the existence of each individual table, and if not found will issue the CREATE statements
    socketio.run(app)