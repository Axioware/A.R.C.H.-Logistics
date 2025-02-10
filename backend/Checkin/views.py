from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from django.db import transaction
from django.utils.timezone import now
from .models import Task, CompletedTasks, TimeSheet
from django.conf import settings
from Orders.models import Orders

# Task APIs
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def task_list_create(request):
    if request.method == 'GET':
        tasks = Task.objects.all()
        assigned_to = request.query_params.get('assigned_to')
        order_id = request.query_params.get('order_id')

        if assigned_to:
            tasks = tasks.filter(assigned_to_id=assigned_to)
        if order_id:
            tasks = tasks.filter(order_id=order_id)

        task_data = list(tasks.values())
        return Response(task_data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        data = request.data
        try:
            with transaction.atomic():
                assigned_by = request.user
                assigned_to_id = data.get('assigned_to')
                order_id = data.get('order_id')
                recurring = data.get('recurring', False)
                assigned_to = settings.AUTH_USER_MODEL.objects.get(id=assigned_to_id)
                order = Orders.objects.get(id=order_id) if order_id else None

                task = Task.objects.create(
                    assigned_by=assigned_by,
                    assigned_to=assigned_to,
                    order_id=order,
                    recurring=recurring,
                )
                return Response({"success": "Task created successfully", "task_id": task.task_id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# CompletedTasks APIs
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def completed_tasks_list_create(request):
    if request.method == 'GET':
        tasks = CompletedTasks.objects.all()
        assigned_to = request.query_params.get('assigned_to')
        order_id = request.query_params.get('order_id')

        if assigned_to:
            tasks = tasks.filter(assigned_to_id=assigned_to)
        if order_id:
            tasks = tasks.filter(order_id=order_id)

        task_data = list(tasks.values())
        return Response(task_data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        data = request.data
        try:
            with transaction.atomic():
                assigned_by = request.user
                assigned_to_id = data.get('assigned_to')
                order_id = data.get('order_id')
                assigned_date = data.get('assigned_date')
                completed_date = now()
                assigned_to = settings.AUTH_USER_MODEL.objects.get(id=assigned_to_id)
                order = Orders.objects.get(id=order_id) if order_id else None

                completed_task = CompletedTasks.objects.create(
                    assigned_by=assigned_by,
                    assigned_to=assigned_to,
                    order_id=order,
                    assigned_date=assigned_date,
                    completed_date=completed_date
                )
                return Response({"success": "Completed task added", "task_id": completed_task.task_id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)

# TimeSheet APIs
@api_view(['GET', 'POST'])
@permission_classes([IsAuthenticated])
def timesheet_list_create(request):
    if request.method == 'GET':
        logs = TimeSheet.objects.all()
        user_id = request.query_params.get('user_id')
        if user_id:
            logs = logs.filter(user_id=user_id)
        log_data = list(logs.values())
        return Response(log_data, status=status.HTTP_200_OK)

    elif request.method == 'POST':
        data = request.data
        try:
            with transaction.atomic():
                user_id = data.get('user_id')
                check_in_time = now()
                user = settings.AUTH_USER_MODEL.objects.get(id=user_id)
                log = TimeSheet.objects.create(
                    user_id=user,
                    check_in_time=check_in_time,
                )
                return Response({"success": "Check-in recorded", "check_in_id": log.check_in_id}, status=status.HTTP_201_CREATED)
        except Exception as e:
            return Response({"error": str(e)}, status=status.HTTP_400_BAD_REQUEST)
