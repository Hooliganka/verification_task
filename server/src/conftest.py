import json
import pytest

from django.test import Client
from django.urls import reverse

client = Client()
JCT = 'application/json'


@pytest.fixture()
@pytest.mark.django_db
def login_header(django_user_model):
    """
        Получение токена.
    """
    django_user_model.objects.create_user(email="test@tester.com", password='1', is_active=True, first_name='tester')
    response = client.post(reverse('login'), json.dumps({
        "email": "test@tester.com",
        "password": "1"
    }), content_type=JCT)
    return {"HTTP_AUTHORIZATION": f'Bearer {response.json().get("token")}'}


@pytest.fixture()
@pytest.mark.django_db
def auth_user_data(django_user_model):
    """
        Получение авторизированного пользователя.
    """
    django_user_model.objects.create_user(email="test@tester.com", password='1', is_active=True, first_name='tester')
    response = client.post(reverse('login'), json.dumps({
        "email": "test@tester.com",
        "password": "1"
    }), content_type=JCT)
    return response.json()
