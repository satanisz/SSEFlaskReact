import logging

from flask import Blueprint, Response, jsonify

from flask_restful import Resource


from threading import Thread
import queue
from datetime import datetime
import time
from app.DBbase.DBtime import importDB
import random
import json
import gevent
# from flask_sse import sse

api_importDB = Blueprint('importDB_api', __name__)



db_connection = importDB(status = -1)
status = db_connection.status
dbstatus = db_connection.dbstatus


# Blueprint with REST
class ApiDBImport(Resource):

    def get(self):

        print("ApiDBImport.get()")
        t1 = Thread(target=task)
        t1.start()

        # t1.join()

        return jsonify("HRM_test")


    def task(self):
        """

        :return:
        """
        print("dartabaseApi.ApiDBImport.tast()")

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






class MessageAnnouncer:

    def __init__(self):
        self.listeners = []

    def listen(self):
        q = queue.Queue(maxsize=5)
        self.listeners.append(q)
        return q

    def announce(self, msg):
        for i in reversed(range(len(self.listeners))):
            try:
                self.listeners[i].put_nowait(msg)
            except queue.Full:
                del self.listeners[i]

announcer = MessageAnnouncer()





@api_importDB.route('/listen') # , methods=['GET']
def listen():
    print("listen()")

    def event():
        i = 0
        while i < 10:
            print("event() ", i)
            i += 1
            # yield 'data: ' + json.dumps(random.rand(1000).tolist()) + '\n\n'
            time.sleep(1)
            yield f"data:  {random.randint(0, 100)} \n\n"
    def stream():
        print("listen().stream()")
        messages = announcer.listen()  # returns a queue.Queue
        while True:
            msg = messages.get()  # blocks until a new message arrives
            print(msg)
            yield msg


    # return Response(stream(), mimetype='text/event-stream')
    return Response(event(), mimetype='text/event-stream')



@api_importDB.route('/stream')
def stream():
    def get_data():
        i = 0
        while i < 10:
            print("event() ", i)
            i += 1
            # gotcha
            time.sleep(1)
            # yield f'data: {datetime.now().second} \n\n'
            yield str(datetime.now().second)

    return Response(get_data(), mimetype='text/event-stream')

def check_if_finished():
    return False

def should_send_event():
    return True

@api_importDB.route("/sse")
def sse():

    print("## SSE")
    def trackerStream():
        # finished = check_if_finished()
        i = 0
        while i < 10:
            print("event() ", i)
            i += 1
            time.sleep(1) # poll timeout
            if should_send_event():
                yield f"data: {datetime.now().second}\n\n"
            else:
                yield f"data: nodata\n\n"

            # finished = check_if_finished()

        yield f"data: finished\n\n"

    return Response(trackerStream(), mimetype="text/event-stream")

@api_importDB.route('/test')
def test():

    name = "test"
    flowsData = [{"a": 1, "b": 2}, {"a": 10, "b": 20}, {"a": 11, "b": 22}]

    results = jsonify({
        "message": "Ok",
        "category": "flow",
        "status": "Ok",
        "line": name,
        "data": flowsData
    })
    return results


# @api_importDB.route('/listen', methods=['GET'])
# def listen():
#     print("listen()")
#
#     # return Response(event(), mimetype='text/event-stream')
#     return sse.publish({"message": datetime.now()}, type='publish')
#
#
#
#




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

