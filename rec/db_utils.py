################################################################################################################
# Note: The 'kavvathasdb' database is already created via mySQl Server (installed in UBUNTU PC)
# Using the commands of the file 'schemas.sql'
################################################################################################################

# Author: Vaios Stergiopoulos, PhD candidate in UTH, GR
# Date: May 2024

import csv
import mysql.connector
from mysql.connector import Error


class DButils:

    def __init__(self, h, d, u, pw):
        self.h = h
        self.d = d
        self.u = u
        self.pw = pw

    def connect_to_db(self):
        # This method is just for testing the connection to your Database.
        # It is not used actually, anywhere else in the project.
        try:
            connection = mysql.connector.connect(host=self.h,
                                                 database=self.d,
                                                 user=self.u,
                                                 password=self.pw)
            if connection.is_connected():
                db_Info = connection.get_server_info()
                print("Connected to MySQL Server version ", db_Info)
                cursor = connection.cursor()
                cursor.execute("select database();")
                record = cursor.fetchone()
                print("You're connected to database: ", record)

        except Error as e:
            print("Error while connecting to MySQL", e)
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
                print("MySQL connection is closed")

    def insert_csv2table_paper(self):
        try:
            csv_file_path = 'content/test_small3.csv'  # the papers file : id,title,abstract

            connection = mysql.connector.connect(host=self.h,
                                                 database=self.d,
                                                 user=self.u,
                                                 password=self.pw)
            cursor = connection.cursor()
            with open(csv_file_path, mode='r') as csvfile:
                reader = csv.reader(csvfile)
                next(reader)  # Skip the header row
                for row in reader:
                    cursor.execute("INSERT INTO paper (paperId,title,abstract) VALUES (%s, %s, %s)", row)

            connection.commit()
        except mysql.connector.Error as error:
            print("Failed to insert into MySQL table {}".format(error))
            pass
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    def insert_csv2table_reviewers(self):
        try:
            csv_file_path = 'content/reviewers_file2insert.csv'  # the reviewers file : reviewerId,email,name
            connection = mysql.connector.connect(host=self.h,
                                                 database=self.d,
                                                 user=self.u,
                                                 password=self.pw)
            cursor = connection.cursor()
            with open(csv_file_path, mode='r') as csvfile:
                reader = csv.reader(csvfile)
                next(reader)  # Skip the header row
                for row in reader:
                    cursor.execute("INSERT INTO reviewers (reviewerId,email,name) VALUES (%s, %s, %s)", row)
            connection.commit()
        except mysql.connector.Error as error:
            print("Failed to insert into MySQL table {}".format(error))
            pass
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    def insert_into_conferences(self, confId, uId, author, title, acronym, webpage,
                                city, country, firstday, lastday, primarea, secondarea, organizer, start_rec,
                                finished_rec):
        try:
            connection = mysql.connector.connect(host=self.h,
                                                 database=self.d,
                                                 user=self.u,
                                                 password=self.pw)
            cursor = connection.cursor()
            insert_query = """INSERT INTO conferences (conferenceId, userId, author, title, acronym, webpage, 
            city, country, firstday, lastday, primaryarea, secondaryarea, organizer, start_recommendation, 
            finished_recommendation) VALUES (%s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s, %s) """

            record = (confId, uId, author, title, acronym, webpage, city, country, firstday, lastday, primarea,
                      secondarea, organizer, start_rec, finished_rec)
            cursor.execute(insert_query, record)
            connection.commit()
        except mysql.connector.Error as error:
            print("Failed to insert into MySQL table {}".format(error))
            pass
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    def insert_into_conferencetopapers(self, confId, pId):
        try:
            connection = mysql.connector.connect(host=self.h,
                                                 database=self.d,
                                                 user=self.u,
                                                 password=self.pw)
            cursor = connection.cursor()
            insert_query = """INSERT INTO conferencetopapers (conferenceId, paperId) VALUES (%s, %s) """

            record = (confId, pId)
            cursor.execute(insert_query, record)
            connection.commit()
        except mysql.connector.Error as error:
            print("Failed to insert into MySQL table {}".format(error))
            pass
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    def insert_into_recommendations(self, revId, confId):
        try:
            connection = mysql.connector.connect(host=self.h,
                                                 database=self.d,
                                                 user=self.u,
                                                 password=self.pw)
            cursor = connection.cursor()
            insert_query = """INSERT INTO recommendations (reviewerId, conferenceId, 
                                assignment1, assignment2, assignment3) VALUES (%s, %s, NULL, NULL, NULL) """

            record = (revId, confId)
            cursor.execute(insert_query, record)
            connection.commit()
        except mysql.connector.Error as error:
            print("Failed to insert into MySQL table {}".format(error))
            pass
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    def update_recommendations(self, revId, confId, assign1, assign2, assign3):
        try:
            connection = mysql.connector.connect(host=self.h,
                                                 database=self.d,
                                                 user=self.u,
                                                 password=self.pw)
            cursor = connection.cursor()
            insert_query = """UPDATE recommendations SET assignment1 = %s, assignment2 = %s, assignment3 = %s 
                            WHERE reviewerId = %s AND conferenceId = %s """

            input_data = (int(assign1), int(assign2), int(assign3), int(revId), int(confId))
            cursor.execute(insert_query, input_data)
            connection.commit()
        except mysql.connector.Error as error:
            print("Failed to Update MySQL table {}".format(error))
            pass
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    def update_conferences(self, confId):
        try:
            connection = mysql.connector.connect(host=self.h,
                                                 database=self.d,
                                                 user=self.u,
                                                 password=self.pw)
            cursor = connection.cursor()
            insert_query = """UPDATE conferences SET finished_recommendation = '1' WHERE conferenceId = %s """

            cursor.execute(insert_query, (confId,))
            connection.commit()
        except mysql.connector.Error as error:
            print("Failed to Update MySQL table {}".format(error))
            pass
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    # Select confs that the user has finished setup and requested to start and has not completed yet.
    def select_from_conferences(self):
        try:
            connection = mysql.connector.connect(host=self.h,
                                                 database=self.d,
                                                 user=self.u,
                                                 password=self.pw)
            cursor = connection.cursor()
            query = ("SELECT conferenceId FROM conferences "
                     "WHERE start_recommendation = '1' AND finished_recommendation = '0' ")
            cursor.execute(query)
            myresult = cursor.fetchall()

        except mysql.connector.Error as error:
            # print("Failed to insert into MySQL table {}".format(error))
            pass
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
        return myresult

    def select_from_conferencetopapers(self, conf_id):
        try:
            connection = mysql.connector.connect(host=self.h,
                                                 database=self.d,
                                                 user=self.u,
                                                 password=self.pw)
            cursor = connection.cursor()
            query = "SELECT paperId FROM conferencetopapers WHERE conferenceId = %s "
            cursor.execute(query, (conf_id,))
            myresult = cursor.fetchall()
        except mysql.connector.Error as error:
            pass
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
        return myresult

    def select_from_paper(self, pid):
        try:
            connection = mysql.connector.connect(host=self.h,
                                                 database=self.d,
                                                 user=self.u,
                                                 password=self.pw)
            cursor = connection.cursor()
            query = "SELECT * FROM paper WHERE paperId = %s "
            cursor.execute(query, (pid,))
            myresult = cursor.fetchall()
        except mysql.connector.Error as error:
            pass
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
        return myresult

    def select_from_recommendations(self, confId):
        try:
            connection = mysql.connector.connect(host=self.h,
                                                 database=self.d,
                                                 user=self.u,
                                                 password=self.pw)
            cursor = connection.cursor()
            query = "SELECT reviewerId FROM recommendations WHERE conferenceId = %s"
            cursor.execute(query, (confId,))
            myresult = cursor.fetchall()
        except mysql.connector.Error as error:
            pass
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
        return myresult

    def select_from_reviewers(self, revId):
        try:
            connection = mysql.connector.connect(host=self.h,
                                                 database=self.d,
                                                 user=self.u,
                                                 password=self.pw)
            cursor = connection.cursor()
            query = "SELECT reviewerId, name FROM reviewers WHERE reviewerId = %s"
            cursor.execute(query, (revId,))
            myresult = cursor.fetchall()
        except mysql.connector.Error as error:
            pass
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
        return myresult

    def delete_rows_from_conferencetopapers(self):
        try:
            connection = mysql.connector.connect(host=self.h,
                                                 database=self.d,
                                                 user=self.u,
                                                 password=self.pw)
            cursor = connection.cursor()
            sql_Delete_query = """Delete from conferencetopapers where conferenceId = 1"""
            cursor.execute(sql_Delete_query)
            connection.commit()
        except mysql.connector.Error as error:
            print("Failed to Delete Rows from MySQL table {}".format(error))
            pass
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()

    def delete_rows_from_conferences(self):
        try:
            connection = mysql.connector.connect(host=self.h,
                                                 database=self.d,
                                                 user=self.u,
                                                 password=self.pw)
            cursor = connection.cursor()
            sql_Delete_query = """Delete from conferences where conferenceId = 2"""
            cursor.execute(sql_Delete_query)
            connection.commit()
        except mysql.connector.Error as error:
            print("Failed to Delete Rows from MySQL table {}".format(error))
            pass
        finally:
            if connection.is_connected():
                cursor.close()
                connection.close()
