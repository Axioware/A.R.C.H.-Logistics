#!/bin/bash

# API URL
URL="http://localhost:8000/users/api/users/"

# JWT token for authorization
AUTH_TOKEN=$1

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "Dx5TO5pq",
                "first_name": "Eyxz5",
                "last_name": "D3qh6rp",
                "email": "Dx5TO5pq@example.com",
                "phone": "0095546510",
                "llc_name": "Eyxz5 LLC",
                "tax_id": "43949553",
                "email2": "Dx5TO5pq_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "4593 Ggi2s Street",
                "city": "New York",
                "state": "NY",
                "zip": "17904",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user Dx5TO5pq"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "Aek4lEvH",
                "first_name": "Dadmy",
                "last_name": "Ctapway",
                "email": "Aek4lEvH@example.com",
                "phone": "9089643895",
                "llc_name": "Dadmy LLC",
                "tax_id": "95511052",
                "email2": "Aek4lEvH_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "9093 S0wtt Street",
                "city": "New York",
                "state": "NY",
                "zip": "17370",
                "billing_type": "Monthly"
            }'

echo "Request sent for user Aek4lEvH"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "XqZRnpKZ",
                "first_name": "Wypa6",
                "last_name": "Hq1ofqz",
                "email": "XqZRnpKZ@example.com",
                "phone": "4927566802",
                "llc_name": "Wypa6 LLC",
                "tax_id": "16717508",
                "email2": "XqZRnpKZ_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "2916 Kxzqd Street",
                "city": "New York",
                "state": "NY",
                "zip": "22434",
                "billing_type": "Monthly"
            }'

echo "Request sent for user XqZRnpKZ"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "helNLjZJ",
                "first_name": "8hx0u",
                "last_name": "D1bfzht",
                "email": "helNLjZJ@example.com",
                "phone": "4352102913",
                "llc_name": "8hx0u LLC",
                "tax_id": "95451251",
                "email2": "helNLjZJ_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "5242 Oxhex Street",
                "city": "New York",
                "state": "NY",
                "zip": "70019",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user helNLjZJ"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "JJwoShe0",
                "first_name": "Arcfu",
                "last_name": "Bth9qkm",
                "email": "JJwoShe0@example.com",
                "phone": "0678820048",
                "llc_name": "Arcfu LLC",
                "tax_id": "56705758",
                "email2": "JJwoShe0_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "8746 Vyxoc Street",
                "city": "New York",
                "state": "NY",
                "zip": "85531",
                "billing_type": "Monthly"
            }'

echo "Request sent for user JJwoShe0"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "gjatl98K",
                "first_name": "N3rom",
                "last_name": "Sd42tg3",
                "email": "gjatl98K@example.com",
                "phone": "4368865611",
                "llc_name": "N3rom LLC",
                "tax_id": "21289174",
                "email2": "gjatl98K_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "3958 0o74y Street",
                "city": "New York",
                "state": "NY",
                "zip": "59815",
                "billing_type": "Daily"
            }'

echo "Request sent for user gjatl98K"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "kORZDyW7",
                "first_name": "Vkrr9",
                "last_name": "E30amd7",
                "email": "kORZDyW7@example.com",
                "phone": "5551947687",
                "llc_name": "Vkrr9 LLC",
                "tax_id": "73143213",
                "email2": "kORZDyW7_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "8214 Ubkiz Street",
                "city": "New York",
                "state": "NY",
                "zip": "33387",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user kORZDyW7"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "eoyvUnDT",
                "first_name": "Gxhfx",
                "last_name": "Efdqrfh",
                "email": "eoyvUnDT@example.com",
                "phone": "7703787221",
                "llc_name": "Gxhfx LLC",
                "tax_id": "61816242",
                "email2": "eoyvUnDT_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "4089 Cuhcs Street",
                "city": "New York",
                "state": "NY",
                "zip": "27125",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user eoyvUnDT"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "nAP4GlHe",
                "first_name": "De9os",
                "last_name": "5gqc2iy",
                "email": "nAP4GlHe@example.com",
                "phone": "6651696939",
                "llc_name": "De9os LLC",
                "tax_id": "29514446",
                "email2": "nAP4GlHe_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "481 Gorse Street",
                "city": "New York",
                "state": "NY",
                "zip": "52503",
                "billing_type": "Monthly"
            }'

echo "Request sent for user nAP4GlHe"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "LWrMzRSk",
                "first_name": "5y69z",
                "last_name": "C4ipcct",
                "email": "LWrMzRSk@example.com",
                "phone": "4232390659",
                "llc_name": "5y69z LLC",
                "tax_id": "13114928",
                "email2": "LWrMzRSk_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "7614 Tsyi0 Street",
                "city": "New York",
                "state": "NY",
                "zip": "46627",
                "billing_type": "Daily"
            }'

echo "Request sent for user LWrMzRSk"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "BQupg9Lb",
                "first_name": "Rntvs",
                "last_name": "M2p06la",
                "email": "BQupg9Lb@example.com",
                "phone": "1927140088",
                "llc_name": "Rntvs LLC",
                "tax_id": "65014534",
                "email2": "BQupg9Lb_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "4302 5ztnx Street",
                "city": "New York",
                "state": "NY",
                "zip": "50175",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user BQupg9Lb"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "GzM6ao5i",
                "first_name": "Isj8q",
                "last_name": "8jqpoqt",
                "email": "GzM6ao5i@example.com",
                "phone": "4871349489",
                "llc_name": "Isj8q LLC",
                "tax_id": "94418872",
                "email2": "GzM6ao5i_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "1750 Lkc3q Street",
                "city": "New York",
                "state": "NY",
                "zip": "16258",
                "billing_type": "Monthly"
            }'

echo "Request sent for user GzM6ao5i"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "9NZMX5Td",
                "first_name": "Gjwp5",
                "last_name": "8vzb0eo",
                "email": "9NZMX5Td@example.com",
                "phone": "5642790407",
                "llc_name": "Gjwp5 LLC",
                "tax_id": "54003898",
                "email2": "9NZMX5Td_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "1546 R9smp Street",
                "city": "New York",
                "state": "NY",
                "zip": "42285",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user 9NZMX5Td"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "H0xHwkgU",
                "first_name": "9ixh8",
                "last_name": "Umfhpuu",
                "email": "H0xHwkgU@example.com",
                "phone": "5987369275",
                "llc_name": "9ixh8 LLC",
                "tax_id": "84649629",
                "email2": "H0xHwkgU_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "2829 V8ijq Street",
                "city": "New York",
                "state": "NY",
                "zip": "65253",
                "billing_type": "Monthly"
            }'

