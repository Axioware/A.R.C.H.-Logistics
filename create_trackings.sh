#!/bin/bash

# API URL
API_URL="http://localhost:8000/orders/api/trackings/"

# JWT token for authorization
JWT_TOKEN=$1

# Image file to be uploaded (make sure it's in the same directory as this script)
IMAGE_FILE="boxes.jpg"

TRACKING_ID_1="tracking_560_mweZo"
CLIENT_ID_1=2
DATE_RECEIVED_1="2024-09-19T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_1" \
    -F "client_id=$CLIENT_ID_1" \
    -F "date_received=$DATE_RECEIVED_1" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_1"

TRACKING_ID_2="tracking_158_Vlaqk"
CLIENT_ID_2=1
DATE_RECEIVED_2="2024-10-10T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_2" \
    -F "client_id=$CLIENT_ID_2" \
    -F "date_received=$DATE_RECEIVED_2" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_2"

TRACKING_ID_3="tracking_647_9qytD"
CLIENT_ID_3=5
DATE_RECEIVED_3="2024-09-28T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_3" \
    -F "client_id=$CLIENT_ID_3" \
    -F "date_received=$DATE_RECEIVED_3" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_3"

TRACKING_ID_4="tracking_117_C8Ith"
CLIENT_ID_4=1
DATE_RECEIVED_4="2024-09-29T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_4" \
    -F "client_id=$CLIENT_ID_4" \
    -F "date_received=$DATE_RECEIVED_4" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_4"

TRACKING_ID_5="tracking_543_DLXHE"
CLIENT_ID_5=6
DATE_RECEIVED_5="2024-09-29T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_5" \
    -F "client_id=$CLIENT_ID_5" \
    -F "date_received=$DATE_RECEIVED_5" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_5"

TRACKING_ID_6="tracking_712_rr2ae"
CLIENT_ID_6=5
DATE_RECEIVED_6="2024-10-10T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_6" \
    -F "client_id=$CLIENT_ID_6" \
    -F "date_received=$DATE_RECEIVED_6" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_6"

TRACKING_ID_7="tracking_773_RKFYL"
CLIENT_ID_7=10
DATE_RECEIVED_7="2024-09-22T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_7" \
    -F "client_id=$CLIENT_ID_7" \
    -F "date_received=$DATE_RECEIVED_7" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_7"

TRACKING_ID_8="tracking_902_BPpIX"
CLIENT_ID_8=1
DATE_RECEIVED_8="2024-09-21T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_8" \
    -F "client_id=$CLIENT_ID_8" \
    -F "date_received=$DATE_RECEIVED_8" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_8"

TRACKING_ID_9="tracking_632_WUiBH"
CLIENT_ID_9=5
DATE_RECEIVED_9="2024-10-17T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_9" \
    -F "client_id=$CLIENT_ID_9" \
    -F "date_received=$DATE_RECEIVED_9" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_9"

TRACKING_ID_10="tracking_308_4XytO"
CLIENT_ID_10=6
DATE_RECEIVED_10="2024-10-03T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_10" \
    -F "client_id=$CLIENT_ID_10" \
    -F "date_received=$DATE_RECEIVED_10" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_10"

TRACKING_ID_11="tracking_148_4WQPt"
CLIENT_ID_11=1
DATE_RECEIVED_11="2024-09-28T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_11" \
    -F "client_id=$CLIENT_ID_11" \
    -F "date_received=$DATE_RECEIVED_11" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_11"

TRACKING_ID_12="tracking_453_SIFup"
CLIENT_ID_12=5
DATE_RECEIVED_12="2024-10-01T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_12" \
    -F "client_id=$CLIENT_ID_12" \
    -F "date_received=$DATE_RECEIVED_12" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_12"

TRACKING_ID_13="tracking_837_OAYwg"
CLIENT_ID_13=8
DATE_RECEIVED_13="2024-10-03T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_13" \
    -F "client_id=$CLIENT_ID_13" \
    -F "date_received=$DATE_RECEIVED_13" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_13"

TRACKING_ID_14="tracking_724_g3g7L"
CLIENT_ID_14=3
DATE_RECEIVED_14="2024-09-25T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_14" \
    -F "client_id=$CLIENT_ID_14" \
    -F "date_received=$DATE_RECEIVED_14" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_14"

