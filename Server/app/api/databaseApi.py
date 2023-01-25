import logging

from flask import render_template, url_for, flash, redirect, Blueprint
from darkapp import db, layout, API
from flask_restful import Resource, abort
from darkapp.flows.forms import FlowsForm
from darkapp.models import LinesFlows, LinesFlowsBackup
import time
from flask import request, jsonify

from darkapp.utilities.pathConfig import DataPath

logging.basicConfig(filename=DataPath.LOGFILE, level=logging.INFO)
api_importMES = Blueprint('importMES_api', __name__)
prefix = "/importMES"
from darkapp import flowHRM
import datetime

from dbMES.MES2local import importMES
mes_conn = importMES(status = -1)
status = mes_conn.status
dbstatus = mes_conn.dbstatus


class apiMESImport(Resource):
    def get(self):

        print("### TRY TO RUN QUERIES AND CREATE TABLES IN MES.db3")

        try:

            dumpTimeDict = [{"Base": "HRM_ZAM", "Time": datetime.datetime.now().strftime('%H%M_%d.%m.%Y')}]
            mes_conn.resertMesage()
            # status = 1
            # print("STATUS: ", status)
            mes_conn.addMesage(mes_conn.HRMZAM(layout.server))
            # logging.error("##### pass: mes_conn.HRMZAM(): " + str(datetime.datetime.now()))
            # msg = ''
            dumpTimeDict.append({"Base": "HRM_MAT", "Time": datetime.datetime.now().strftime('%H%M_%d.%m.%Y')})
            # print("STATUS: ", status)
            # status = mes_conn.status
            mes_conn.addMesage(mes_conn.HRMMAT(layout.server))
            # logging.error("##### pass: mes_conn.HRMMAT(): " + str(datetime.datetime.now()))
            # print("STATUS: ", status)
            # status = mes_conn.status
            mes_conn.addMesage(mes_conn.RULES(layout.server))
            # logging.error("##### pass: mmes_conn.RULES(): " + str(datetime.datetime.now()))
            mes_conn.DumpTime(dumpTimeDict)
            # logging.error("##### pass: DumpTime(dumpTimeDict): " + str(datetime.datetime.now()))

            # Done, End
            mes_conn.setStatus(-2)

            return jsonify(
                status="Ok",
                error=False
                # line = name,
                # data = flowsData
            )

        except Exception as e:
            # logging.error("ERROR with importing MES DB: " + str(datetime.datetime.now()))
            # logging.error(e)
            # status = -1
            # print(e)
            # mes_conn.setMesage(str(e))

            return jsonify(
                status="False",
                error=True
                # line = name,
                # data = flowsData
            )

        # status = -1
        # daemon1.set_OFF()
        # HRMdata.drop() #TODO ????

        # print("### TEST A")
        # # return jsonify(msg)
        #
        # return jsonify(
        #     status="Ok",
        #     error=False
        #     # line = name,
        #     # data = flowsData
        # )


API.add_resource(apiMESImport, prefix + "/import")

