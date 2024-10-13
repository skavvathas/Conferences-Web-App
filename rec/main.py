
# Author: Vaios Stergiopoulos, PhD candidate in UTH, GR
# Date: May 2024

import time
import pandas as pd
import regex as re
import tensorflow as tf
import tensorflow_hub as hub    # first run command: !pip install --upgrade tensorflow_hub
import tensorflow_text as text  # first run command: !pip install tensorflow_text
from sklearn.metrics.pairwise import cosine_similarity
import datetime
import numpy as np
from r2p_utils import *
from db_utils import DButils
from reviewer import Reviewer

# Database information
host = 'localhost'
database = 'Put_your_own_database'
user = 'Put_your_own_user'
password = 'Put_your_own_password'
# create the object for the database
db_object = DButils(host, database, user, password)

if __name__ == '__main__':
    print("Start time: ", datetime.datetime.now())

    preprocessor = hub.KerasLayer("https://tfhub.dev/tensorflow/bert_en_uncased_preprocess/3")
    print("Preprocessor loaded")
    encoder = hub.KerasLayer("https://tfhub.dev/tensorflow/small_bert/bert_en_uncased_L-2_H-128_A-2/1", trainable=True)
    print("Encoder loaded\n")

    # initial test connection to database
    db_object.connect_to_db()
    # Insert data into recommendations table
    # for x in range(1, 222):
    #    db_object.update_recommendations(x, 1, 0, 0, 0)

    # Basic Loop of the application
    # it checks permanently for new conferences (that have the start flag = 1 and stop flag = 0)
    while True:
        # retrieve the conferences id (that have start flag = 1 and stop flag = 0)
        confs = db_object.select_from_conferences()
        if len(confs) == 0:
            print("\nNo new conferences found!")
            print("current time: ", datetime.datetime.now())
            time.sleep(300)  # the code waits 5 minutes before checking again
            continue
        for conf in confs:  # conf is a tuple
            confId = conf[0]  # in the first position is the confId
            # retrieve the candidate papers for the conference
            temp_papers = db_object.select_from_conferencetopapers(confId)  # returns a list of tuples
            papersIds = []
            for t in temp_papers:  # t is a tuple: (pId, )
                pId = t[0]
                papersIds.append(pId)  # list with paperIds
            pids = []
            titles = []
            abs = []
            for p in papersIds:
                paper_data = db_object.select_from_paper(p)  # paper_data is a list of a tuple: (paperId,title,abstract)
                p_tuple = paper_data[0]
                pids.append(p_tuple[0])
                titles.append(p_tuple[1])
                abs.append(p_tuple[2])
            # dictionary of lists
            new_dict = {'id': pids, 'title': titles, 'abstract': abs}  # id,title,abstract
            df = load_data_dict2dataframe(new_dict)  # the df with the papers data

            # retrieve the reviewers for the conference and create their research profiles
            my_results = db_object.select_from_recommendations(confId)  # find the reviewerIds for current conference
            rev_names_list = []
            for r in my_results:
                temp = r[0]
                reviewer = db_object.select_from_reviewers(temp)  # retrieve the name
                revy = reviewer[0]
                rev_names_list.append(revy)  # rev_names_list is a list of tuples : (revId, name)

            # create the researchers profile using her/his name
            # create two lists : rev_id and research
            rIds_list = []
            res_list = []
            for r in rev_names_list:
                print(str(r[0]) + ' ' + str(r[1]))
                obj1 = Reviewer(r[0], r[1])  # revId, name
                research_profile = obj1.create_profile()
                rIds_list.append(r[0])
                res_list.append(research_profile)

            # dictionary of lists
            my_dict = {'r_id': rIds_list, 'research': res_list}
            df_reviewers = pd.DataFrame(my_dict)

            # create a list of the paper ids
            paper_ids_list = list(df["id"])  # df has 3 columns : id,title,abstract

            # create a dictionary like (key: value) = (paper id: 3)
            paper_assignments_counter_dictionary = {}
            for pid in paper_ids_list:
                paper_assignments_counter_dictionary[pid] = 3

            researchers2papers_assignment = {}  # dict with key:value = researcherId:list with 3 paperIds

            # df holds the papers to be assigned for peer review
            df['encodings'] = df['merged'].apply(lambda x: get_bert_embeddings(x, preprocessor, encoder))

            # iterate through each row and select 0th and 1st index column respectively
            # the researchers file has only two columns:   0,1  -  id,research
            for i in range(len(df_reviewers)):
                researcher_id, researcher_profile = df_reviewers.iloc[i, 0], df_reviewers.iloc[i, 1]

                query_encoding = get_bert_embeddings(researcher_profile, preprocessor, encoder)
                df['similarity_score'] = (df['encodings'].apply(lambda x: cosine_similarity(x, query_encoding)[0][0]))

                # The highest similarity will be on top position and the list will be sorted to the lowest
                df_results = df.sort_values(by=['similarity_score'], ascending=False)

                # df_results_part = df_results[["id", "similarity_score"]]  # id here is the paper id
                # df_results_part[:20].to_csv('rec2' + str(researcher_id) + '.csv', header=True, index=False)

                df_results_part_list = df_results["id"].tolist()  # select a dataframe's column and convert it to a list
                papers2assign = []  # we start assigning from top of the list (highest similarity)
                # Update the assignments counter (each paper has to be assigned in 3 reviewers)

                for p in df_results_part_list:
                    # check each paper to how many researchers has been assigned
                    if p in paper_assignments_counter_dictionary:
                        temp = paper_assignments_counter_dictionary[p]  # temp = 3,2,1,0
                    else:
                        temp = -1
                        continue
                    if temp > 0:
                        papers2assign.append(p)
                        temp = temp - 1
                        paper_assignments_counter_dictionary[p] = temp
                    if temp == 0:  # we delete the current paper from the counter dict, if it is assigned to 3 revs
                        if p in paper_assignments_counter_dictionary:
                            del paper_assignments_counter_dictionary[p]

                    if len(papers2assign) == 3:
                        break
                # Assign 3 papers to each reviewer (but in the end of the process there may be two or one available)
                if len(papers2assign) > 0:
                    researchers2papers_assignment[researcher_id] = papers2assign
                    if len(papers2assign) == 3:
                        db_object.update_recommendations(int(researcher_id), confId,
                                                         papers2assign[0], papers2assign[1], papers2assign[2])
                    elif len(papers2assign) == 2:
                        db_object.update_recommendations(int(researcher_id), confId,
                                                         papers2assign[0], papers2assign[1], 0)
                    elif len(papers2assign) == 1:
                        db_object.update_recommendations(int(researcher_id), confId,
                                                         papers2assign[0], 0, 0)

            db_object.update_conferences(confId)
            print(researchers2papers_assignment)

        print("\ncurrent time: ", datetime.datetime.now())