TRACKING_ID_15="tracking_415_lfnre"
CLIENT_ID_15=1
DATE_RECEIVED_15="2024-10-11T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_15" \
    -F "client_id=$CLIENT_ID_15" \
    -F "date_received=$DATE_RECEIVED_15" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_15"

TRACKING_ID_16="tracking_537_yzqtD"
CLIENT_ID_16=7
DATE_RECEIVED_16="2024-10-09T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_16" \
    -F "client_id=$CLIENT_ID_16" \
    -F "date_received=$DATE_RECEIVED_16" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_16"

TRACKING_ID_17="tracking_440_0Ofmt"
CLIENT_ID_17=9
DATE_RECEIVED_17="2024-10-18T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_17" \
    -F "client_id=$CLIENT_ID_17" \
    -F "date_received=$DATE_RECEIVED_17" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_17"

TRACKING_ID_18="tracking_114_UHGaB"
CLIENT_ID_18=10
DATE_RECEIVED_18="2024-10-13T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_18" \
    -F "client_id=$CLIENT_ID_18" \
    -F "date_received=$DATE_RECEIVED_18" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_18"

TRACKING_ID_19="tracking_220_jAfVk"
CLIENT_ID_19=10
DATE_RECEIVED_19="2024-09-30T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_19" \
    -F "client_id=$CLIENT_ID_19" \
    -F "date_received=$DATE_RECEIVED_19" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_19"

TRACKING_ID_20="tracking_616_jWxQQ"
CLIENT_ID_20=5
DATE_RECEIVED_20="2024-10-17T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_20" \
    -F "client_id=$CLIENT_ID_20" \
    -F "date_received=$DATE_RECEIVED_20" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_20"

TRACKING_ID_21="tracking_216_DnZBM"
CLIENT_ID_21=10
DATE_RECEIVED_21="2024-09-18T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_21" \
    -F "client_id=$CLIENT_ID_21" \
    -F "date_received=$DATE_RECEIVED_21" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_21"

TRACKING_ID_22="tracking_713_MUfXw"
CLIENT_ID_22=10
DATE_RECEIVED_22="2024-10-12T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_22" \
    -F "client_id=$CLIENT_ID_22" \
    -F "date_received=$DATE_RECEIVED_22" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_22"

TRACKING_ID_23="tracking_505_vrMGZ"
CLIENT_ID_23=3
DATE_RECEIVED_23="2024-09-18T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_23" \
    -F "client_id=$CLIENT_ID_23" \
    -F "date_received=$DATE_RECEIVED_23" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_23"

TRACKING_ID_24="tracking_178_0Va1g"
CLIENT_ID_24=10
DATE_RECEIVED_24="2024-10-18T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_24" \
    -F "client_id=$CLIENT_ID_24" \
    -F "date_received=$DATE_RECEIVED_24" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_24"

TRACKING_ID_25="tracking_998_80cDo"
CLIENT_ID_25=1
DATE_RECEIVED_25="2024-10-05T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_25" \
    -F "client_id=$CLIENT_ID_25" \
    -F "date_received=$DATE_RECEIVED_25" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_25"

TRACKING_ID_26="tracking_867_qKO5R"
CLIENT_ID_26=1
DATE_RECEIVED_26="2024-10-15T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_26" \
    -F "client_id=$CLIENT_ID_26" \
    -F "date_received=$DATE_RECEIVED_26" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_26"

TRACKING_ID_27="tracking_311_oWZBM"
CLIENT_ID_27=10
DATE_RECEIVED_27="2024-10-15T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_27" \
    -F "client_id=$CLIENT_ID_27" \
    -F "date_received=$DATE_RECEIVED_27" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_27"

TRACKING_ID_28="tracking_722_gpHN3"
CLIENT_ID_28=1
DATE_RECEIVED_28="2024-10-06T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_28" \
    -F "client_id=$CLIENT_ID_28" \
    -F "date_received=$DATE_RECEIVED_28" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_28"

TRACKING_ID_29="tracking_670_8gL3d"
CLIENT_ID_29=3
DATE_RECEIVED_29="2024-09-28T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_29" \
    -F "client_id=$CLIENT_ID_29" \
    -F "date_received=$DATE_RECEIVED_29" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_29"

TRACKING_ID_30="tracking_225_rPTgB"
CLIENT_ID_30=10
DATE_RECEIVED_30="2024-10-01T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_30" \
    -F "client_id=$CLIENT_ID_30" \
    -F "date_received=$DATE_RECEIVED_30" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_30"