echo "Request sent for user H0xHwkgU"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "KIGm0d2k",
                "first_name": "Xu2kz",
                "last_name": "Bha7yth",
                "email": "KIGm0d2k@example.com",
                "phone": "0598925122",
                "llc_name": "Xu2kz LLC",
                "tax_id": "60543066",
                "email2": "KIGm0d2k_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "9324 O9eae Street",
                "city": "New York",
                "state": "NY",
                "zip": "79505",
                "billing_type": "Monthly"
            }'

echo "Request sent for user KIGm0d2k"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "AF4Ywzqu",
                "first_name": "E6rbu",
                "last_name": "Xyrzcfw",
                "email": "AF4Ywzqu@example.com",
                "phone": "9944415066",
                "llc_name": "E6rbu LLC",
                "tax_id": "25510444",
                "email2": "AF4Ywzqu_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "434 5x0oo Street",
                "city": "New York",
                "state": "NY",
                "zip": "94291",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user AF4Ywzqu"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "YxlEHlT1",
                "first_name": "Pr7o4",
                "last_name": "Xt9aokz",
                "email": "YxlEHlT1@example.com",
                "phone": "4458822665",
                "llc_name": "Pr7o4 LLC",
                "tax_id": "92542773",
                "email2": "YxlEHlT1_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "3422 0eimj Street",
                "city": "New York",
                "state": "NY",
                "zip": "51687",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user YxlEHlT1"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "pE6ypd3u",
                "first_name": "Eqzbv",
                "last_name": "M7xy4ie",
                "email": "pE6ypd3u@example.com",
                "phone": "8067951157",
                "llc_name": "Eqzbv LLC",
                "tax_id": "59310997",
                "email2": "pE6ypd3u_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "7483 Vy0cs Street",
                "city": "New York",
                "state": "NY",
                "zip": "65058",
                "billing_type": "Daily"
            }'

echo "Request sent for user pE6ypd3u"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "4r2EDprV",
                "first_name": "Bo6xk",
                "last_name": "Wcucyja",
                "email": "4r2EDprV@example.com",
                "phone": "3685725225",
                "llc_name": "Bo6xk LLC",
                "tax_id": "02762434",
                "email2": "4r2EDprV_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "4300 Ftcj1 Street",
                "city": "New York",
                "state": "NY",
                "zip": "18582",
                "billing_type": "Monthly"
            }'

echo "Request sent for user 4r2EDprV"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "7NRNKwAX",
                "first_name": "Gmr1l",
                "last_name": "Lq2euus",
                "email": "7NRNKwAX@example.com",
                "phone": "3852188894",
                "llc_name": "Gmr1l LLC",
                "tax_id": "65899750",
                "email2": "7NRNKwAX_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "1340 Rzoww Street",
                "city": "New York",
                "state": "NY",
                "zip": "67238",
                "billing_type": "Monthly"
            }'

echo "Request sent for user 7NRNKwAX"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "LaSe8AZj",
                "first_name": "Adae9",
                "last_name": "Nbxewvu",
                "email": "LaSe8AZj@example.com",
                "phone": "9022584602",
                "llc_name": "Adae9 LLC",
                "tax_id": "48728750",
                "email2": "LaSe8AZj_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "146 B8zzd Street",
                "city": "New York",
                "state": "NY",
                "zip": "31166",
                "billing_type": "Daily"
            }'

echo "Request sent for user LaSe8AZj"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "gjDpKHm0",
                "first_name": "D7mii",
                "last_name": "Jtorcvh",
                "email": "gjDpKHm0@example.com",
                "phone": "6768835324",
                "llc_name": "D7mii LLC",
                "tax_id": "12067209",
                "email2": "gjDpKHm0_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "9093 Cyw4x Street",
                "city": "New York",
                "state": "NY",
                "zip": "03158",
                "billing_type": "Daily"
            }'

echo "Request sent for user gjDpKHm0"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "oLQuZRf5",
                "first_name": "Qkiop",
                "last_name": "Izgwbsi",
                "email": "oLQuZRf5@example.com",
                "phone": "3811144256",
                "llc_name": "Qkiop LLC",
                "tax_id": "22158336",
                "email2": "oLQuZRf5_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "3461 Wvtvp Street",
                "city": "New York",
                "state": "NY",
                "zip": "13550",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user oLQuZRf5"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "cAD7Ykuf",
                "first_name": "Hqqtu",
                "last_name": "H00pxs9",
                "email": "cAD7Ykuf@example.com",
                "phone": "1495546254",
                "llc_name": "Hqqtu LLC",
                "tax_id": "75210904",
                "email2": "cAD7Ykuf_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "6883 Lubfj Street",
                "city": "New York",
                "state": "NY",
                "zip": "26706",
                "billing_type": "Daily"
            }'

echo "Request sent for user cAD7Ykuf"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "4pYXrD9E",
                "first_name": "Udfv1",
                "last_name": "Hovjiwl",
                "email": "4pYXrD9E@example.com",
                "phone": "7028671448",
                "llc_name": "Udfv1 LLC",
                "tax_id": "96785506",
                "email2": "4pYXrD9E_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "4464 1p6me Street",
                "city": "New York",
                "state": "NY",
                "zip": "90757",
                "billing_type": "Monthly"
            }'

echo "Request sent for user 4pYXrD9E"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "o3GdiCrj",
                "first_name": "Omit7",
                "last_name": "Xclvzii",
                "email": "o3GdiCrj@example.com",
                "phone": "0210421236",
                "llc_name": "Omit7 LLC",
                "tax_id": "73277148",
                "email2": "o3GdiCrj_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "764 Rfrpp Street",
                "city": "New York",
                "state": "NY",
                "zip": "82354",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user o3GdiCrj"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "7tCWUBDE",
                "first_name": "Rbk17",
                "last_name": "Tpjek8v",
                "email": "7tCWUBDE@example.com",
                "phone": "9837975002",
                "llc_name": "Rbk17 LLC",
                "tax_id": "86638114",
                "email2": "7tCWUBDE_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "4142 Sqhtk Street",
                "city": "New York",
                "state": "NY",
                "zip": "46203",
                "billing_type": "Monthly"
            }'

