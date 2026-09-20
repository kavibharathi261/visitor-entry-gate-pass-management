from rest_framework import serializers
from .models import (
    Visitor,
    Department,
    Employee,
    VisitRequest,
    GatePass,
    CheckInOutLog
)


class VisitorSerializer(serializers.ModelSerializer):
    class Meta:
        model = Visitor
        fields = '__all__'


class DepartmentSerializer(serializers.ModelSerializer):
    class Meta:
        model = Department
        fields = '__all__'


class EmployeeSerializer(serializers.ModelSerializer):
    class Meta:
        model = Employee
        fields = '__all__'


class VisitRequestSerializer(serializers.ModelSerializer):
    class Meta:
        model = VisitRequest
        fields = '__all__'


class GatePassSerializer(serializers.ModelSerializer):
    class Meta:
        model = GatePass
        fields = '__all__'


class CheckInOutLogSerializer(serializers.ModelSerializer):
    class Meta:
        model = CheckInOutLog
        fields = '__all__'