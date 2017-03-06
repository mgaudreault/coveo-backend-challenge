import csv
from pymongo import MongoClient

csv.field_size_limit(1000000000)

client = MongoClient('localhost')
db = client['coveo-challenge']
cities = db.cities;

with open('../data/cities_canada-usa.tsv', 'r') as csvfile:
    csvreader = csv.reader(csvfile, delimiter='\t')
    next(csvreader)  # exclude first line
    for row in csvreader:
        city = {'name': str(row[1]), 'country_code': str(row[8]), 'longitude':float(row[5]), 'latitude':float(row[4])}
        cities.insert_one(city)
