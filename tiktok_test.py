# import requests
# import json

# # TikTok API credentials
# TIKTOK_CLIENT_KEY = 'aw0v00fwfhety9mw'
# TIKTOK_CLIENT_SECRET = 'NwfbK9M8Q6UZBZYyrAjwFIfnKb8K7NGk'
# TIKTOK_ACCESS_TOKEN = 'clt.2.QqhwQjcc6ZunFGflBN8_orcBiFTbCLg1zb0DA9OL936hJW1BivyoJmAPrxMs_UYVROsYoWJ5bkoj8gADYkcMUg*0'
# TIKTOK_BASE_URL = 'https://open.tiktokapis.com/v2/shop/'

# # Helper function to handle API requests
# def api_request(method, endpoint, payload=None):
#     url = f"{TIKTOK_BASE_URL}{endpoint}"
#     headers = {
#         'Authorization': f'Bearer {TIKTOK_ACCESS_TOKEN}',
#         'Content-Type': 'application/json',
#     }

#     if method.upper() == 'GET':
#         response = requests.get(url, headers=headers)
#     elif method.upper() == 'POST':
#         response = requests.post(url, headers=headers, data=json.dumps(payload))
#     else:
#         raise ValueError("Unsupported method. Use 'GET' or 'POaST'.")

#     try:
#         response.raise_for_status()
#         return response.json()
#     except requests.exceptions.HTTPError as err:
#         print(f"HTTP Error: {err}")
#     except json.decoder.JSONDecodeError:
#         print("Failed to parse JSON response.")
#         print(f"Response: {response.text}")
#     return None

# # List Products (TikTok Shop)
# def list_tiktok_products():
#     endpoint = "products/search"
#     response = api_request('GET', endpoint)
#     if response:
#         print(json.dumps(response, indent=4))
#     else:
#         print("No products returned or request failed.")

# # Create New Product
# def create_tiktok_product(data):
#     endpoint = "products/add"
#     response = api_request('POST', endpoint, payload=data)
#     if response:
#         print(json.dumps(response, indent=4))
#     else:
#         print("Failed to create product.")

# if __name__ == "__main__":
#     # Sample product data to create a new product
#     tiktok_product_data = {
#         "product_name": "TikTok Shop Test Product",
#         "category_id": 12345,
#         "brand": "TestBrand",
#         "description": "This is a test product for TikTok Shop API.",
#         "price": 29.99,
#         "inventory": 50,
#         "sku": "TEST123",
#         "images": ["https://example.com/product.jpg"]
#     }

#     print("Creating Product on TikTok Shop...")
#     create_tiktok_product(tiktok_product_data)

#     print("\nFetching Product List from TikTok Shop...")
#     list_tiktok_products()