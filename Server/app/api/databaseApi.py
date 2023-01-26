import logging

from flask import Blueprint
from app import API
from flask_restful import Resource

from flask import jsonify
from threading import Thread

import datetime
import time
from app.DBbase.DBtime import importDB

api_importDB = Blueprint('importDB_api', __name__)
prefix = "/importDB"

db_connection = importDB(status = -1)
status = db_connection.status
dbstatus = db_connection.dbstatus


class apiDBImport(Resource):

    def get(self):

        print("apiDBImport.get()")
        t1 = Thread(target=task)
        t1.start()

        # t1.join()

        return jsonify("HRM_test")


    def task(self):
        """

        :return:
        """
        print("dartabaseApi.apiDBImport.tast()")

        try:

            for i in range(10):
                time.sleep(1)

            return jsonify(
                status="Ok",
                error=False
            )

        except Exception as e:

            return jsonify(
                status="False",
                error=True
            )

API.add_resource(apiDBImport, prefix + "/import")

def updateMES():

    t1 = Thread(target=task)
    t1.start()

    # t1.join()

    return jsonify("HRM_test")


def task():

    print("dartabaseApi.tast()")

    try:

        db_connection.resertMesage()

        db_connection.addMesage(db_connection.TABLE(name="TABLE1"))

        db_connection.addMesage(db_connection.TABLE(name="TABLE2"))

        db_connection.addMesage(db_connection.TABLE(name="TABLE3"))

        # Done, End
        db_connection.setStatus(-2)

    except Exception as e:

        print(e)
        db_connection.setMesage(str(e))

