import random

def generate_random_string():
    return ''.join(random.choices(['doll', 'carpet', 'cleaner', 'racket', 'pony', 'rc car', 'LED', 'laptop', 'Playstation', "keybaord", 'monitor']))

def generate_shell_script(num_requests):
    # Initialize list to store curl commands
    curl_commands = []

    # Generate curl commands
    for i in range(num_requests):
        user_id = random.randint(1, 20)  # Randomly choose a user_id between 1 and 20
        item_name = f"{generate_random_string()}"
        description = f"Description for {item_name}"

        # Prepare the curl command
        curl_command = f"""curl -X POST "$API_URL" \\
    -H "Authorization: Bearer $JWT_TOKEN" \\
    -H "Content-Type: application/json" \\
    -d '{{
        "client_id": "{user_id}",
        "item_name": "{item_name}",
        "description": "{description}"
    }}'"""

        # Add to list of commands
        curl_commands.append(curl_command)

    # Write the shell script
    with open("create_items.sh", "w") as file:
        file.write("#!/bin/bash\n\n")
        file.write("API_URL=\"http://localhost:8000/inventory/api/items/\"\n")
        file.write("JWT_TOKEN=$1\n\n")
        for command in curl_commands:
            file.write(command + "\n\n")

    print("Shell script 'create_items.sh' has been generated.")

# Generate script for 10 requests
generate_shell_script(333)