echo "Request sent for user 7tCWUBDE"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "jcaZnQv7",
                "first_name": "8kx2x",
                "last_name": "94flwbb",
                "email": "jcaZnQv7@example.com",
                "phone": "4031624988",
                "llc_name": "8kx2x LLC",
                "tax_id": "30360641",
                "email2": "jcaZnQv7_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "2021 Tis7e Street",
                "city": "New York",
                "state": "NY",
                "zip": "74799",
                "billing_type": "Daily"
            }'

echo "Request sent for user jcaZnQv7"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "DpHEKtOi",
                "first_name": "Xy9r7",
                "last_name": "Z8lxr8g",
                "email": "DpHEKtOi@example.com",
                "phone": "7042295002",
                "llc_name": "Xy9r7 LLC",
                "tax_id": "35631800",
                "email2": "DpHEKtOi_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "5531 Z6qar Street",
                "city": "New York",
                "state": "NY",
                "zip": "34050",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user DpHEKtOi"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "LLgWuMt1",
                "first_name": "S4a8u",
                "last_name": "04pbldf",
                "email": "LLgWuMt1@example.com",
                "phone": "1463838005",
                "llc_name": "S4a8u LLC",
                "tax_id": "57019228",
                "email2": "LLgWuMt1_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "3468 Glxp8 Street",
                "city": "New York",
                "state": "NY",
                "zip": "03970",
                "billing_type": "Daily"
            }'

echo "Request sent for user LLgWuMt1"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "nSJwPeA4",
                "first_name": "Wokxc",
                "last_name": "Kkyfl8x",
                "email": "nSJwPeA4@example.com",
                "phone": "8096192391",
                "llc_name": "Wokxc LLC",
                "tax_id": "05328519",
                "email2": "nSJwPeA4_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "7785 Yxlit Street",
                "city": "New York",
                "state": "NY",
                "zip": "26099",
                "billing_type": "Daily"
            }'

echo "Request sent for user nSJwPeA4"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "dMen4J2B",
                "first_name": "Pyow5",
                "last_name": "Myzlrgf",
                "email": "dMen4J2B@example.com",
                "phone": "4012113879",
                "llc_name": "Pyow5 LLC",
                "tax_id": "77155130",
                "email2": "dMen4J2B_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "8142 Liqip Street",
                "city": "New York",
                "state": "NY",
                "zip": "70862",
                "billing_type": "Daily"
            }'

echo "Request sent for user dMen4J2B"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "2rh0XumI",
                "first_name": "5gfpr",
                "last_name": "U4h6u9e",
                "email": "2rh0XumI@example.com",
                "phone": "1550807169",
                "llc_name": "5gfpr LLC",
                "tax_id": "21919217",
                "email2": "2rh0XumI_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "8718 T6twy Street",
                "city": "New York",
                "state": "NY",
                "zip": "02765",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user 2rh0XumI"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "YnulFJSf",
                "first_name": "Y2wzs",
                "last_name": "7ihjbto",
                "email": "YnulFJSf@example.com",
                "phone": "0521684526",
                "llc_name": "Y2wzs LLC",
                "tax_id": "05451678",
                "email2": "YnulFJSf_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "5754 Pkocx Street",
                "city": "New York",
                "state": "NY",
                "zip": "15089",
                "billing_type": "Monthly"
            }'

echo "Request sent for user YnulFJSf"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "ltYgQzir",
                "first_name": "Rthgn",
                "last_name": "Fbeldsb",
                "email": "ltYgQzir@example.com",
                "phone": "5672675191",
                "llc_name": "Rthgn LLC",
                "tax_id": "23812114",
                "email2": "ltYgQzir_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "7653 Ouk1g Street",
                "city": "New York",
                "state": "NY",
                "zip": "54924",
                "billing_type": "Daily"
            }'

echo "Request sent for user ltYgQzir"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "kgVobY4C",
                "first_name": "Vdx8x",
                "last_name": "Vmugq6f",
                "email": "kgVobY4C@example.com",
                "phone": "9148037203",
                "llc_name": "Vdx8x LLC",
                "tax_id": "11147273",
                "email2": "kgVobY4C_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "9128 Cps1c Street",
                "city": "New York",
                "state": "NY",
                "zip": "83431",
                "billing_type": "Monthly"
            }'

echo "Request sent for user kgVobY4C"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "4PYzoX0v",
                "first_name": "P8dxh",
                "last_name": "E4zevjy",
                "email": "4PYzoX0v@example.com",
                "phone": "6808891199",
                "llc_name": "P8dxh LLC",
                "tax_id": "83156064",
                "email2": "4PYzoX0v_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "480 J28zs Street",
                "city": "New York",
                "state": "NY",
                "zip": "21772",
                "billing_type": "Monthly"
            }'

echo "Request sent for user 4PYzoX0v"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "27Z69h2U",
                "first_name": "Phzvm",
                "last_name": "Pmlqrjl",
                "email": "27Z69h2U@example.com",
                "phone": "5709608787",
                "llc_name": "Phzvm LLC",
                "tax_id": "72590900",
                "email2": "27Z69h2U_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "6193 Stbax Street",
                "city": "New York",
                "state": "NY",
                "zip": "55011",
                "billing_type": "Daily"
            }'

echo "Request sent for user 27Z69h2U"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "sUVBH0Gs",
                "first_name": "2f98k",
                "last_name": "Lqjiw3k",
                "email": "sUVBH0Gs@example.com",
                "phone": "9974449193",
                "llc_name": "2f98k LLC",
                "tax_id": "03506534",
                "email2": "sUVBH0Gs_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "8225 Fhd8t Street",
                "city": "New York",
                "state": "NY",
                "zip": "85800",
                "billing_type": "Daily"
            }'