TRACKING_ID_31="tracking_284_j9f5G"
CLIENT_ID_31=7
DATE_RECEIVED_31="2024-09-19T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_31" \
    -F "client_id=$CLIENT_ID_31" \
    -F "date_received=$DATE_RECEIVED_31" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_31"

TRACKING_ID_32="tracking_819_sB2Zh"
CLIENT_ID_32=2
DATE_RECEIVED_32="2024-09-18T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_32" \
    -F "client_id=$CLIENT_ID_32" \
    -F "date_received=$DATE_RECEIVED_32" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_32"

TRACKING_ID_33="tracking_820_v75VV"
CLIENT_ID_33=6
DATE_RECEIVED_33="2024-09-30T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_33" \
    -F "client_id=$CLIENT_ID_33" \
    -F "date_received=$DATE_RECEIVED_33" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_33"

TRACKING_ID_34="tracking_335_ZL9LW"
CLIENT_ID_34=8
DATE_RECEIVED_34="2024-10-04T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_34" \
    -F "client_id=$CLIENT_ID_34" \
    -F "date_received=$DATE_RECEIVED_34" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_34"

TRACKING_ID_35="tracking_658_Qi7Wk"
CLIENT_ID_35=2
DATE_RECEIVED_35="2024-10-03T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_35" \
    -F "client_id=$CLIENT_ID_35" \
    -F "date_received=$DATE_RECEIVED_35" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_35"

TRACKING_ID_36="tracking_905_68erY"
CLIENT_ID_36=1
DATE_RECEIVED_36="2024-10-08T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_36" \
    -F "client_id=$CLIENT_ID_36" \
    -F "date_received=$DATE_RECEIVED_36" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_36"

TRACKING_ID_37="tracking_526_GeEYs"
CLIENT_ID_37=5
DATE_RECEIVED_37="2024-09-30T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_37" \
    -F "client_id=$CLIENT_ID_37" \
    -F "date_received=$DATE_RECEIVED_37" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_37"

TRACKING_ID_38="tracking_517_3mt97"
CLIENT_ID_38=10
DATE_RECEIVED_38="2024-10-09T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_38" \
    -F "client_id=$CLIENT_ID_38" \
    -F "date_received=$DATE_RECEIVED_38" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_38"

TRACKING_ID_39="tracking_102_vwGyw"
CLIENT_ID_39=10
DATE_RECEIVED_39="2024-10-01T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_39" \
    -F "client_id=$CLIENT_ID_39" \
    -F "date_received=$DATE_RECEIVED_39" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_39"

TRACKING_ID_40="tracking_475_Pqutw"
CLIENT_ID_40=6
DATE_RECEIVED_40="2024-09-26T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_40" \
    -F "client_id=$CLIENT_ID_40" \
    -F "date_received=$DATE_RECEIVED_40" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_40"

TRACKING_ID_41="tracking_574_stNHn"
CLIENT_ID_41=8
DATE_RECEIVED_41="2024-10-11T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_41" \
    -F "client_id=$CLIENT_ID_41" \
    -F "date_received=$DATE_RECEIVED_41" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_41"

TRACKING_ID_42="tracking_651_3xcC8"
CLIENT_ID_42=9
DATE_RECEIVED_42="2024-09-19T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_42" \
    -F "client_id=$CLIENT_ID_42" \
    -F "date_received=$DATE_RECEIVED_42" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_42"

TRACKING_ID_43="tracking_332_QmPC7"
CLIENT_ID_43=1
DATE_RECEIVED_43="2024-10-16T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_43" \
    -F "client_id=$CLIENT_ID_43" \
    -F "date_received=$DATE_RECEIVED_43" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_43"

TRACKING_ID_44="tracking_273_Ufq5t"
CLIENT_ID_44=3
DATE_RECEIVED_44="2024-09-18T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_44" \
    -F "client_id=$CLIENT_ID_44" \
    -F "date_received=$DATE_RECEIVED_44" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_44"

TRACKING_ID_45="tracking_931_UQAWL"
CLIENT_ID_45=9
DATE_RECEIVED_45="2024-10-16T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_45" \
    -F "client_id=$CLIENT_ID_45" \
    -F "date_received=$DATE_RECEIVED_45" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_45"

