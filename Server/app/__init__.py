
from flask import Flask
from flask_session import Session
from flask_sqlalchemy import SQLAlchemy
from flask_bcrypt import Bcrypt
from flask_login import LoginManager
from flask_mail import Mail
from darkapp.config import Config
from darkapp.utilities.resultsFromPublishing import PublishResults
from darkapp.utilities.semaphors import *
# from flask_socketio import SocketIO
from darkapp.layout.layout import Layout, ChooseDB
layout = Layout(1)  # q2: 0; prod: 1
choosedb = ChooseDB(1)

from darkapp.input.dbAssistant import *
from darkapp.output.dbAssistant import *
from darkapp.results.ResultsAssistant import *
from darkapp.utilities.semaphors import CalculationDaemon

from flask_socketio import SocketIO
from flask_restful import Api
from flask_cors import CORS

socketio = SocketIO(ping_timeout=30*60)
'''
:param ping_timeout: The time in seconds that the client waits for the
                     server to respond before disconnecting. The default is
                     60 seconds.
:param ping_interval: The interval in seconds at which the client pings
                      the server. The default is 25 seconds.
'''

app = Flask(__name__)
app.debug = True
app.config.from_object(Config)

cors = CORS(app)
reactClientUrl = 'http://localhost:3000' # http://dark.ispatcee.com/

#app.secret_key = 'super secret key'
app.config['SESSION_TYPE'] = 'filesystem'
sess = Session()
sess.init_app(app)

API = Api(app, prefix='/api')

db = SQLAlchemy(app)
bcrypt = Bcrypt(app)
mail = Mail(app)
login_manager = LoginManager(app)

login_manager.login_view = 'users.login'
login_manager.login_message_category = 'info'
daemon1 = CalculationDaemon()

MatOut = PublishResults()

from darkapp.utilities.pathConfig import DataPath
DataPath.create_errorstore()

from darkapp.models import LineData
HRMdata = LineData(line = "HRM")


from darkapp.flows.flowsAssistant import flowFactory
flowHRM = flowFactory(ob= "HRM")
# flowTRANS2KR = flowFactory(ob= "TRANS2KR")
# flowCPL      = flowFactory(ob= "CPL")
# flowTCM      = flowFactory(ob= "TCM")
# flowTRANS2SW = flowFactory(ob= "TRANS2SW")
# flowSWHDG    = flowFactory(ob= "SWHDG")
# flowCOMBI    = flowFactory(ob= "COMBI")
# flowKRHDG    = flowFactory(ob= "KRHDG")
# flowBA       = flowFactory(ob= "BA")
# flowORCL     = flowFactory(ob= "ORCL")

# from .main import main as main_blueprint
# app.register_blueprint(main_blueprint)

# IMPORTING THE BLUEPRINTS ###
from darkapp.users.routes import users
from darkapp.table_filters.routes import table_filters
from darkapp.input.routes import input
from darkapp.output.routes import output
from darkapp.results.routes import RESULTS
from darkapp.calculations.routes import calculations, calculation_HRM
from darkapp.publish.routes import send_HRM
from darkapp.flows.routes import flows
from darkapp.main.routes import main

# Api Blueprints
from darkapp.api.userFilters import api_userFilters_bp
from darkapp.api.userAlgorithms import api_userAlgorithms_bp
from darkapp.api.allocationAlgorithms import api_allocationAlgorithms_bp
from darkapp.api.calculation import api_calculation_bp
from darkapp.api.flows import api_flows
from darkapp.api.importMES import api_importMES

# REGISTERING BLUEPRINTS ###
app.register_blueprint(users)
app.register_blueprint(table_filters)
app.register_blueprint(input)
app.register_blueprint(output)
app.register_blueprint(calculations)
app.register_blueprint(calculation_HRM)
app.register_blueprint(send_HRM)
app.register_blueprint(flows)
app.register_blueprint(RESULTS)
app.register_blueprint(main)

# Api
app.register_blueprint(api_userFilters_bp)
app.register_blueprint(api_userAlgorithms_bp)
app.register_blueprint(api_allocationAlgorithms_bp)
app.register_blueprint(api_calculation_bp)
app.register_blueprint(api_flows)
app.register_blueprint(api_importMES)

socketio.init_app(app)