echo "Request sent for user sUVBH0Gs"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "rCdRd4UV",
                "first_name": "Pmchw",
                "last_name": "Knbbr1j",
                "email": "rCdRd4UV@example.com",
                "phone": "0816297476",
                "llc_name": "Pmchw LLC",
                "tax_id": "32927752",
                "email2": "rCdRd4UV_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "7023 Oix5x Street",
                "city": "New York",
                "state": "NY",
                "zip": "39084",
                "billing_type": "Monthly"
            }'

echo "Request sent for user rCdRd4UV"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "AD1cGHye",
                "first_name": "Kxlmy",
                "last_name": "Emufgct",
                "email": "AD1cGHye@example.com",
                "phone": "1243466604",
                "llc_name": "Kxlmy LLC",
                "tax_id": "07848978",
                "email2": "AD1cGHye_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "1261 D9niy Street",
                "city": "New York",
                "state": "NY",
                "zip": "10192",
                "billing_type": "Monthly"
            }'

echo "Request sent for user AD1cGHye"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "Ff3jl8LI",
                "first_name": "Yd5yy",
                "last_name": "G3wpps4",
                "email": "Ff3jl8LI@example.com",
                "phone": "5567717861",
                "llc_name": "Yd5yy LLC",
                "tax_id": "19650779",
                "email2": "Ff3jl8LI_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "3002 Ucbfd Street",
                "city": "New York",
                "state": "NY",
                "zip": "78388",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user Ff3jl8LI"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "ee0oAlXX",
                "first_name": "S2jyu",
                "last_name": "Bcuyqtf",
                "email": "ee0oAlXX@example.com",
                "phone": "0671999574",
                "llc_name": "S2jyu LLC",
                "tax_id": "50849848",
                "email2": "ee0oAlXX_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "796 Rtcgj Street",
                "city": "New York",
                "state": "NY",
                "zip": "80203",
                "billing_type": "Monthly"
            }'

echo "Request sent for user ee0oAlXX"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "MV6WTt7E",
                "first_name": "Uhrnn",
                "last_name": "Rrkqa6s",
                "email": "MV6WTt7E@example.com",
                "phone": "9686153526",
                "llc_name": "Uhrnn LLC",
                "tax_id": "36541496",
                "email2": "MV6WTt7E_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "7683 Gtgvs Street",
                "city": "New York",
                "state": "NY",
                "zip": "34935",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user MV6WTt7E"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "ah2yFMYU",
                "first_name": "Nehfn",
                "last_name": "Rn5hymd",
                "email": "ah2yFMYU@example.com",
                "phone": "7180651986",
                "llc_name": "Nehfn LLC",
                "tax_id": "21814300",
                "email2": "ah2yFMYU_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "8681 Vbttr Street",
                "city": "New York",
                "state": "NY",
                "zip": "22579",
                "billing_type": "Monthly"
            }'

echo "Request sent for user ah2yFMYU"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "4sywK0Wd",
                "first_name": "Nvczb",
                "last_name": "Hkrck5h",
                "email": "4sywK0Wd@example.com",
                "phone": "0343191468",
                "llc_name": "Nvczb LLC",
                "tax_id": "46398132",
                "email2": "4sywK0Wd_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "5960 8krqp Street",
                "city": "New York",
                "state": "NY",
                "zip": "25055",
                "billing_type": "Monthly"
            }'

echo "Request sent for user 4sywK0Wd"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "E7QXsTnv",
                "first_name": "Ai3gz",
                "last_name": "Wpsxarl",
                "email": "E7QXsTnv@example.com",
                "phone": "1722814169",
                "llc_name": "Ai3gz LLC",
                "tax_id": "59211265",
                "email2": "E7QXsTnv_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "2918 Igajv Street",
                "city": "New York",
                "state": "NY",
                "zip": "29656",
                "billing_type": "Monthly"
            }'

echo "Request sent for user E7QXsTnv"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "RDuFYRcO",
                "first_name": "V9nax",
                "last_name": "Pvzxx0h",
                "email": "RDuFYRcO@example.com",
                "phone": "1822444714",
                "llc_name": "V9nax LLC",
                "tax_id": "76965714",
                "email2": "RDuFYRcO_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "6187 Lkund Street",
                "city": "New York",
                "state": "NY",
                "zip": "62035",
                "billing_type": "Monthly"
            }'

echo "Request sent for user RDuFYRcO"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "9WEmf7bc",
                "first_name": "B8f8y",
                "last_name": "Puujzze",
                "email": "9WEmf7bc@example.com",
                "phone": "1028286137",
                "llc_name": "B8f8y LLC",
                "tax_id": "66504732",
                "email2": "9WEmf7bc_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "4041 Jbbrj Street",
                "city": "New York",
                "state": "NY",
                "zip": "49692",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user 9WEmf7bc"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "JvQpntQt",
                "first_name": "Tze2t",
                "last_name": "Ririhzl",
                "email": "JvQpntQt@example.com",
                "phone": "3619747997",
                "llc_name": "Tze2t LLC",
                "tax_id": "82211842",
                "email2": "JvQpntQt_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "4418 Mxxxj Street",
                "city": "New York",
                "state": "NY",
                "zip": "88426",
                "billing_type": "Monthly"
            }'

echo "Request sent for user JvQpntQt"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "ej2i1xRF",
                "first_name": "Skkgk",
                "last_name": "Hcxmvjx",
                "email": "ej2i1xRF@example.com",
                "phone": "2276174595",
                "llc_name": "Skkgk LLC",
                "tax_id": "15734763",
                "email2": "ej2i1xRF_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "9288 R0ozn Street",
                "city": "New York",
                "state": "NY",
                "zip": "28679",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user ej2i1xRF"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "iYAsFjRj",
                "first_name": "Cvsdu",
                "last_name": "Zjaaqbl",
                "email": "iYAsFjRj@example.com",
                "phone": "6804504840",
                "llc_name": "Cvsdu LLC",
                "tax_id": "55730413",
                "email2": "iYAsFjRj_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "8280 Qoeir Street",
                "city": "New York",
                "state": "NY",
                "zip": "78094",
                "billing_type": "Monthly"
            }'