TRACKING_ID_46="tracking_628_4FS5o"
CLIENT_ID_46=7
DATE_RECEIVED_46="2024-10-14T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_46" \
    -F "client_id=$CLIENT_ID_46" \
    -F "date_received=$DATE_RECEIVED_46" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_46"

TRACKING_ID_47="tracking_912_HWp5t"
CLIENT_ID_47=5
DATE_RECEIVED_47="2024-09-29T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_47" \
    -F "client_id=$CLIENT_ID_47" \
    -F "date_received=$DATE_RECEIVED_47" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_47"

TRACKING_ID_48="tracking_610_umASK"
CLIENT_ID_48=6
DATE_RECEIVED_48="2024-10-09T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_48" \
    -F "client_id=$CLIENT_ID_48" \
    -F "date_received=$DATE_RECEIVED_48" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_48"

TRACKING_ID_49="tracking_590_jvTch"
CLIENT_ID_49=9
DATE_RECEIVED_49="2024-10-13T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_49" \
    -F "client_id=$CLIENT_ID_49" \
    -F "date_received=$DATE_RECEIVED_49" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_49"

TRACKING_ID_50="tracking_981_9QU0z"
CLIENT_ID_50=6
DATE_RECEIVED_50="2024-10-12T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_50" \
    -F "client_id=$CLIENT_ID_50" \
    -F "date_received=$DATE_RECEIVED_50" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_50"

TRACKING_ID_51="tracking_169_FEYU2"
CLIENT_ID_51=8
DATE_RECEIVED_51="2024-10-17T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_51" \
    -F "client_id=$CLIENT_ID_51" \
    -F "date_received=$DATE_RECEIVED_51" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_51"

TRACKING_ID_52="tracking_874_zXvWt"
CLIENT_ID_52=4
DATE_RECEIVED_52="2024-09-24T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_52" \
    -F "client_id=$CLIENT_ID_52" \
    -F "date_received=$DATE_RECEIVED_52" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_52"

TRACKING_ID_53="tracking_204_2EjLa"
CLIENT_ID_53=3
DATE_RECEIVED_53="2024-10-08T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_53" \
    -F "client_id=$CLIENT_ID_53" \
    -F "date_received=$DATE_RECEIVED_53" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_53"

TRACKING_ID_54="tracking_741_yWE9S"
CLIENT_ID_54=9
DATE_RECEIVED_54="2024-10-18T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_54" \
    -F "client_id=$CLIENT_ID_54" \
    -F "date_received=$DATE_RECEIVED_54" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_54"

TRACKING_ID_55="tracking_628_Kk1RH"
CLIENT_ID_55=2
DATE_RECEIVED_55="2024-10-07T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_55" \
    -F "client_id=$CLIENT_ID_55" \
    -F "date_received=$DATE_RECEIVED_55" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_55"

TRACKING_ID_56="tracking_135_mWgx4"
CLIENT_ID_56=6
DATE_RECEIVED_56="2024-10-07T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_56" \
    -F "client_id=$CLIENT_ID_56" \
    -F "date_received=$DATE_RECEIVED_56" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_56"

TRACKING_ID_57="tracking_809_UzkMI"
CLIENT_ID_57=3
DATE_RECEIVED_57="2024-10-03T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_57" \
    -F "client_id=$CLIENT_ID_57" \
    -F "date_received=$DATE_RECEIVED_57" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_57"

TRACKING_ID_58="tracking_123_PFtZj"
CLIENT_ID_58=2
DATE_RECEIVED_58="2024-09-28T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_58" \
    -F "client_id=$CLIENT_ID_58" \
    -F "date_received=$DATE_RECEIVED_58" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_58"

TRACKING_ID_59="tracking_920_SbtZ7"
CLIENT_ID_59=8
DATE_RECEIVED_59="2024-10-05T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_59" \
    -F "client_id=$CLIENT_ID_59" \
    -F "date_received=$DATE_RECEIVED_59" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_59"

TRACKING_ID_60="tracking_608_h540A"
CLIENT_ID_60=7
DATE_RECEIVED_60="2024-09-22T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_60" \
    -F "client_id=$CLIENT_ID_60" \
    -F "date_received=$DATE_RECEIVED_60" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_60"

