#!/bin/bash

API_URL="http://localhost:8000/inventory/api/items/"
JWT_TOKEN=$1

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "16",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "10",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "5",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "12",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "13",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "8",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "8",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "15",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "8",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "8",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "12",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "8",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "15",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "20",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "8",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "15",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "8",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "16",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "12",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "10",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "5",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "20",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "10",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "6",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "5",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "15",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "20",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "13",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "10",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "13",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "15",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "13",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "10",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "12",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "10",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "16",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "15",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "12",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "12",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "6",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "5",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "5",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "12",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "10",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "15",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "8",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "10",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "13",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "20",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "13",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "10",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "12",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "13",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "5",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "12",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "5",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "16",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "6",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "15",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "20",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "5",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "8",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "8",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "16",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "13",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "5",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "20",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "13",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "13",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "5",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "6",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "20",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "6",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "5",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "10",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "12",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "16",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "8",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "6",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "13",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "20",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "20",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "16",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "6",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "13",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "8",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "10",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "5",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "6",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "10",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "20",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "16",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "10",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "20",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "20",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "20",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "12",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "13",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "16",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "5",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "20",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "5",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "19",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "15",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "15",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "6",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "20",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "racket",
        "description": "Description for racket"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "12",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "8",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "8",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "9",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "13",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "15",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "11",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "16",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "14",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "15",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "4",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "pony",
        "description": "Description for pony"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "17",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "6",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "2",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "13",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "6",
        "item_name": "carpet",
        "description": "Description for carpet"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "LED",
        "description": "Description for LED"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "18",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "5",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "Playstation",
        "description": "Description for Playstation"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "1",
        "item_name": "laptop",
        "description": "Description for laptop"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "12",
        "item_name": "doll",
        "description": "Description for doll"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "16",
        "item_name": "rc car",
        "description": "Description for rc car"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "7",
        "item_name": "cleaner",
        "description": "Description for cleaner"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "16",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "12",
        "item_name": "monitor",
        "description": "Description for monitor"
    }'

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -H "Content-Type: application/json" \
    -d '{
        "client_id": "3",
        "item_name": "keybaord",
        "description": "Description for keybaord"
    }'

