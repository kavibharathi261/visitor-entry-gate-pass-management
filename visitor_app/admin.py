from django.contrib import admin

from .models import (
    Visitor,
    Department,
    Employee,
    VisitRequest,
    GatePass,
    CheckInOutLog,
    UserProfile
)


admin.site.register(Visitor)
admin.site.register(Department)
admin.site.register(Employee)
admin.site.register(VisitRequest)
admin.site.register(GatePass)
admin.site.register(CheckInOutLog)
admin.site.register(UserProfile)