TRACKING_ID_61="tracking_109_3mdRy"
CLIENT_ID_61=1
DATE_RECEIVED_61="2024-10-10T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_61" \
    -F "client_id=$CLIENT_ID_61" \
    -F "date_received=$DATE_RECEIVED_61" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_61"

TRACKING_ID_62="tracking_819_tmEom"
CLIENT_ID_62=8
DATE_RECEIVED_62="2024-10-09T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_62" \
    -F "client_id=$CLIENT_ID_62" \
    -F "date_received=$DATE_RECEIVED_62" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_62"

TRACKING_ID_63="tracking_690_yveJb"
CLIENT_ID_63=10
DATE_RECEIVED_63="2024-10-17T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_63" \
    -F "client_id=$CLIENT_ID_63" \
    -F "date_received=$DATE_RECEIVED_63" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_63"

TRACKING_ID_64="tracking_634_EAfWu"
CLIENT_ID_64=8
DATE_RECEIVED_64="2024-10-11T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_64" \
    -F "client_id=$CLIENT_ID_64" \
    -F "date_received=$DATE_RECEIVED_64" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_64"

TRACKING_ID_65="tracking_269_mBM9Z"
CLIENT_ID_65=10
DATE_RECEIVED_65="2024-10-07T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_65" \
    -F "client_id=$CLIENT_ID_65" \
    -F "date_received=$DATE_RECEIVED_65" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_65"

TRACKING_ID_66="tracking_246_mDxZx"
CLIENT_ID_66=1
DATE_RECEIVED_66="2024-10-08T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_66" \
    -F "client_id=$CLIENT_ID_66" \
    -F "date_received=$DATE_RECEIVED_66" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_66"

TRACKING_ID_67="tracking_131_oPYmf"
CLIENT_ID_67=10
DATE_RECEIVED_67="2024-09-20T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_67" \
    -F "client_id=$CLIENT_ID_67" \
    -F "date_received=$DATE_RECEIVED_67" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_67"

TRACKING_ID_68="tracking_290_wJ1rp"
CLIENT_ID_68=4
DATE_RECEIVED_68="2024-09-28T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_68" \
    -F "client_id=$CLIENT_ID_68" \
    -F "date_received=$DATE_RECEIVED_68" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_68"

TRACKING_ID_69="tracking_159_3jXVP"
CLIENT_ID_69=10
DATE_RECEIVED_69="2024-10-08T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_69" \
    -F "client_id=$CLIENT_ID_69" \
    -F "date_received=$DATE_RECEIVED_69" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_69"

TRACKING_ID_70="tracking_329_AgBy9"
CLIENT_ID_70=10
DATE_RECEIVED_70="2024-09-19T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_70" \
    -F "client_id=$CLIENT_ID_70" \
    -F "date_received=$DATE_RECEIVED_70" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_70"

TRACKING_ID_71="tracking_207_fFEDJ"
CLIENT_ID_71=4
DATE_RECEIVED_71="2024-09-22T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_71" \
    -F "client_id=$CLIENT_ID_71" \
    -F "date_received=$DATE_RECEIVED_71" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_71"

TRACKING_ID_72="tracking_570_n9K5T"
CLIENT_ID_72=3
DATE_RECEIVED_72="2024-09-19T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_72" \
    -F "client_id=$CLIENT_ID_72" \
    -F "date_received=$DATE_RECEIVED_72" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_72"

TRACKING_ID_73="tracking_974_OgXAv"
CLIENT_ID_73=8
DATE_RECEIVED_73="2024-09-23T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_73" \
    -F "client_id=$CLIENT_ID_73" \
    -F "date_received=$DATE_RECEIVED_73" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_73"

TRACKING_ID_74="tracking_356_OUbzK"
CLIENT_ID_74=7
DATE_RECEIVED_74="2024-10-16T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_74" \
    -F "client_id=$CLIENT_ID_74" \
    -F "date_received=$DATE_RECEIVED_74" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_74"

TRACKING_ID_75="tracking_152_OIEt7"
CLIENT_ID_75=10
DATE_RECEIVED_75="2024-09-24T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_75" \
    -F "client_id=$CLIENT_ID_75" \
    -F "date_received=$DATE_RECEIVED_75" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_75"

TRACKING_ID_76="tracking_330_uXmGU"
CLIENT_ID_76=9
DATE_RECEIVED_76="2024-10-03T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_76" \
    -F "client_id=$CLIENT_ID_76" \
    -F "date_received=$DATE_RECEIVED_76" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_76"