echo "Request sent for user iYAsFjRj"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "S2zyUzhP",
                "first_name": "Lrlux",
                "last_name": "756wnnz",
                "email": "S2zyUzhP@example.com",
                "phone": "7827733653",
                "llc_name": "Lrlux LLC",
                "tax_id": "33414078",
                "email2": "S2zyUzhP_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "916 By9eb Street",
                "city": "New York",
                "state": "NY",
                "zip": "67849",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user S2zyUzhP"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "wfT2jeii",
                "first_name": "Enzwj",
                "last_name": "Z5fv2km",
                "email": "wfT2jeii@example.com",
                "phone": "6059515292",
                "llc_name": "Enzwj LLC",
                "tax_id": "69262150",
                "email2": "wfT2jeii_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "1030 E0ohk Street",
                "city": "New York",
                "state": "NY",
                "zip": "36988",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user wfT2jeii"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "r94Id5gG",
                "first_name": "8pbf8",
                "last_name": "Xhe9yat",
                "email": "r94Id5gG@example.com",
                "phone": "9906344693",
                "llc_name": "8pbf8 LLC",
                "tax_id": "13816006",
                "email2": "r94Id5gG_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "3826 Axim2 Street",
                "city": "New York",
                "state": "NY",
                "zip": "13519",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user r94Id5gG"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "GFSoCaqw",
                "first_name": "Qim3m",
                "last_name": "Wlmvosf",
                "email": "GFSoCaqw@example.com",
                "phone": "2223811406",
                "llc_name": "Qim3m LLC",
                "tax_id": "53906157",
                "email2": "GFSoCaqw_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "9270 Ubrbc Street",
                "city": "New York",
                "state": "NY",
                "zip": "44009",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user GFSoCaqw"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "NAbCcSHC",
                "first_name": "K9jpf",
                "last_name": "Cjsrkwh",
                "email": "NAbCcSHC@example.com",
                "phone": "4625769160",
                "llc_name": "K9jpf LLC",
                "tax_id": "85889462",
                "email2": "NAbCcSHC_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "5406 T54i8 Street",
                "city": "New York",
                "state": "NY",
                "zip": "56694",
                "billing_type": "Daily"
            }'

echo "Request sent for user NAbCcSHC"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "qRZrwpCp",
                "first_name": "Fv2cd",
                "last_name": "F401wuy",
                "email": "qRZrwpCp@example.com",
                "phone": "9971342916",
                "llc_name": "Fv2cd LLC",
                "tax_id": "15532416",
                "email2": "qRZrwpCp_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "3506 Lezoh Street",
                "city": "New York",
                "state": "NY",
                "zip": "12695",
                "billing_type": "Monthly"
            }'

echo "Request sent for user qRZrwpCp"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "W65aDBH0",
                "first_name": "Vj7ey",
                "last_name": "Lczywk3",
                "email": "W65aDBH0@example.com",
                "phone": "9843886915",
                "llc_name": "Vj7ey LLC",
                "tax_id": "53855879",
                "email2": "W65aDBH0_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "2292 Iblnf Street",
                "city": "New York",
                "state": "NY",
                "zip": "38095",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user W65aDBH0"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "ud0z6HEu",
                "first_name": "Af1hf",
                "last_name": "Ptkcqt8",
                "email": "ud0z6HEu@example.com",
                "phone": "1883063650",
                "llc_name": "Af1hf LLC",
                "tax_id": "54302572",
                "email2": "ud0z6HEu_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "766 Kwexu Street",
                "city": "New York",
                "state": "NY",
                "zip": "45863",
                "billing_type": "Monthly"
            }'

echo "Request sent for user ud0z6HEu"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "VsBNUqHO",
                "first_name": "Lbzx0",
                "last_name": "Md49qiu",
                "email": "VsBNUqHO@example.com",
                "phone": "5488521307",
                "llc_name": "Lbzx0 LLC",
                "tax_id": "95378013",
                "email2": "VsBNUqHO_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "2940 V0ksf Street",
                "city": "New York",
                "state": "NY",
                "zip": "12139",
                "billing_type": "Monthly"
            }'

echo "Request sent for user VsBNUqHO"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "M6zyBTtJ",
                "first_name": "N1zq8",
                "last_name": "Zatwo23",
                "email": "M6zyBTtJ@example.com",
                "phone": "5468928900",
                "llc_name": "N1zq8 LLC",
                "tax_id": "82547043",
                "email2": "M6zyBTtJ_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "8790 Mamef Street",
                "city": "New York",
                "state": "NY",
                "zip": "79305",
                "billing_type": "Monthly"
            }'

echo "Request sent for user M6zyBTtJ"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "n1n9VkPk",
                "first_name": "Ejwfg",
                "last_name": "O9ljxzx",
                "email": "n1n9VkPk@example.com",
                "phone": "4249543908",
                "llc_name": "Ejwfg LLC",
                "tax_id": "44934242",
                "email2": "n1n9VkPk_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "8247 Msxsc Street",
                "city": "New York",
                "state": "NY",
                "zip": "89730",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user n1n9VkPk"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "ARufAWC7",
                "first_name": "I1tsk",
                "last_name": "P3zuaz5",
                "email": "ARufAWC7@example.com",
                "phone": "5252518461",
                "llc_name": "I1tsk LLC",
                "tax_id": "03374278",
                "email2": "ARufAWC7_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "1308 4gurh Street",
                "city": "New York",
                "state": "NY",
                "zip": "02690",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user ARufAWC7"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "qVqnqVGQ",
                "first_name": "Isdtz",
                "last_name": "Jgpwqux",
                "email": "qVqnqVGQ@example.com",
                "phone": "8442779976",
                "llc_name": "Isdtz LLC",
                "tax_id": "06033583",
                "email2": "qVqnqVGQ_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "4320 Kqcms Street",
                "city": "New York",
                "state": "NY",
                "zip": "38249",
                "billing_type": "Daily"
            }'

echo "Request sent for user qVqnqVGQ"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "2Fkl16DH",
                "first_name": "5ydsn",
                "last_name": "Ntqe4gq",
                "email": "2Fkl16DH@example.com",
                "phone": "7429831318",
                "llc_name": "5ydsn LLC",
                "tax_id": "41099576",
                "email2": "2Fkl16DH_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "3484 Wuge9 Street",
                "city": "New York",
                "state": "NY",
                "zip": "23538",
                "billing_type": "Daily"
            }'

