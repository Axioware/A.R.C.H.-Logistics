# import requests
# import json
# import os
# from requests.auth import HTTPBasicAuth
# import logging

# # Configure logging
# logging.basicConfig(level=logging.INFO)

# # eBay API credentials (load from environment variables)
# CLIENT_ID = 'SyedHass-AR-SBX-41d19c42d-926cb907'
# CLIENT_SECRET = 'SBX-1d19c42ded8b-32a0-41eb-a629-9a3e'
# BASE_URL = 'https://api.sandbox.ebay.com/sell/inventory/v1/'
# TOKEN_URL = 'https://api.sandbox.ebay.com/identity/v1/oauth2/token'

# # Global variable to store the access token
# ACCESS_TOKEN = None

# # Function to retrieve or refresh the access token
# def get_access_token():
#     global ACCESS_TOKEN
#     logging.info("Requesting new access token...")

#     data = {
#         'grant_type': 'client_credentials',
#         'scope': 'https://api.ebay.com/oauth/api_scope/sell.inventory'
#     }

#     headers = {
#         'Content-Type': 'application/x-www-form-urlencoded'
#     }

#     response = requests.post(
#         TOKEN_URL,
#         headers=headers,
#         auth=HTTPBasicAuth(CLIENT_ID, CLIENT_SECRET),
#         data=data
#     )

#     if response.status_code == 200:
#         token_data = response.json()
#         ACCESS_TOKEN = token_data['access_token']
#         logging.info("Access token retrieved successfully.")
#         return ACCESS_TOKEN
#     else:
#         logging.error(f"Failed to get token: {response.status_code} - {response.text}")
#         raise Exception("Unable to retrieve access token.")

# # Helper function to handle API requests
# def api_request(method, endpoint, payload=None):
#     global ACCESS_TOKEN
#     if not ACCESS_TOKEN:
#         get_access_token()

#     url = f"{BASE_URL}{endpoint}"
#     headers = {
#         'Authorization': f'Bearer {ACCESS_TOKEN}',
#         'Content-Type': 'application/json',
#     }

#     try:
#         if method.upper() == 'GET':
#             response = requests.get(url, headers=headers)
#         elif method.upper() == 'POST':
#             response = requests.post(url, headers=headers, data=json.dumps(payload))
#         else:
#             raise ValueError("Unsupported method. Use 'GET' or 'POST'.")

#         if response.status_code == 401:  # Token expired or invalid
#             logging.warning("Access token expired. Refreshing token...")
#             get_access_token()
#             return api_request(method, endpoint, payload)  # Retry with new token

#         response.raise_for_status()
#         return response.json()

#     except requests.exceptions.RequestException as e:
#         logging.error(f"API request failed: {e}")
#         return None

# # Test GET Inventory Item
# def get_inventory_item(sku):
#     endpoint = f"inventory_item/{sku}"
#     response = api_request('GET', endpoint)
#     if response:
#         print(json.dumps(response, indent=4))

# # Test POST (Create or Update) Inventory Item
# def create_inventory_item(sku, data):
#     endpoint = f"inventory_item/{sku}"
#     response = api_request('POST', endpoint, payload=data)
#     if response:
#         print(json.dumps(response, indent=4))

# if __name__ == "__main__":
#     test_sku = 'test-sku-001'

#     # Sample data for inventory item
#     inventory_data = {
#         "availability": {
#             "shipToLocationAvailability": {
#                 "quantity": 100
#             }
#         },
#         "condition": "NEW",
#         "product": {
#             "title": "Test Product",
#             "description": "This is a test product for eBay API.",
#             "aspects": {
#                 "Brand": ["Generic"],
#                 "Type": ["Test Type"]
#             }
#         }
#     }

#     print("Creating/Updating Inventory Item...")
#     create_inventory_item(test_sku, inventory_data)

#     print("Fetching Inventory Item...")
#     get_inventory_item(test_sku)