TRACKING_ID_77="tracking_293_hXPqS"
CLIENT_ID_77=9
DATE_RECEIVED_77="2024-10-03T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_77" \
    -F "client_id=$CLIENT_ID_77" \
    -F "date_received=$DATE_RECEIVED_77" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_77"

TRACKING_ID_78="tracking_792_q8gBn"
CLIENT_ID_78=1
DATE_RECEIVED_78="2024-10-15T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_78" \
    -F "client_id=$CLIENT_ID_78" \
    -F "date_received=$DATE_RECEIVED_78" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_78"

TRACKING_ID_79="tracking_932_kYP3s"
CLIENT_ID_79=3
DATE_RECEIVED_79="2024-09-18T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_79" \
    -F "client_id=$CLIENT_ID_79" \
    -F "date_received=$DATE_RECEIVED_79" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_79"

TRACKING_ID_80="tracking_728_IPO71"
CLIENT_ID_80=6
DATE_RECEIVED_80="2024-10-06T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_80" \
    -F "client_id=$CLIENT_ID_80" \
    -F "date_received=$DATE_RECEIVED_80" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_80"

TRACKING_ID_81="tracking_727_Gpw9k"
CLIENT_ID_81=6
DATE_RECEIVED_81="2024-09-29T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_81" \
    -F "client_id=$CLIENT_ID_81" \
    -F "date_received=$DATE_RECEIVED_81" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_81"

TRACKING_ID_82="tracking_390_OJ4mn"
CLIENT_ID_82=10
DATE_RECEIVED_82="2024-09-20T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_82" \
    -F "client_id=$CLIENT_ID_82" \
    -F "date_received=$DATE_RECEIVED_82" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_82"

TRACKING_ID_83="tracking_393_wd85d"
CLIENT_ID_83=9
DATE_RECEIVED_83="2024-10-16T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_83" \
    -F "client_id=$CLIENT_ID_83" \
    -F "date_received=$DATE_RECEIVED_83" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_83"

TRACKING_ID_84="tracking_669_1sk5t"
CLIENT_ID_84=6
DATE_RECEIVED_84="2024-10-06T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_84" \
    -F "client_id=$CLIENT_ID_84" \
    -F "date_received=$DATE_RECEIVED_84" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_84"

TRACKING_ID_85="tracking_561_UgtHY"
CLIENT_ID_85=8
DATE_RECEIVED_85="2024-09-18T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_85" \
    -F "client_id=$CLIENT_ID_85" \
    -F "date_received=$DATE_RECEIVED_85" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_85"

TRACKING_ID_86="tracking_287_ZEzvY"
CLIENT_ID_86=6
DATE_RECEIVED_86="2024-09-24T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_86" \
    -F "client_id=$CLIENT_ID_86" \
    -F "date_received=$DATE_RECEIVED_86" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_86"

TRACKING_ID_87="tracking_522_yYbjU"
CLIENT_ID_87=10
DATE_RECEIVED_87="2024-10-09T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_87" \
    -F "client_id=$CLIENT_ID_87" \
    -F "date_received=$DATE_RECEIVED_87" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_87"

TRACKING_ID_88="tracking_471_i4Tqu"
CLIENT_ID_88=2
DATE_RECEIVED_88="2024-10-10T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_88" \
    -F "client_id=$CLIENT_ID_88" \
    -F "date_received=$DATE_RECEIVED_88" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_88"

TRACKING_ID_89="tracking_525_r9Zk6"
CLIENT_ID_89=7
DATE_RECEIVED_89="2024-10-11T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_89" \
    -F "client_id=$CLIENT_ID_89" \
    -F "date_received=$DATE_RECEIVED_89" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_89"

TRACKING_ID_90="tracking_698_wUbHT"
CLIENT_ID_90=3
DATE_RECEIVED_90="2024-09-23T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_90" \
    -F "client_id=$CLIENT_ID_90" \
    -F "date_received=$DATE_RECEIVED_90" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_90"

TRACKING_ID_91="tracking_707_rxfw9"
CLIENT_ID_91=6
DATE_RECEIVED_91="2024-10-17T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_91" \
    -F "client_id=$CLIENT_ID_91" \
    -F "date_received=$DATE_RECEIVED_91" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_91"

