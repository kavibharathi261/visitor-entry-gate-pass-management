from rest_framework import status
from rest_framework.response import Response
from rest_framework.views import APIView

from rest_framework.permissions import IsAuthenticated
from rest_framework_simplejwt.authentication import JWTAuthentication

from .models import (
    Visitor,
    Department,
    Employee,
    VisitRequest,
    GatePass,
    CheckInOutLog
)

from .serializers import (
    VisitorSerializer,
    DepartmentSerializer,
    EmployeeSerializer,
    VisitRequestSerializer,
    GatePassSerializer,
    CheckInOutLogSerializer
)


class VisitorListCreateView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        visitors = Visitor.objects.all()

        serializer = VisitorSerializer(
            visitors,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):
        serializer = VisitorSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class DepartmentListCreateView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        departments = Department.objects.all()

        serializer = DepartmentSerializer(
            departments,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):
        serializer = DepartmentSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class EmployeeListCreateView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        employees = Employee.objects.all()

        serializer = EmployeeSerializer(
            employees,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):
        serializer = EmployeeSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class VisitRequestListCreateView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        visit_requests = VisitRequest.objects.all()

        serializer = VisitRequestSerializer(
            visit_requests,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):
        serializer = VisitRequestSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def patch(self, request, pk):

        try:
            visit_request = VisitRequest.objects.get(
                request_id=pk
            )

        except VisitRequest.DoesNotExist:
            return Response(
                {"error": "Visit request not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        new_status = request.data.get("status")

        if new_status not in ["Approved", "Rejected"]:
            return Response(
                {
                    "error": "Status must be Approved or Rejected"
                },
                status=status.HTTP_400_BAD_REQUEST
            )

        visit_request.status = new_status
        visit_request.save()

        if new_status == "Approved":

            GatePass.objects.get_or_create(
                request=visit_request,
                defaults={
                    "pass_number": f"GP{visit_request.request_id:03d}",
                    "valid_until": visit_request.visit_date,
                    "status": "Active"
                }
            )

        serializer = VisitRequestSerializer(
            visit_request
        )

        return Response(serializer.data)


class GatePassListCreateView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):
        gate_passes = GatePass.objects.all()

        serializer = GatePassSerializer(
            gate_passes,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):
        serializer = GatePassSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )


class CheckInOutLogListCreateView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request, pk=None):

        logs = CheckInOutLog.objects.all()

        serializer = CheckInOutLogSerializer(
            logs,
            many=True
        )

        return Response(serializer.data)

    def post(self, request):

        serializer = CheckInOutLogSerializer(
            data=request.data
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data,
                status=status.HTTP_201_CREATED
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )

    def patch(self, request, pk):

        try:
            log = CheckInOutLog.objects.get(
                log_id=pk
            )

        except CheckInOutLog.DoesNotExist:
            return Response(
                {"error": "Check-in record not found"},
                status=status.HTTP_404_NOT_FOUND
            )

        serializer = CheckInOutLogSerializer(
            log,
            data=request.data,
            partial=True
        )

        if serializer.is_valid():
            serializer.save()

            return Response(
                serializer.data
            )

        return Response(
            serializer.errors,
            status=status.HTTP_400_BAD_REQUEST
        )
class VisitorHistoryView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        logs = CheckInOutLog.objects.all()

        serializer = CheckInOutLogSerializer(
            logs,
            many=True
        )

        return Response(serializer.data)


class DashboardView(APIView):

    authentication_classes = [JWTAuthentication]
    permission_classes = [IsAuthenticated]

    def get(self, request):

        visitor_count = Visitor.objects.count()
        visit_request_count = VisitRequest.objects.count()
        approved_count = VisitRequest.objects.filter(
            status="Approved"
        ).count()
        pending_count = VisitRequest.objects.filter(
            status="Pending"
        ).count()
        gate_pass_count = GatePass.objects.count()

        return Response({
            "total_visitors": visitor_count,
            "total_visit_requests": visit_request_count,
            "approved_requests": approved_count,
            "pending_requests": pending_count,
            "total_gate_passes": gate_pass_count
        })