import requests

# URL of the API endpoint
api_url = "http://localhost:8000/inventory/api/items/"

# Make the GET request to the API
bearer_token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJ0b2tlbl90eXBlIjoiYWNjZXNzIiwiZXhwIjoxNzI5MzQxMjYzLCJpYXQiOjE3MjkzMzA0NjMsImp0aSI6IjZjM2YyNjdjOWJlOTQ4NDZhZTkwZTM2NDI3Y2M5YTlhIiwidXNlcl9pZCI6MX0.hGFeuTPaLQ-PnMhSvJM0Do3eIdEtHt8rbooF7ti5jms"  # Replace with your actual token

# Headers for the GET request
headers = {
    "Authorization": f"Bearer {bearer_token}"
}

response = requests.get(api_url, headers=headers)

# Check if the request was successful
if response.status_code == 200:
    # Parse the JSON response and store it in the 'response' variable
    response = response.json()
    item_user_map = {item['item_id']: item['user_id'] for item in response['items']}

    # Save the result to a file
    with open('item_user_map.txt', 'w') as file:
        file.write(str(item_user_map))

    print("Item to User mapping:", item_user_map)
else:
    print(f"Failed to fetch data. Status code: {response.status_code}")