TRACKING_ID_92="tracking_932_N1xa8"
CLIENT_ID_92=2
DATE_RECEIVED_92="2024-09-24T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_92" \
    -F "client_id=$CLIENT_ID_92" \
    -F "date_received=$DATE_RECEIVED_92" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_92"

TRACKING_ID_93="tracking_255_3uTE3"
CLIENT_ID_93=7
DATE_RECEIVED_93="2024-10-18T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_93" \
    -F "client_id=$CLIENT_ID_93" \
    -F "date_received=$DATE_RECEIVED_93" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_93"

TRACKING_ID_94="tracking_799_ne3fe"
CLIENT_ID_94=10
DATE_RECEIVED_94="2024-09-22T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_94" \
    -F "client_id=$CLIENT_ID_94" \
    -F "date_received=$DATE_RECEIVED_94" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_94"

TRACKING_ID_95="tracking_742_y58QF"
CLIENT_ID_95=8
DATE_RECEIVED_95="2024-10-12T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_95" \
    -F "client_id=$CLIENT_ID_95" \
    -F "date_received=$DATE_RECEIVED_95" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_95"

TRACKING_ID_96="tracking_206_58Ort"
CLIENT_ID_96=9
DATE_RECEIVED_96="2024-10-09T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_96" \
    -F "client_id=$CLIENT_ID_96" \
    -F "date_received=$DATE_RECEIVED_96" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_96"

TRACKING_ID_97="tracking_667_u59n6"
CLIENT_ID_97=9
DATE_RECEIVED_97="2024-10-10T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_97" \
    -F "client_id=$CLIENT_ID_97" \
    -F "date_received=$DATE_RECEIVED_97" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_97"

TRACKING_ID_98="tracking_557_ifwQ3"
CLIENT_ID_98=9
DATE_RECEIVED_98="2024-09-18T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_98" \
    -F "client_id=$CLIENT_ID_98" \
    -F "date_received=$DATE_RECEIVED_98" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_98"

TRACKING_ID_99="tracking_929_V3mb2"
CLIENT_ID_99=1
DATE_RECEIVED_99="2024-10-03T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_99" \
    -F "client_id=$CLIENT_ID_99" \
    -F "date_received=$DATE_RECEIVED_99" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=False" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_99"

TRACKING_ID_100="tracking_494_8WOwa"
CLIENT_ID_100=1
DATE_RECEIVED_100="2024-09-22T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_100" \
    -F "client_id=$CLIENT_ID_100" \
    -F "date_received=$DATE_RECEIVED_100" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_100"

TRACKING_ID_101="tracking_944_2Jn0W"
CLIENT_ID_101=5
DATE_RECEIVED_101="2024-10-04T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_101" \
    -F "client_id=$CLIENT_ID_101" \
    -F "date_received=$DATE_RECEIVED_101" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_101"

TRACKING_ID_102="tracking_824_jxF1r"
CLIENT_ID_102=4
DATE_RECEIVED_102="2024-10-16T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_102" \
    -F "client_id=$CLIENT_ID_102" \
    -F "date_received=$DATE_RECEIVED_102" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_102"

TRACKING_ID_103="tracking_606_XeXbd"
CLIENT_ID_103=6
DATE_RECEIVED_103="2024-10-07T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_103" \
    -F "client_id=$CLIENT_ID_103" \
    -F "date_received=$DATE_RECEIVED_103" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_103"

TRACKING_ID_104="tracking_286_Fl8Dh"
CLIENT_ID_104=10
DATE_RECEIVED_104="2024-10-11T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_104" \
    -F "client_id=$CLIENT_ID_104" \
    -F "date_received=$DATE_RECEIVED_104" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=True" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_104"

TRACKING_ID_105="tracking_870_9Qd7k"
CLIENT_ID_105=8
DATE_RECEIVED_105="2024-10-02T17:13:59"

curl -X POST "$API_URL" \
    -H "Authorization: Bearer $JWT_TOKEN" \
    -F "tracking_id=$TRACKING_ID_105" \
    -F "client_id=$CLIENT_ID_105" \
    -F "date_received=$DATE_RECEIVED_105" \
    -F "images=@$IMAGE_FILE" \
    -F "completed=True" \
    -F "assigned=False" \
    -H "Accept: application/json"

echo "Request sent for tracking $TRACKING_ID_105"

