from django.urls import path

from rest_framework_simplejwt.views import (
    TokenObtainPairView,
    TokenRefreshView
)

from .views import (
    VisitorListCreateView,
    DepartmentListCreateView,
    EmployeeListCreateView,
    VisitRequestListCreateView,
    GatePassListCreateView,
    CheckInOutLogListCreateView,
    VisitorHistoryView,
    DashboardView
)


urlpatterns = [

    path(
        'login/',
        TokenObtainPairView.as_view(),
        name='login'
    ),

    path(
        'login/refresh/',
        TokenRefreshView.as_view(),
        name='login-refresh'
    ),

    path(
        'visitors/',
        VisitorListCreateView.as_view(),
        name='visitors'
    ),

    path(
        'departments/',
        DepartmentListCreateView.as_view(),
        name='departments'
    ),

    path(
        'employees/',
        EmployeeListCreateView.as_view(),
        name='employees'
    ),

    path(
        'visit-requests/',
        VisitRequestListCreateView.as_view(),
        name='visit-requests'
    ),

    path(
        'visit-requests/<int:pk>/',
        VisitRequestListCreateView.as_view(),
        name='visit-request-detail'
    ),

    path(
        'gate-passes/',
        GatePassListCreateView.as_view(),
        name='gate-passes'
    ),

    path(
        'check-in-out/',
        CheckInOutLogListCreateView.as_view(),
        name='check-in-out'
    ),

    path(
        'check-in-out/<int:pk>/',
        CheckInOutLogListCreateView.as_view(),
        name='check-in-out-detail'
    ),

    path(
        'visitor-history/',
        VisitorHistoryView.as_view(),
        name='visitor-history'
    ),

    path(
        'dashboard/',
        DashboardView.as_view(),
        name='dashboard'
    ),
]