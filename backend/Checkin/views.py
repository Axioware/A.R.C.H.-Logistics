from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.utils import timezone
# from Checkin.models import LogRecord, UsersExtended

# @api_view(['GET', 'POST'])
# @permission_classes([IsAuthenticated])
# def checkin(request):
#     user = request.user
    
#     # Disallow access to clients
#     if user.extended.role == UsersExtended.RoleChoices.CLIENT:
#         return Response({'error': "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

#     # GET method: Return all check-in records belonging to the user
#     if request.method == "GET":
#         user_logs = LogRecord.objects.filter(user_id=user).order_by('-check_in_time')
#         log_data = [
#             {
#                 'check_in_id': log.check_in_id,
#                 'check_in_time': log.check_in_time,
#                 'check_out_time': log.check_out_time
#             }
#             for log in user_logs
#         ]
#         return Response({'data': log_data}, status=status.HTTP_200_OK)

#     # POST method: Check if last record has a null checkout field or create a new check-in
#     if request.method == "POST":
#         try:
#             last_record = LogRecord.objects.filter(user_id=user).order_by('-check_in_time').first()

#             if last_record and last_record.check_out_time is None:
#                 # If checkout is null, update the record with the current time
#                 last_record.check_out_time = timezone.now()
#                 last_record.save()
#                 return Response({'message': "Check-out successful", 'check_out_time': last_record.check_out_time}, status=status.HTTP_200_OK)
#             else:
#                 # Create a new check-in record
#                 new_check_in = LogRecord.objects.create(user_id=user, check_in_time=timezone.now())
#                 return Response({'message': "Check-in successful", 'check_in_time': new_check_in.check_in_time}, status=status.HTTP_201_CREATED)

#         except Exception as e:
#             return Response({'error': str(e)}, status=status.HTTP_500_INTERNAL_SERVER_ERROR)


# @api_view(['GET', 'PUT', 'DELETE'])
# @permission_classes([IsAuthenticated])
# def checkin_detail(request, pk):
#     user = request.user

#     # Disallow access to clients
#     if user.extended.role == UsersExtended.RoleChoices.CLIENT:
#         return Response({'error': "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

#     try:
#         log_record = LogRecord.objects.get(check_in_id=pk)
#     except LogRecord.DoesNotExist:
#         return Response({'error': "Log record not found"}, status=status.HTTP_404_NOT_FOUND)

#     # GET Method
#     if request.method == 'GET':
#         # VA and Prep Team can view their own records, Managers/Owners can view any record
#         if (user.extended.role in [UsersExtended.RoleChoices.VIRTUAL_ASSISTANT, UsersExtended.RoleChoices.PREP_TEAM] and log_record.user_id == user) or user.extended.role in [UsersExtended.RoleChoices.MANAGER, UsersExtended.RoleChoices.OWNER]:
#             log_data = {
#                 'check_in_id': log_record.check_in_id,
#                 'check_in_time': log_record.check_in_time,
#                 'check_out_time': log_record.check_out_time
#             }
#             return Response({'data': log_data}, status=status.HTTP_200_OK)
#         return Response({'error': "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

#     # PUT Method
#     elif request.method == 'PUT':
#         # VA/Prep Team can edit their own records, Managers/Owners can edit any record
#         if (user.extended.role in [UsersExtended.RoleChoices.VIRTUAL_ASSISTANT, UsersExtended.RoleChoices.PREP_TEAM] and log_record.user_id == user) or user.extended.role in [UsersExtended.RoleChoices.MANAGER, UsersExtended.RoleChoices.OWNER]:
#             log_record.check_in_time = request.data.get('check_in_time', log_record.check_in_time)
#             log_record.check_out_time = request.data.get('check_out_time', log_record.check_out_time)
#             log_record.save()
#             return Response({'message': "Check-in record updated successfully"}, status=status.HTTP_200_OK)
#         return Response({'error': "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)

#     # DELETE Method
#     elif request.method == 'DELETE':
#         # VA/Prep Team can delete their own records, Managers/Owners can delete any record
#         if (user.extended.role in [UsersExtended.RoleChoices.VIRTUAL_ASSISTANT, UsersExtended.RoleChoices.PREP_TEAM] and log_record.user_id == user) or user.extended.role in [UsersExtended.RoleChoices.MANAGER, UsersExtended.RoleChoices.OWNER]:
#             log_record.delete()
#             return Response({'message': "Check-in record deleted successfully"}, status=status.HTTP_204_NO_CONTENT)
#         return Response({'error': "Unauthorized"}, status=status.HTTP_403_FORBIDDEN)
