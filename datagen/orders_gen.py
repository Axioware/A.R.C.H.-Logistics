import random
import json

import random
import string

def generate_random_string(length=10):
    # Generate a random string of the specified length
    characters = string.ascii_letters + string.digits
    random_string = ''.join(random.choices(characters, k=length))
    return random_string




def generate_body_data():
    # Randomly choose the number of items (between 1 and 10) in the body_data list
    num_items = random.randint(1, 10)
    body_data_list = []
    file_path = "/home/abdulrauf/Projects/PrepPrime/Makhimeter featurelist.pdf"

    item_client_map = {
    '2mg_1': 11, '2mg_3': 11, '5yx_1': 20, '5yx_6': 20, '7gl_1': 16, '7gl_8': 16, '88f_1': 2, '88f_89': 2, 'ayk_1': 14, 'ayk_10': 14, 'ayk_11': 14, 'ayk_12': 14, 'ayk_13': 14, 'ayk_14': 14, 'ayk_15': 14, 'ayk_16': 14, 'ayk_17': 14, 'ayk_18': 14, 'ayk_19': 14, 'ayk_2': 14, 'ayk_20': 14, 'ayk_21': 14, 'ayk_22': 14, 'ayk_23': 14, 'ayk_3': 14, 'ayk_4': 14, 'ayk_5': 14, 'ayk_6': 14, 'ayk_7': 14, 'ayk_8': 14, 'ayk_9': 14, 'ccr_1': 7, 'ccr_10': 7, 'ccr_11': 7, 'ccr_12': 7, 'ccr_13': 7, 'ccr_14': 7, 'ccr_15': 7, 'ccr_16': 7, 'ccr_17': 7, 'ccr_18': 7, 'ccr_19': 7, 'ccr_2': 7, 'ccr_3': 7, 'ccr_4': 7, 'ccr_5': 7, 'ccr_6': 7, 'ccr_7': 7, 'ccr_8': 7, 'ccr_9': 7, 'duz_1': 9, 'duz_10': 9, 'duz_11': 9, 'duz_12': 9, 'duz_13': 9, 'duz_14': 9, 'duz_15': 9, 'duz_16': 9, 'duz_17': 9, 'duz_2': 9, 'duz_3': 9, 'duz_4': 9, 'duz_5': 9, 'duz_6': 9, 'duz_7': 9, 'duz_8': 9, 'duz_9': 9, 'edl_1': 12, 'edl_10': 12, 'edl_11': 12, 'edl_12': 12, 'edl_13': 12, 'edl_14': 12, 'edl_2': 12, 'edl_3': 12, 'edl_4': 12, 'edl_5': 12, 'edl_6': 12, 'edl_7': 12, 'edl_8': 12, 'edl_9': 12, 'ert_1': 10, 'ert_10': 10, 'ert_11': 10, 'ert_12': 10, 'ert_13': 10, 'ert_2': 10, 'ert_3': 10, 'ert_4': 10, 'ert_5': 10, 'ert_6': 10, 'ert_7': 10, 'ert_8': 10, 'ert_9': 10, 'evb_1': 4, 'evb_10': 4, 'evb_11': 4, 'evb_12': 4, 'evb_13': 4, 'evb_14': 4, 'evb_15': 4, 'evb_16': 4, 'evb_17': 4, 'evb_18': 4, 'evb_19': 4, 'evb_2': 4, 'evb_20': 4, 'evb_21': 4, 'evb_22': 4, 'evb_23': 4, 'evb_24': 4, 'evb_25': 4, 'evb_3': 4, 'evb_4': 4, 'evb_5': 4, 'evb_6': 4, 'evb_7': 4, 'evb_8': 4, 'evb_9': 4, 'lpy_1': 17, 'lpy_10': 17, 'lpy_11': 17, 'lpy_12': 17, 'lpy_13': 17, 'lpy_14': 17, 'lpy_15': 17, 'lpy_16': 17, 'lpy_17': 17, 'lpy_18': 17, 'lpy_19': 17, 'lpy_2': 17, 'lpy_20': 17, 'lpy_21': 17, 'lpy_22': 17, 'lpy_23': 17, 'lpy_24': 17, 'lpy_3': 17, 'lpy_4': 17, 'lpy_5': 17, 'lpy_6': 17, 'lpy_7': 17, 'lpy_8': 17, 'lpy_9': 17, 'ncc_1': 18, 'ncc_10': 18, 'ncc_11': 18, 'ncc_12': 18, 'ncc_13': 18, 'ncc_14': 18, 'ncc_15': 18, 'ncc_16': 18, 'ncc_2': 18, 'ncc_3': 18, 'ncc_4': 18, 'ncc_5': 18, 'ncc_6': 18, 'ncc_7': 18, 'ncc_8': 18, 'ncc_9': 18, 'o10_1': 19, 'o10_11': 19, 'qwi_1': 15, 'qwi_10': 15, 'qwi_11': 15, 'qwi_12': 15, 'qwi_2': 15, 'qwi_3': 15, 'qwi_4': 15, 'qwi_5': 15, 'qwi_6': 15, 'qwi_7': 15, 'qwi_8': 15, 'qwi_9': 15, 'rwm_1': 13, 'rwm_10': 13, 'rwm_11': 13, 'rwm_12': 13, 'rwm_13': 13, 'rwm_14': 13, 'rwm_15': 13, 'rwm_2': 13, 'rwm_3': 13, 'rwm_4': 13, 'rwm_5': 13, 'rwm_6': 13, 'rwm_7': 13, 'rwm_8': 13, 'rwm_9': 13, 'rxf_1': 6, 'rxf_10': 6, 'rxf_11': 6, 'rxf_2': 6, 'rxf_3': 6, 'rxf_4': 6, 'rxf_5': 6, 'rxf_6': 6, 'rxf_7': 6, 'rxf_8': 6, 'rxf_9': 6, 'sny_1': 3, 'sny_10': 3, 'sny_11': 3, 'sny_12': 3, 'sny_13': 3, 'sny_14': 3, 'sny_15': 3, 'sny_16': 3, 'sny_17': 3, 'sny_2': 3, 'sny_3': 3, 'sny_4': 3, 'sny_5': 3, 'sny_6': 3, 'sny_7': 3, 'sny_8': 3, 'sny_9': 3, 'ssg_1': 8, 'ssg_10': 8, 'ssg_11': 8, 'ssg_12': 8, 'ssg_13': 8, 'ssg_14': 8, 'ssg_2': 8, 'ssg_3': 8, 'ssg_4': 8, 'ssg_5': 8, 'ssg_6': 8, 'ssg_7': 8, 'ssg_8': 8, 'ssg_9': 8, 'vxi_1': 5, 'vxi_10': 5, 'vxi_11': 5, 'vxi_12': 5, 'vxi_13': 5, 'vxi_14': 5, 'vxi_15': 5, 'vxi_2': 5, 'vxi_3': 5, 'vxi_4': 5, 'vxi_5': 5, 'vxi_6': 5, 'vxi_7': 5, 'vxi_8': 5, 'vxi_9': 5
    } #replace this with the new dictionary created after run gen_item_user_id_pair.py file

    

    fnsku = []

    

    for i in range(num_items):
        # Randomly select order category (1-3) and service category (1-6)
        order_category = random.choice([1, 2, 3])
        service_category = random.randint(1, 6)

        # Sample item IDs and quantities for each request
        item_ids = random.sample(list(item_client_map.keys()), random.randint(1, 3))
        # item_ids = [f"vxi_{random.randint(1, 100)}" for _ in range(random.randint(1, 3))]
        quantities = [[random.randint(1, 100), random.randint(1, 100), random.randint(1, 100)] for _ in range(len(item_ids))]
        
        # If there are multiple item_ids, include bundle_quantity; otherwise, set to 0
        if len(item_ids) > 1:
            bundle_quantity = [random.randint(1, 10) for _ in range(len(item_ids))]
        else:
            bundle_quantity = []

        # Construct each entry for body_data
        body_data_entry = {
            "item_id": item_ids,
            "service_code": str(service_category),
            "category_id": str(order_category),
            "additional_service": "Custom Packaging",
            "additional_format": "PDF",
            "additional_format_text": "Include labels",
            "quantity": quantities,
            "bundle_quantity": bundle_quantity,
            "packing_instructions": "Handle with care" if random.choice([True, False]) else "Fragile, handle with care",
            "pallet": random.choice([True, False])
        }


        body_data_list.append(body_data_entry)

    # c = item_client_map[item_ids[random.randint(1, len(item_ids))]]
    # for i in range(len(body_data_list)):
    fnsku_files_lines = ''.join([f'-F "fnsku_files[]=@{file_path}" \\\n\t' for _ in range(len(body_data_list))])

    body_data_list = json.dumps(body_data_list).replace('"', '\\"')
    return body_data_list, fnsku_files_lines

def generate_curl_command(index):
    # Generate the body_data list
    body_data, fnsku = generate_body_data()
    t = []
    for i in range(random.randint(1, 10)):
        t.append(generate_random_string())

    t = json.dumps(t).replace('"', '\\"')

    index = index % 100
    

    # Construct the curl command with the body_data JSON string
    curl_command = f'''curl -X POST $API_URL \\
    -H "Authorization: Bearer $JWT_TOKEN" \\
    -F "client_id={index}" \\
    -F "body_data={str(body_data).replace("'", '"')}" \\
    {fnsku} \\
    -F "trackings={str(t).replace("'", '"')}" '''
    
    return curl_command

# Generate the shell script with 200 requests
with open("create_services.sh", "w") as file:
    file.write("#!/bin/bash\n\n")
    file.write("#!/bin/bash\n\n")
    file.write("API_URL=\"http://localhost:8000/orders/api/orders/\"\n")
    file.write("JWT_TOKEN=$1\n\n")
    for i in range(1, 201):
        curl_command = generate_curl_command(i)
        file.write(curl_command + "\n\n")

print("Shell script 'create_services.sh' has been created with 200 curl requests.")
