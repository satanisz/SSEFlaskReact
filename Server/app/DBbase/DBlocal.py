import cx_Oracle
import pandas as pd
import dbconnect.DBconfig as cfg
import sqlite3
from sqlite3 import Error
import numpy as np
from darkapp import choosedb
from dbMES.generateQuery import GenerateTableQuery, TableCountQuery
import os
import datetime
import logging
from darkapp.utilities.pathConfig import DataPath
from utilities.enums import Base
import time

##########################################################################
#TODO#############  remove in official version  ##########################
if os.getlogin() == "A0869460":
    cx_Oracle.init_oracle_client(lib_dir=r"C:\Program Files\instantclient_18_3")
else:
    cx_Oracle.init_oracle_client(lib_dir=r"C:\fix\oracle\instantclient_19_12")
##########################################################################

logging.basicConfig(filename=DataPath.LOGFILE, level=logging.INFO)

class importMES():

    def __init__(self, status = 0):
        self._status = status
        self._dbstatus = ''
        self._msg = ''


    def call_procedure0(self, baseType, query, fun_name):
        print("FAKE CALL PROCEDURE")
        print(query)
        print(baseType)

        self._dbstatus = fun_name

        for i in range(0, 101, 21):
            self.setStatus(i)
            print("task: ", i)
            time.sleep(1)

        #self._status = -1
        return pd.DataFrame([False])

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

    def call_procedure(self, baseType, query, fun_name):
        """
        Get order count by salesman and year
        :param salesman_id:
        :param year:
        :return: the number of orders by a salesman and year
        """

        # PREPARE
        if baseType == Base.q2:  # q2
            mesbase = cfg.q2
        elif baseType == Base.prod:  # production
            mesbase = cfg.prod
        else:  # in any other case use q2
            mesbase = cfg.q2

        self._dbstatus = fun_name
        self.setStatus(0)
        countquery = TableCountQuery[fun_name]




        try:

            # # create a connection to the Oracle Database


            dsn = cx_Oracle.makedsn(mesbase.host, mesbase.port, sid=mesbase.sid)

            with cx_Oracle.connect(
                    user = mesbase.username,
                    password = mesbase.password,
                    dsn = dsn,
                    encoding = mesbase.encoding
            ) as connection:


                # HOW MANY ROWS
                with connection.cursor() as cursor:

                    cursor.execute(countquery)
                    row = cursor.fetchone()
                    if row is None:
                        raise Exception("error with countQuery")
                    count_size = row[0]
                    batch_size = int(count_size / 100) # divide into 50 rows

                print("## Connection version")
                print(connection.version)
                logging.error("## Connection version: " + str(datetime.datetime.now()))
                logging.error(connection.version)
                # create a new cursor
                with connection.cursor() as cursor:
                    # create a new variable to hold the value of the
                    # OUT parameter
                    # order_count = cursor.var(int)
                    # call the stored procedure
                    print("## PRZED wykonaniem")
                    logging.error("## PRZED wykonaniem: " + str(datetime.datetime.now()))
                    cursor.execute(query)
                    print("## PO EXECUTE")
                    logging.error("## PO EXECUTE: " + str(datetime.datetime.now()))
                    print(cursor.description)
                    logging.error(cursor.description)
                    field_names = [i[0] for i in cursor.description]
                    print("## PRZED SUM")
                    logging.error("## PRZED SUM: " + str(datetime.datetime.now()))
                    # sum = cursor.fetchall()

                    dfObj = pd.DataFrame(columns=field_names)


                    while True:

                        start0 = time.time()

                        # fetch rows
                        rows = cursor.fetchmany(batch_size)
                        if not rows:
                            break

                        # print(f" fetchmany step: {iter}\r", end='') # cos nie dziala
                        # print("fetchmany step: ", self._status)
                        self.add2Status(1)
                        batchframe = pd.DataFrame(rows, columns=field_names)
                        start1 = time.time()
                        dfObj = pd.concat([dfObj, batchframe], ignore_index=True)
                        end = time.time()
                        print(f"## TIME : {fun_name} : all {end - start0} : concat {end - start1} ")
                        # agregate rows

                    # rows = cursor.fetchall()

                    logging.error("## po cursor.fetchmanyl() - done: " + str(datetime.datetime.now()))
                    # dfObj = pd.DataFrame(rows, columns=field_names)

                return dfObj
        except cx_Oracle.Error as error:
            print(error)
            logging.error("## error: call_procedure: " + str(datetime.datetime.now()))
            logging.error(error)
            return pd.DataFrame([False])

    def HRMZAM(self, baseType):

        try:
            # From FILE
            # f = open('dbMES/HRMZAM2021Q3.sql', 'r')
            # query = f.read()
            # f.close()

            # Dynamic
            query = GenerateTableQuery.generateHRMZAM_Q()

            print("## generateHRMZAM_Q")
            logging.error("## generateHRMZAM_Q: " + str(datetime.datetime.now()))
            print(query)
            frame = self.call_procedure(baseType, query, 'HRMZAM')

            # replace NaN and NaT with None
            frame['PS_DtStartTgt'].fillna(pd.NaT, inplace=True)
            frame['PO_TgtEndDate'].fillna(pd.NaT, inplace=True)
            frame['PS_DtScheduled'].fillna(pd.NaT, inplace=True)
            frame['PO_ReleaseDate'].fillna(pd.NaT, inplace=True)

            print("## FRAME po raz pierwszy")
            logging.error("## FRAME po raz pierwszy: " + str(datetime.datetime.now()))
            print(frame.head())

            # --------SQLITE--------------------
            # Create your connection.
            con = sqlite3.connect(choosedb.getMESpath)

            # Write the new DataFrame to a new SQLite table
            print("## Write orderbook to SQLite table")
            logging.error("## Write orderbook to SQLite table: " + str(datetime.datetime.now()))
            frame.to_sql("HRM_ZAM", con, if_exists="replace", index=True)

            #write backup aswell
            conbackup = sqlite3.connect(choosedb.getMESbackuppath)
            frame.to_sql("HRM_ZAM", conbackup, if_exists="replace", index=True)

            con.close()
            conbackup.close()

            out = "HRMZAM successfully imported; \n"
        except Exception as e:
            out = "err in HRMZAM; \n"
            out += str(e)
            logging.error("##### error inside HRMZAM(): " + str(datetime.datetime.now()))
            logging.error(out)

        return out

    def HRMMAT(self, baseType):

        try:
            # From FILE
            # f = open('dbMES/HRMMAT2021Q3.sql', 'r')
            # query = f.read()
            # f.close()

            # Dynamic
            query = GenerateTableQuery.generateHRMMAT_Q()

            print("## generateHRMMAT_Q")
            print(query)
            frame = self.call_procedure(baseType, query, 'HRMMAT')
            # frame['M_FaIdNew'] = frame['M_FaIdCur']
            # --------SQLITE--------------------
            # Create your connection.
            con = sqlite3.connect(choosedb.getMESpath)

            # Write the new DataFrame to a new SQLite table

            frame.to_sql("HRM_MAT", con, if_exists="replace", index=True)

            #write backup aswell
            conbackup = sqlite3.connect(choosedb.getMESbackuppath)
            frame.to_sql("HRM_MAT", conbackup, if_exists="replace", index=True)

            con.close()
            conbackup.close()

            out = "HRMMAT successfully imported; \n"
        except Exception as e:
            out = "err in HRMMAT; \n"
            out += str(e)
            logging.error("##### error inside HRMZAM(): " + str(datetime.datetime.now()))
            logging.error(out)

        return out

    def RULES(self, baseType):

        try:
            # From FILE
            f = open('dbMES/RULES2021Q3.sql', 'r')
            query = f.read()
            f.close()

            # Dynamic

            frame = self.call_procedure(baseType, query, "RULES")

            # --------SQLITE--------------------
            # Create your connection.
            con = sqlite3.connect(choosedb.getMESpath)

            # Write the new DataFrame to a new SQLite table

            frame.to_sql("RULES", con, if_exists="replace", index=True)
            #write backup aswell
            conbackup = sqlite3.connect(choosedb.getMESbackuppath)
            frame.to_sql("RULES", conbackup, if_exists="replace", index=True)

            con.close()
            conbackup.close()

            out = "RULES successfully imported; \n"
        except Exception as e:
            out = "err in RULES; \n"
            out += str(e)
            logging.error("##### error inside HRMZAM(): " + str(datetime.datetime.now()))
            logging.error(out)

        return out

    def DumpTime(self, dumpTimeDict):

        frame = pd.DataFrame(dumpTimeDict)
        # --------SQLITE--------------------
        # Create your connection.
        con = sqlite3.connect(choosedb.getMESpath)

        # Write the new DataFrame to a new SQLite table

        frame.to_sql("TIME", con, if_exists="replace", index=True)
        con.commit()
        con.close()

    def TakeTime1(self, table_name):

        assert type(table_name) is str
        # --------SQLITE--------------------
        # Create your connection.
        con = None
        try:
            con = sqlite3.connect(choosedb.getMESpath)
        except Error as e:
            print(e)

        cur = con.cursor()
        cur.execute("SELECT * FROM Time where Base = '" + table_name + "'")
        con.commit()
        rows = cur.fetchall()

        return rows[0][2]

    def TakeTime2(self, table_name):

        assert type(table_name) is str

        path = choosedb.getMESpath  # MES_medium.db3

        # --------SQLITE--------------------
        # Create your connection.
        con = None
        try:
            con = sqlite3.connect(path, check_same_thread=False)
        except Error as e:
            print(e)

        cur = con.cursor()
        # pd.read_sql_query("SELECT * FROM Time where Base = '" + table_name + "'")
        cur.execute("SELECT * FROM Time where Base = '" + table_name + "'")
        con.commit()
        rows = cur.fetchall()
        print(rows)
        return rows[0][2][:2]+":"+rows[0][2][2:4]+" "+rows[0][2][5:]





