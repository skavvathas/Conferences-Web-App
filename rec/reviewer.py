# Author: Vaios Stergiopoulos, PhD Candidate in UTH, GR
# Date: Jun 2024

import os
import pandas as pd
import csv
from fuzzywuzzy import fuzz


class Reviewer:

    def __init__(self, r_id, a_name):
        self.reviewerId = r_id  # Int
        self.a_name = a_name  # String

    # a, b are the two names and lastnames we need to compare.
    # a: the name of the current reviewer, b: the name of the researcher of AMiner
    def calculate_fuzzy_score(self, b_name):
        a = str(self.a_name)
        b = str(b_name)
        # compares the similarity of two strings by calculating the number of matching characters
        # divided by the total number of characters in both strings
        simple_token_ratio = fuzz.ratio(a, b)
        # compares the similarity of two strings after sorting the tokens (words) alphabetically
        token_sort_ratio = fuzz.token_sort_ratio(a, b)
        # max of two scores
        max_token_ratio = max(simple_token_ratio, token_sort_ratio)
        return max_token_ratio

    def add_paper2profile(self, research_profile, a_paper):  # a_paper is a string with keywords from a publication
        a_paper = a_paper.lower()
        research_profile += ' '
        research_profile += a_paper

    def create_profile(self):
        prof = ''
        x = self.a_name.split()
        reviewer_lastname = x[-1]
        first_char = reviewer_lastname[0]
        # select the right file to search iaw the first letter of the lastname
        item = first_char + '_researchers.csv'

        current_dir = os.getcwd()
        file_path = os.path.join(current_dir, 'data', 'alphabetical_researchers', item)
        df = pd.read_csv(file_path)

        # df = pd.read_csv('data/alphabetical_researchers/' + item)

        name_text = df[['name', 'text']]
        name_text.fillna({'name': 'xxx', 'text': 'xxx'})
        # print(name_text.head())
        # iterate through each row and select
        for i in range(len(name_text)):
            n = name_text.loc[i, "name"]
            research_text = name_text.loc[i, "text"]
            score = self.calculate_fuzzy_score(n)
            if score > 89:
                # print(n + ", " + research_text + ", " + str(score))
                research_text = research_text.lower()
                prof = prof + ' ' + research_text
        return prof