echo "Request sent for user 2Fkl16DH"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "0e6lenyK",
                "first_name": "Lprmw",
                "last_name": "Jdrl5xf",
                "email": "0e6lenyK@example.com",
                "phone": "3791053678",
                "llc_name": "Lprmw LLC",
                "tax_id": "48271908",
                "email2": "0e6lenyK_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "4923 X3gxh Street",
                "city": "New York",
                "state": "NY",
                "zip": "54401",
                "billing_type": "Daily"
            }'

echo "Request sent for user 0e6lenyK"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "ERQ0rvdC",
                "first_name": "Z0dl7",
                "last_name": "6fdlvvd",
                "email": "ERQ0rvdC@example.com",
                "phone": "8018870645",
                "llc_name": "Z0dl7 LLC",
                "tax_id": "94328500",
                "email2": "ERQ0rvdC_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "3112 Dv1lz Street",
                "city": "New York",
                "state": "NY",
                "zip": "90633",
                "billing_type": "Daily"
            }'

echo "Request sent for user ERQ0rvdC"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "UitWbbWx",
                "first_name": "4ad53",
                "last_name": "Klvrvkk",
                "email": "UitWbbWx@example.com",
                "phone": "3549377668",
                "llc_name": "4ad53 LLC",
                "tax_id": "20797165",
                "email2": "UitWbbWx_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "5380 Bkxba Street",
                "city": "New York",
                "state": "NY",
                "zip": "83848",
                "billing_type": "Monthly"
            }'

echo "Request sent for user UitWbbWx"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "kIWmzoyh",
                "first_name": "Mdp2r",
                "last_name": "Jq9jkxv",
                "email": "kIWmzoyh@example.com",
                "phone": "3018321895",
                "llc_name": "Mdp2r LLC",
                "tax_id": "45194811",
                "email2": "kIWmzoyh_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "2371 E1ga1 Street",
                "city": "New York",
                "state": "NY",
                "zip": "87544",
                "billing_type": "Monthly"
            }'

echo "Request sent for user kIWmzoyh"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "HEKkw8ZE",
                "first_name": "Nrrbc",
                "last_name": "Xp8bqoi",
                "email": "HEKkw8ZE@example.com",
                "phone": "6521567159",
                "llc_name": "Nrrbc LLC",
                "tax_id": "06160403",
                "email2": "HEKkw8ZE_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "5327 Yuswl Street",
                "city": "New York",
                "state": "NY",
                "zip": "85014",
                "billing_type": "Monthly"
            }'

echo "Request sent for user HEKkw8ZE"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "S34kgxez",
                "first_name": "Qbfme",
                "last_name": "Ioor5cx",
                "email": "S34kgxez@example.com",
                "phone": "8325762422",
                "llc_name": "Qbfme LLC",
                "tax_id": "20711348",
                "email2": "S34kgxez_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "2003 Sgkgs Street",
                "city": "New York",
                "state": "NY",
                "zip": "51153",
                "billing_type": "Monthly"
            }'

echo "Request sent for user S34kgxez"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "I4NDlYVv",
                "first_name": "8cq0s",
                "last_name": "Xe789ay",
                "email": "I4NDlYVv@example.com",
                "phone": "4971632178",
                "llc_name": "8cq0s LLC",
                "tax_id": "31889936",
                "email2": "I4NDlYVv_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "4557 Byp3j Street",
                "city": "New York",
                "state": "NY",
                "zip": "69108",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user I4NDlYVv"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "fopBDTNj",
                "first_name": "J0udb",
                "last_name": "Oci8nmh",
                "email": "fopBDTNj@example.com",
                "phone": "2556175706",
                "llc_name": "J0udb LLC",
                "tax_id": "46480961",
                "email2": "fopBDTNj_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "6654 Venrt Street",
                "city": "New York",
                "state": "NY",
                "zip": "78445",
                "billing_type": "Monthly"
            }'

echo "Request sent for user fopBDTNj"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "QNVjjcns",
                "first_name": "Odkyb",
                "last_name": "5yjuqp5",
                "email": "QNVjjcns@example.com",
                "phone": "7016107032",
                "llc_name": "Odkyb LLC",
                "tax_id": "08796804",
                "email2": "QNVjjcns_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "4135 Ekt1l Street",
                "city": "New York",
                "state": "NY",
                "zip": "84848",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user QNVjjcns"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "nUi8hRkJ",
                "first_name": "Gm5zc",
                "last_name": "L6xvu1p",
                "email": "nUi8hRkJ@example.com",
                "phone": "4496971498",
                "llc_name": "Gm5zc LLC",
                "tax_id": "69646385",
                "email2": "nUi8hRkJ_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "1556 Kxkh5 Street",
                "city": "New York",
                "state": "NY",
                "zip": "48704",
                "billing_type": "Monthly"
            }'

echo "Request sent for user nUi8hRkJ"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "9q4MRojp",
                "first_name": "Ewasd",
                "last_name": "Yws2dyl",
                "email": "9q4MRojp@example.com",
                "phone": "4689174432",
                "llc_name": "Ewasd LLC",
                "tax_id": "27948213",
                "email2": "9q4MRojp_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "4367 Xsxrg Street",
                "city": "New York",
                "state": "NY",
                "zip": "08372",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user 9q4MRojp"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "xQ9JNNUg",
                "first_name": "H7czo",
                "last_name": "8jacsuy",
                "email": "xQ9JNNUg@example.com",
                "phone": "7548175903",
                "llc_name": "H7czo LLC",
                "tax_id": "28638627",
                "email2": "xQ9JNNUg_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "5352 Lp6f5 Street",
                "city": "New York",
                "state": "NY",
                "zip": "32741",
                "billing_type": "Daily"
            }'

echo "Request sent for user xQ9JNNUg"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "E8O56iTZ",
                "first_name": "2slbp",
                "last_name": "6u8u1gf",
                "email": "E8O56iTZ@example.com",
                "phone": "5344051070",
                "llc_name": "2slbp LLC",
                "tax_id": "20642405",
                "email2": "E8O56iTZ_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "4125 Dwe0k Street",
                "city": "New York",
                "state": "NY",
                "zip": "67530",
                "billing_type": "Monthly"
            }'

