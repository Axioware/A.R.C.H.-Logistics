import random
import string
from datetime import datetime, timedelta

def random_string(length=8):
    """Generate a random string of letters and digits."""
    return ''.join(random.choices(string.ascii_letters + string.digits, k=length))

def random_tracking_id():
    """Generate a random tracking ID."""
    return f"tracking_{random.randint(100, 999)}_{random_string(5)}"

def random_date_received():
    """Generate a random date within the last 30 days."""
    start_date = datetime.now() - timedelta(days=30)
    random_date = start_date + timedelta(days=random.randint(0, 30))
    return random_date.strftime("%Y-%m-%dT%H:%M:%S")

def random_boolean():
    """Randomly choose True or False."""
    return random.choice([True, False])

def generate_shell_script():
    # File to write the shell script
    file_name = "create_trackings.sh"
    
    # API details
    api_endpoint = "http://localhost:8000/orders/api/trackings/"
    auth_token = "$1"

    with open(file_name, "w") as file:
        file.write("#!/bin/bash\n\n")
        file.write(f"# API URL\nAPI_URL=\"{api_endpoint}\"\n\n")
        file.write(f"# JWT token for authorization\nJWT_TOKEN={auth_token}\n\n")
        file.write("# Image file to be uploaded (make sure it's in the same directory as this script)\nIMAGE_FILE=\"boxes.jpg\"\n\n")

        # Generate 105 tracking records
        for i in range(1, 106):
            tracking_id = random_tracking_id()
            client_id = random.randint(1, 10)  # Assuming client IDs range from 1 to 10
            date_received = random_date_received()
            completed = random_boolean()
            assigned = random_boolean()

            # Write the curl command for the tracking
            file.write(f"TRACKING_ID_{i}=\"{tracking_id}\"\n")
            file.write(f"CLIENT_ID_{i}={client_id}\n")
            file.write(f"DATE_RECEIVED_{i}=\"{date_received}\"\n\n")

            file.write(f"curl -X POST \"$API_URL\" \\\n")
            file.write(f"    -H \"Authorization: Bearer $JWT_TOKEN\" \\\n")
            file.write(f"    -F \"tracking_id=$TRACKING_ID_{i}\" \\\n")
            file.write(f"    -F \"client_id=$CLIENT_ID_{i}\" \\\n")
            file.write(f"    -F \"date_received=$DATE_RECEIVED_{i}\" \\\n")
            file.write(f"    -F \"images=@$IMAGE_FILE\" \\\n")
            file.write(f"    -F \"completed={str(completed).title()}\" \\\n")
            file.write(f"    -F \"assigned={str(assigned).title()}\" \\\n")
            file.write(f"    -H \"Accept: application/json\"\n\n")
            file.write(f"echo \"Request sent for tracking $TRACKING_ID_{i}\"\n\n")

    print(f"Shell script '{file_name}' generated successfully.")

# Generate the shell script
generate_shell_script()
