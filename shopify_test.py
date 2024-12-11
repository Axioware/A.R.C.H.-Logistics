import requests

# Shopify Store details
SHOPIFY_STORE_URL = "d5c9db.myshopify.com"  # Replace with your store name
ACCESS_TOKEN = "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"  # Replace with your access token

# Shopify GraphQL API endpoint
GRAPHQL_URL = f"https://{SHOPIFY_STORE_URL}/admin/api/2023-10/graphql.json"

# GraphQL query to fetch orders
orders_query = """
query {
  orders(first: 10) {
    edges {
      node {
        id
        createdAt
        totalPrice
        customer {
          firstName
          lastName
        }
      }
    }
  }
}
"""

# GraphQL query to fetch inventory
inventory_query = """
query {
  inventoryItems(first: 10) {
    edges {
      node {
        id
        sku
        quantity
        product {
          id
          title
        }
      }
    }
  }
}
"""

# Function to fetch orders
def fetch_orders():
    headers = {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ACCESS_TOKEN
    }
    response = requests.post(GRAPHQL_URL, json={"query": orders_query}, headers=headers)
    print(f"Response Status Code: {response.status_code}")  # Print the status code
    
    if response.status_code == 200:
        data = response.json()
        print("Orders Data:")
        for edge in data.get("data", {}).get("orders", {}).get("edges", []):
            node = edge.get("node", {})
            # Check if customer exists
            customer = node.get("customer")
            if customer:
                first_name = customer.get("firstName", "N/A")
                last_name = customer.get("lastName", "N/A")
                customer_name = f"{first_name} {last_name}"
            else:
                customer_name = "N/A"
            
            print(f"Order ID: {node['id']}, Created At: {node['createdAt']}, Total Price: {node['totalPrice']}, Customer: {customer_name}")
    else:
        print(f"Error Response: {response.text}")

# Function to fetch inventory data
def fetch_inventory():
    headers = {
        "Content-Type": "application/json",
        "X-Shopify-Access-Token": ACCESS_TOKEN
    }
    response = requests.post(GRAPHQL_URL, json={"query": inventory_query}, headers=headers)
    print(f"Response Status Code: {response.status_code}")  # Print the status code
    
    if response.status_code == 200:
        data = response.json()
        print("Inventory Data:")
        for edge in data.get("data", {}).get("inventoryItems", {}).get("edges", []):
            node = edge.get("node", {})
            product = node.get("product", {})
            product_title = product.get("title", "No Title")
            print(f"Inventory ID: {node['id']}, SKU: {node['sku']}, Quantity: {node['quantity']}, Product: {product_title}")
    else:
        print(f"Error Response: {response.text}")

# Execute the functions
fetch_orders()
fetch_inventory()

