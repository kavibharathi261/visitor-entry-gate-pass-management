from django.db import models
from django.contrib.auth.models import User

class Visitor(models.Model):
    visitor_id = models.AutoField(primary_key=True)
    name = models.CharField(max_length=100)
    phone = models.CharField(max_length=15)
    email = models.EmailField()
    id_proof = models.CharField(max_length=50)
    address = models.TextField()

    def __str__(self):
        return self.name


class Department(models.Model):
    department_id = models.AutoField(primary_key=True)
    department_name = models.CharField(max_length=100)

    def __str__(self):
        return self.department_name
class Employee(models.Model):
    employee_id = models.AutoField(primary_key=True)
    employee_name = models.CharField(max_length=100)
    email = models.EmailField()
    phone = models.CharField(max_length=15)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)

    def __str__(self):
        return self.employee_name
class VisitRequest(models.Model):
    request_id = models.AutoField(primary_key=True)
    visitor = models.ForeignKey(Visitor, on_delete=models.CASCADE)
    department = models.ForeignKey(Department, on_delete=models.CASCADE)
    employee = models.ForeignKey(Employee, on_delete=models.CASCADE)
    visit_date = models.DateField()
    purpose = models.TextField()
    status = models.CharField(max_length=20, default="Pending")
    requested_time = models.TimeField(auto_now_add=True)

    def __str__(self):
        return f"Request {self.request_id}"
class GatePass(models.Model):
    gate_pass_id = models.AutoField(primary_key=True)
    request = models.OneToOneField(VisitRequest, on_delete=models.CASCADE)
    pass_number = models.CharField(max_length=50, unique=True)
    issue_date = models.DateField(auto_now_add=True)
    valid_until = models.DateField()
    status = models.CharField(max_length=20, default="Active")

    def __str__(self):
        return self.pass_number
class CheckInOutLog(models.Model):
    log_id = models.AutoField(primary_key=True)
    gate_pass = models.OneToOneField(GatePass, on_delete=models.CASCADE)
    check_in_time = models.DateTimeField(null=True, blank=True)
    check_out_time = models.DateTimeField(null=True, blank=True)
    remarks = models.TextField(blank=True)

    def __str__(self):
        return f"Log {self.log_id}"
class UserProfile(models.Model):

    ROLE_CHOICES = [
        ('Admin', 'Admin'),
        ('Security Guard', 'Security Guard'),
        ('Visitor', 'Visitor'),
    ]

    user = models.OneToOneField(User, on_delete=models.CASCADE)
    role = models.CharField(
        max_length=20,
        choices=ROLE_CHOICES
    )

    def __str__(self):
        return f"{self.user.username} - {self.role}"