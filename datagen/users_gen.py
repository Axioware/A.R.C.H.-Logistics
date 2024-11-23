import random
import string

def random_string(length=8):
    """Generate a random string of letters and digits."""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def random_phone():
    """Generate a random 10-digit phone number."""
    return ''.join(random.choices(string.digits, k=10))

def random_role():
    """Randomly choose a role."""
    return random.choice(["Client", "Virtual Assistant", "Prep Team"])

def generate_shell_script():
    # File to write the shell script
    file_name = "create_users.sh"
    
    # API details
    api_endpoint = "http://localhost:8000/users/api/users/"
    auth_token = "$1"

    with open(file_name, "w") as file:
        file.write("#!/bin/bash\n\n")
        file.write(f"# API URL\nURL=\"{api_endpoint}\"\n\n")
        file.write(f"# JWT token for authorization\nAUTH_TOKEN={auth_token}\n\n")

        # Generate 105 users
        for i in range(105):
            username = random_string(8)
            first_name = random_string(5).capitalize()
            last_name = random_string(7).capitalize()
            email = f"{username}@example.com"
            phone = random_phone()
            llc_name = f"{first_name} LLC"
            tax_id = ''.join(random.choices(string.digits, k=8))
            role = random_role()
            address = f"{random.randint(1, 9999)} {random_string(5).capitalize()} Street"
            city = "New York"
            state = "NY"
            zip_code = ''.join(random.choices(string.digits, k=5))
            billing_type = random.choice(["Daily", "Monthly", "Bimonthly"])

            # JSON data for each user
            json_data = f"""'{{
                "username": "{username}",
                "first_name": "{first_name}",
                "last_name": "{last_name}",
                "email": "{email}",
                "phone": "{phone}",
                "llc_name": "{llc_name}",
                "tax_id": "{tax_id}",
                "email2": "{username}_secondary@example.com",
                "password": "password123",
                "role": "{role}",
                "address": "{address}",
                "city": "{city}",
                "state": "{state}",
                "zip": "{zip_code}",
                "billing_type": "{billing_type}"
            }}'"""

            # Write the curl command for the user
            file.write(f"curl -X POST $URL \\\n")
            file.write(f"    -H \"Content-Type: application/json\" \\\n")
            file.write(f"    -H \"Authorization: Bearer $AUTH_TOKEN\" \\\n")
            file.write(f"    -d {json_data}\n\n")
            file.write(f"echo \"Request sent for user {username}\"\n\n")

    print(f"Shell script '{file_name}' generated successfully.")

# Generate the shell script
generate_shell_script()