from django.urls import path
from .views import *

urlpatterns = [
    path("tasks/", task_list_create, name="task-list-create"),
    path("completed-tasks/", completed_tasks_list_create, name="completed-tasks-list-create"),
    path("timesheet/", timesheet_list_create, name="timesheet-list-create"),
]