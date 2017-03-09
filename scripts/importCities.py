#!/usr/bin/python3
# import cities db

import csv
from pymongo import MongoClient

csv.field_size_limit(1000000000)

client = MongoClient('mongodb://localhost:27017/coveo-challenge')
db = client.get_default_database()
db.drop_collection('cities')
cities = db.cities;

toImport = []
with open('../data/cities_canada-usa.tsv', 'r') as csvfile:
    csvreader = csv.reader(csvfile, delimiter='\t')
    next(csvreader)  # exclude first line
    for row in csvreader:
        city = {'name': str(row[1]), 'country_code': str(row[8]), 'admin1_code': str(row[10]), 'longitude':float(row[5]), 'latitude':float(row[4])}
        toImport.append(city)

db.cities.insert_many(toImport)
