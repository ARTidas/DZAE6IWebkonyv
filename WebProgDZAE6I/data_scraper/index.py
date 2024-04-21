import json
import requests
from bs4 import BeautifulSoup
from pymongo import MongoClient

# Function to scrape data from website and output to a JSON file
def scrape_and_save_to_json():
    response = requests.get(
        'https://drones.cnas.org/drones/',
        headers = {
            'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.3'
        }
    )

    if response.status_code == 200:
        soup = BeautifulSoup(response.content, 'html.parser')

        drones_list = []

        for drone_box in soup.find_all('div', class_='drone-box'):
            country     = drone_box['data-country']
            drone_id    = drone_box['id']
            details_div = drone_box.find('div', class_='drone-details')
            company     = details_div.find('dt', text='Company').find_next_sibling('dd').text.strip()
            platform    = details_div.find('dt', text='Platform').find_next_sibling('dd').text.strip()
            endurance   = details_div.find('dt', text='Endurance').find_next_sibling('dd').text.strip()
            range_      = details_div.find('dt', text='Range').find_next_sibling('dd').text.strip()
            payload     = details_div.find('dt', text='Payload cap.').find_next_sibling('dd').text.strip()
            max_speed   = details_div.find('dt', text='Max speed').find_next_sibling('dd').text.strip()

            drone_data = {
                'country'   : country,
                'drone_id'  : drone_id,
                'company'   : company,
                'platform'  : platform,
                'endurance' : endurance,
                'range'     : range_,
                'payload'   : payload,
                'max_speed' : max_speed
            }

            drones_list.append(drone_data)

        with open('drones_data.json', 'w') as json_file:
            json.dump(drones_list, json_file)

        print('OK: Data saved to drones_data.json')
    else:
        print('ERROR: Error while retrieving webpage!')

# Function to import data from JSON file and insert into MongoDB collection
def import_from_json_to_mongodb():
    with open('drones_data.json', 'r') as json_file:
        drones_list = json.load(json_file)

    mongo_uri  = 'mongodb://localhost:27017'
    client     = MongoClient(mongo_uri)
    db         = client['drones_database']
    collection = db['drones_collection']

    for drone_data in drones_list:
        collection.insert_one(drone_data)

    print('OK: Data imported into MongoDB collection')

# Main function
def main():
    # Scrape site and save data to JSON file
    # I deliberately commented out this line, not to accidentally ping the site
    # scrape_and_save_to_json()

    # Import JSON file into MongoDB collection
    import_from_json_to_mongodb()

if __name__ == '__main__':
    main()