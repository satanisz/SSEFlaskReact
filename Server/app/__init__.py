
from flask import Flask
from flask_session import Session
from flask_socketio import SocketIO
from flask_restful import Api

socketio = SocketIO(ping_timeout=30*60)

app = Flask(__name__)
app.debug = True

reactClientUrl = 'http://localhost:3000'

app.config['SESSION_TYPE'] = 'filesystem'
sess = Session()
sess.init_app(app)

API = Api(app, prefix='/api')

###IMPORTING THE BLUEPRINTS ###
from app.api.databaseApi import api_importDB

### REGISTERING BLUEPRINTS ###
app.register_blueprint(api_importDB)

socketio.init_app(app)


# WEB SERVICE
@app.route('/')
def hello_world():
    return '<p><h1>Hello, World!</h1></p> ' \
           '<p>Api is available under link: http://localhost:5000/api/importDB</p>' \
           '<p>Call DB is available under link: http://localhost:5000/api/importDB/import</p>'






