from django.urls import path
from . import views

urlpatterns = [
    path("api/tasks/", views.task_list_create, name="task-list-create"),
    path("api/completed-tasks/", views.completed_tasks_list_create, name="completed-tasks-list-create"),
    path("api/timesheet/", views.timesheet_list_create, name="timesheet-list-create"),
]