import pytest
from django.urls import reverse


@pytest.mark.django_db
def test_visitor_api_requires_login(client):
    response = client.get('/api/visitors/')
    assert response.status_code == 401
