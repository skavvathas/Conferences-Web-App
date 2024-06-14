# Author: Vaios Stergiopoulos, PhD candidate in UTH, GR
# Date: May 2024

import csv
import pandas as pd
import regex as re
import tensorflow as tf


# This method was used for testing reasons only. Not used in the final project.
def get_user_query():
    in_text = input("Input: ")
    in_text = in_text.lower()
    in_text = re.sub('[^A-Za-z0-9]+', ' ', in_text)
    return in_text


def load_reviewers(a_csv: str):  # a_csv has 2 columns: r_id,research
    in_researchers_df = pd.read_csv('content/' + a_csv)
    # convert lowercase column using apply()
    in_researchers_df['research'].apply(lambda x: x.lower())
    # print(in_researchers_df.to_string())
    return in_researchers_df


# load papers data from csv
def load_data(afilename: str):  # load the articles file : id,title,abstract
    df_yt = pd.read_csv('content/' + afilename)
    # df_yt = df_yt.drop_duplicates(subset=['title'])
    # df_yt = df_yt[['title', 'abstract']]
    # df_yt.columns = ['Title', 'Abstract']
    df_yt['cleaned_title'] = df_yt['title'].apply(lambda x: x.lower())
    df_yt['cleaned_title'] = df_yt['cleaned_title'].apply(lambda x: re.sub('[^A-Za-z0-9]+', ' ', x))

    df_yt['cleaned_abstract'] = df_yt['abstract'].apply(lambda x: x.lower())
    df_yt['cleaned_abstract'] = df_yt['cleaned_abstract'].apply(lambda x: re.sub('[^A-Za-z0-9]+', ' ', x))

    # merge two columns into a new one
    df_yt['merged'] = df_yt['cleaned_title'] + ' ' + df_yt['cleaned_abstract']
    print('\n################ \nThe papers dataframe: ')
    print(df_yt.head())
    print(df_yt.shape)
    the_columns = df_yt.columns.to_list()
    print(the_columns)
    print('################ ')
    return df_yt

def load_data_dict2dataframe(a_dict):  # load the articles: id,title,abstract
    df_yt = pd.DataFrame(a_dict)
    df_yt['cleaned_title'] = df_yt['title'].apply(lambda x: x.lower())
    df_yt['cleaned_title'] = df_yt['cleaned_title'].apply(lambda x: re.sub('[^A-Za-z0-9]+', ' ', x))

    df_yt['cleaned_abstract'] = df_yt['abstract'].apply(lambda x: x.lower())
    df_yt['cleaned_abstract'] = df_yt['cleaned_abstract'].apply(lambda x: re.sub('[^A-Za-z0-9]+', ' ', x))

    # merge two columns into a new one
    df_yt['merged'] = df_yt['cleaned_title'] + ' ' + df_yt['cleaned_abstract']
    print('\n################ \nThe papers dataframe: ')
    print(df_yt.head())
    print(df_yt.shape)
    the_columns = df_yt.columns.to_list()
    print(the_columns)
    print('################ ')
    return df_yt


def get_bert_embeddings(texty, preprocessory, encodery):
    text_input = tf.keras.layers.Input(shape=(), dtype=tf.string)
    encoder_inputs = preprocessory(text_input)
    outputs = encodery(encoder_inputs)
    embedding_model = tf.keras.Model(text_input, outputs['pooled_output'])
    sentences = tf.constant([texty])
    return embedding_model(sentences)


# This method was used for testing reasons only. Not used in the final project.
# It creates a list with this list in each cell:   25010, (145, 0.9899), (147, 0.9701), (199, 0.9545) ...
#                                                paperId, tuples like (researcherId , similarity score)
def create_paper2researcher(df1, df_results_part2, researcher_id2):  # df1=initial_df_with_papers
    # Using len to get the number of rows
    num_rows = len(df1)
    # create a list of the paper ids
    temp_list_papers = list(df1["id"])  # df has 3 columns : id,title,abstract
    paper2researcher_list = [None] * num_rows
    for i in range(num_rows):
        p_lst = [temp_list_papers[i]]  # create a list and insert as first cell the id of current paper
        paper2researcher_list[i] = p_lst  # insert the paper list to the full list
    # iterate through each row and select 'id' and 'similarity_score' column respectively.
    for ind in df_results_part2.index:
        p_id = df_results_part2['id'][ind]
        sim_score = df_results_part2['similarity_score'][ind]
        temp_tuple = (researcher_id2, sim_score)
        for each_cell in paper2researcher_list:
            paper_id = each_cell[0]  # each_cell holds a list that initially has only the paper id, in index 0
            if int(paper_id) == int(p_id):
                each_cell.append(temp_tuple)
    return paper2researcher_list
