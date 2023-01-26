import cx_Oracle
import pandas as pd
import datetime
import logging
import time


class importDB():

    def __init__(self, status = 0):
        self._status = status
        self._dbstatus = ''
        self._msg = ''

    @property
    def status(self):
        return self._status

    @property
    def dbstatus(self):
        return self._dbstatus

    def setStatus(self, val):
        self._status = val

    def add2Status(self, val):
        self._status += val

    @property
    def msg(self):
        return self._msg

    def addMesage(self, val):
        self._msg += val

    def setMesage(self, val):
        self._msg = val

    def resertMesage(self):
        self._msg = ""

    def call_procedure0(self, fun_name):

        self._dbstatus = fun_name

        for i in range(0, 101, 21):
            self.setStatus(i)
            print("task: ", i)
            time.sleep(1)

        #self._status = -1
        return pd.DataFrame([False])

    def call_procedure(self, fun_name):
        """
        :param salesman_id:
        :param year:
        :return: the number of orders by a salesman and year
        """

        self._dbstatus = fun_name
        self.setStatus(0)

        try:

            # # create a connection to the Oracle Database

            for i in range(10):
                time.sleep(1)
                self.add2Status(1)


            # initialize list of lists
            data = [['tom', 10], ['nick', 15], ['juli', 14]]
            # Create the pandas DataFrame
            df = pd.DataFrame(data, columns=['Name', 'Age'])

            return df

        except cx_Oracle.Error as error:
            print(error)
            logging.error("## error: call_procedure: " + str(datetime.datetime.now()))
            logging.error(error)
            return pd.DataFrame([False])

    def TABLE(self, name="default"):

        try:

            frame = self.call_procedure(name)
            # save frame in local DB
            out = f"{name} successfully imported; \n"

        except Exception as e:
            out = f"err in {name}; \n"
            out += str(e) + "\n"

        return out