echo "Request sent for user E8O56iTZ"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "PcOmijlA",
                "first_name": "Amlhm",
                "last_name": "B2pjwnx",
                "email": "PcOmijlA@example.com",
                "phone": "0478287787",
                "llc_name": "Amlhm LLC",
                "tax_id": "38059058",
                "email2": "PcOmijlA_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "2146 7yxsx Street",
                "city": "New York",
                "state": "NY",
                "zip": "94977",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user PcOmijlA"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "Z8WvDJkn",
                "first_name": "Dokcs",
                "last_name": "Tkay7jd",
                "email": "Z8WvDJkn@example.com",
                "phone": "9698843188",
                "llc_name": "Dokcs LLC",
                "tax_id": "48578607",
                "email2": "Z8WvDJkn_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "8170 Ycrdw Street",
                "city": "New York",
                "state": "NY",
                "zip": "77759",
                "billing_type": "Daily"
            }'

echo "Request sent for user Z8WvDJkn"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "5xAguQP1",
                "first_name": "Sulvk",
                "last_name": "Z918qpr",
                "email": "5xAguQP1@example.com",
                "phone": "5646105738",
                "llc_name": "Sulvk LLC",
                "tax_id": "92040484",
                "email2": "5xAguQP1_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "3462 Uknnx Street",
                "city": "New York",
                "state": "NY",
                "zip": "75239",
                "billing_type": "Monthly"
            }'

echo "Request sent for user 5xAguQP1"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "tL06bCIB",
                "first_name": "1n0xl",
                "last_name": "Rcio9sq",
                "email": "tL06bCIB@example.com",
                "phone": "6649042496",
                "llc_name": "1n0xl LLC",
                "tax_id": "90066472",
                "email2": "tL06bCIB_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "6929 Elqac Street",
                "city": "New York",
                "state": "NY",
                "zip": "90853",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user tL06bCIB"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "i2OGsj0f",
                "first_name": "0q7zo",
                "last_name": "O3jismu",
                "email": "i2OGsj0f@example.com",
                "phone": "7041929073",
                "llc_name": "0q7zo LLC",
                "tax_id": "89462740",
                "email2": "i2OGsj0f_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "6010 Jbju7 Street",
                "city": "New York",
                "state": "NY",
                "zip": "47302",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user i2OGsj0f"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "CVCisovB",
                "first_name": "2qaql",
                "last_name": "Fe1qyco",
                "email": "CVCisovB@example.com",
                "phone": "4291681147",
                "llc_name": "2qaql LLC",
                "tax_id": "20976927",
                "email2": "CVCisovB_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "5669 Mydjg Street",
                "city": "New York",
                "state": "NY",
                "zip": "36435",
                "billing_type": "Daily"
            }'

echo "Request sent for user CVCisovB"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "hf7lVSs8",
                "first_name": "Wqjsw",
                "last_name": "Jmwapnb",
                "email": "hf7lVSs8@example.com",
                "phone": "7954154540",
                "llc_name": "Wqjsw LLC",
                "tax_id": "00635134",
                "email2": "hf7lVSs8_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "5260 Rzosy Street",
                "city": "New York",
                "state": "NY",
                "zip": "30652",
                "billing_type": "Monthly"
            }'

echo "Request sent for user hf7lVSs8"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "1p3F1h1g",
                "first_name": "Syjko",
                "last_name": "Pusruzq",
                "email": "1p3F1h1g@example.com",
                "phone": "7638355471",
                "llc_name": "Syjko LLC",
                "tax_id": "98625075",
                "email2": "1p3F1h1g_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "6511 Ysqea Street",
                "city": "New York",
                "state": "NY",
                "zip": "19733",
                "billing_type": "Daily"
            }'

echo "Request sent for user 1p3F1h1g"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "HgFL9sfI",
                "first_name": "Bhkax",
                "last_name": "6cqihie",
                "email": "HgFL9sfI@example.com",
                "phone": "3802886671",
                "llc_name": "Bhkax LLC",
                "tax_id": "81191818",
                "email2": "HgFL9sfI_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "1937 Ulukk Street",
                "city": "New York",
                "state": "NY",
                "zip": "56669",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user HgFL9sfI"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "djGFRRgj",
                "first_name": "6swri",
                "last_name": "Jethejj",
                "email": "djGFRRgj@example.com",
                "phone": "6263629788",
                "llc_name": "6swri LLC",
                "tax_id": "77116994",
                "email2": "djGFRRgj_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "989 528lw Street",
                "city": "New York",
                "state": "NY",
                "zip": "24894",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user djGFRRgj"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "soB9rz9e",
                "first_name": "Ryrnw",
                "last_name": "C5eyc9n",
                "email": "soB9rz9e@example.com",
                "phone": "0166356594",
                "llc_name": "Ryrnw LLC",
                "tax_id": "79888656",
                "email2": "soB9rz9e_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "7676 Z6s9f Street",
                "city": "New York",
                "state": "NY",
                "zip": "89756",
                "billing_type": "Daily"
            }'

echo "Request sent for user soB9rz9e"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "uXNnRZQ5",
                "first_name": "Q0qfp",
                "last_name": "Vvmr56p",
                "email": "uXNnRZQ5@example.com",
                "phone": "6620885817",
                "llc_name": "Q0qfp LLC",
                "tax_id": "35646265",
                "email2": "uXNnRZQ5_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "8390 Vzrqp Street",
                "city": "New York",
                "state": "NY",
                "zip": "13783",
                "billing_type": "Monthly"
            }'

echo "Request sent for user uXNnRZQ5"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "rwoyKsUl",
                "first_name": "Davns",
                "last_name": "C6qe8fa",
                "email": "rwoyKsUl@example.com",
                "phone": "7952787138",
                "llc_name": "Davns LLC",
                "tax_id": "29882405",
                "email2": "rwoyKsUl_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "848 Vxmxk Street",
                "city": "New York",
                "state": "NY",
                "zip": "08528",
                "billing_type": "Daily"
            }'

