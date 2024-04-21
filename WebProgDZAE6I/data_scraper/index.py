import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

response = requests.get(
    'https://drones.cnas.org/drones/',
    headers = {
        'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
    }
)

mongo_uri  = "mongodb://localhost:27017"
client     = MongoClient(mongo_uri)
db         = client["drones_database"]
collection = db["drones_collection"]

if response.status_code == 200:
    soup = BeautifulSoup(response.content, 'html.parser')

    for drone_box in (soup.find_all('div', class_='drone-box')):
        country     = drone_box['data-country']
        drone_id    = drone_box['id']
        details_div = drone_box.find("div", class_="drone-details")
        company     = details_div.find("dt", text="Company").find_next_sibling("dd").text
        platform    = details_div.find("dt", text="Platform").find_next_sibling("dd").text
        endurance   = details_div.find("dt", text="Endurance").find_next_sibling("dd").text
        range       = details_div.find("dt", text="Range").find_next_sibling("dd").text
        payload     = details_div.find("dt", text="Payload cap.").find_next_sibling("dd").text
        max_speed   = details_div.find("dt", text="Max speed").find_next_sibling("dd").text

        collection.insert_one(
            {
                "country"   : country,
                "drone_id"  : drone_id,
                "company"   : company,
                "platform"  : platform,
                "endurance" : endurance,
                "range"     : range,
                "payload"   : payload,
                "max_speed" : max_speed
            }
        )
        
        print(f"Country:        {country}")
        print(f"Drone ID:       {drone_id}")
        print(f"Company:        {company}")
        print(f"Platform:       {platform}")
        print(f"Endurance:      {endurance}")
        print(f"Range:          {range}")
        print(f"Payload cap.:   {payload}")
        print(f"Max speed:      {max_speed}")
        print("---")
else:
    print('Error while retrieving webpage!')