echo "Request sent for user rwoyKsUl"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "ogra1fhE",
                "first_name": "Aw9iv",
                "last_name": "Pg8remy",
                "email": "ogra1fhE@example.com",
                "phone": "0697583252",
                "llc_name": "Aw9iv LLC",
                "tax_id": "84652232",
                "email2": "ogra1fhE_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "8482 Epnbm Street",
                "city": "New York",
                "state": "NY",
                "zip": "23198",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user ogra1fhE"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "z0Qf28GY",
                "first_name": "Zmbv5",
                "last_name": "Ipxyxfd",
                "email": "z0Qf28GY@example.com",
                "phone": "9856319271",
                "llc_name": "Zmbv5 LLC",
                "tax_id": "28657102",
                "email2": "z0Qf28GY_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "1166 Zfpf9 Street",
                "city": "New York",
                "state": "NY",
                "zip": "24568",
                "billing_type": "Daily"
            }'

echo "Request sent for user z0Qf28GY"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "5GgNIS5x",
                "first_name": "Tsagr",
                "last_name": "Wzfc4yc",
                "email": "5GgNIS5x@example.com",
                "phone": "5874072202",
                "llc_name": "Tsagr LLC",
                "tax_id": "84077335",
                "email2": "5GgNIS5x_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "7787 Rafjq Street",
                "city": "New York",
                "state": "NY",
                "zip": "59758",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user 5GgNIS5x"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "TTAE38Xc",
                "first_name": "Vdiou",
                "last_name": "Krsafpy",
                "email": "TTAE38Xc@example.com",
                "phone": "7828569261",
                "llc_name": "Vdiou LLC",
                "tax_id": "49887508",
                "email2": "TTAE38Xc_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "3999 A50ws Street",
                "city": "New York",
                "state": "NY",
                "zip": "78409",
                "billing_type": "Daily"
            }'

echo "Request sent for user TTAE38Xc"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "BgeA83qY",
                "first_name": "Hfcgw",
                "last_name": "Gvknszk",
                "email": "BgeA83qY@example.com",
                "phone": "0428156056",
                "llc_name": "Hfcgw LLC",
                "tax_id": "30384457",
                "email2": "BgeA83qY_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "3373 Qcdt4 Street",
                "city": "New York",
                "state": "NY",
                "zip": "70066",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user BgeA83qY"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "HSj0OS4q",
                "first_name": "Pggzo",
                "last_name": "9fgbiga",
                "email": "HSj0OS4q@example.com",
                "phone": "4536291243",
                "llc_name": "Pggzo LLC",
                "tax_id": "04789293",
                "email2": "HSj0OS4q_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "3227 Pfl9x Street",
                "city": "New York",
                "state": "NY",
                "zip": "15031",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user HSj0OS4q"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "z5oNgxnb",
                "first_name": "Znxd2",
                "last_name": "Zdmrewb",
                "email": "z5oNgxnb@example.com",
                "phone": "6885267787",
                "llc_name": "Znxd2 LLC",
                "tax_id": "49648302",
                "email2": "z5oNgxnb_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "2113 59osx Street",
                "city": "New York",
                "state": "NY",
                "zip": "95837",
                "billing_type": "Daily"
            }'

echo "Request sent for user z5oNgxnb"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "hTS3LP3O",
                "first_name": "1ejmp",
                "last_name": "Gogtjbm",
                "email": "hTS3LP3O@example.com",
                "phone": "6864003376",
                "llc_name": "1ejmp LLC",
                "tax_id": "13357705",
                "email2": "hTS3LP3O_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "1680 Zz2nt Street",
                "city": "New York",
                "state": "NY",
                "zip": "50636",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user hTS3LP3O"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "Jc3wK5HP",
                "first_name": "Vv2tx",
                "last_name": "Qpijsg9",
                "email": "Jc3wK5HP@example.com",
                "phone": "7495631034",
                "llc_name": "Vv2tx LLC",
                "tax_id": "26604186",
                "email2": "Jc3wK5HP_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "508 Juctj Street",
                "city": "New York",
                "state": "NY",
                "zip": "93625",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user Jc3wK5HP"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "ZPvfusMo",
                "first_name": "3kqj5",
                "last_name": "Tcijokh",
                "email": "ZPvfusMo@example.com",
                "phone": "6493050889",
                "llc_name": "3kqj5 LLC",
                "tax_id": "74179106",
                "email2": "ZPvfusMo_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "2184 Evyxb Street",
                "city": "New York",
                "state": "NY",
                "zip": "28244",
                "billing_type": "Daily"
            }'

echo "Request sent for user ZPvfusMo"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "6oXigQf6",
                "first_name": "Nvxnq",
                "last_name": "Giszwhw",
                "email": "6oXigQf6@example.com",
                "phone": "0548447056",
                "llc_name": "Nvxnq LLC",
                "tax_id": "91484206",
                "email2": "6oXigQf6_secondary@example.com",
                "password": "password123",
                "role": "Client",
                "address": "8961 4vhb1 Street",
                "city": "New York",
                "state": "NY",
                "zip": "13101",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user 6oXigQf6"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "wvy2vefY",
                "first_name": "I5hzg",
                "last_name": "Cpaqs4t",
                "email": "wvy2vefY@example.com",
                "phone": "4986259280",
                "llc_name": "I5hzg LLC",
                "tax_id": "03076778",
                "email2": "wvy2vefY_secondary@example.com",
                "password": "password123",
                "role": "Prep Team",
                "address": "8117 Zwz13 Street",
                "city": "New York",
                "state": "NY",
                "zip": "85529",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user wvy2vefY"

curl -X POST $URL \
    -H "Content-Type: application/json" \
    -H "Authorization: Bearer $AUTH_TOKEN" \
    -d '{
                "username": "seCOy8i7",
                "first_name": "C7ann",
                "last_name": "Rlwkb16",
                "email": "seCOy8i7@example.com",
                "phone": "9802526090",
                "llc_name": "C7ann LLC",
                "tax_id": "98504514",
                "email2": "seCOy8i7_secondary@example.com",
                "password": "password123",
                "role": "Virtual Assistant",
                "address": "104 Fchwr Street",
                "city": "New York",
                "state": "NY",
                "zip": "15679",
                "billing_type": "Bimonthly"
            }'

echo "Request sent for user seCOy8i7"

