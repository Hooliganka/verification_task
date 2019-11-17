import pytest
import json

from django.urls import reverse
from conftest import client, JCT


@pytest.mark.django_db
def test_login(django_user_model):
    """
        Проверка авторизации
    """
    django_user_model.objects.create_user(email="test@tester.com", password='1', is_active=True, first_name='tester')
    response = client.post(reverse('login'), json.dumps({
        "email": "test@tester.com",
        "password": "1"
    }), content_type=JCT)

    assert response.status_code == 200

@pytest.mark.django_db
def test_fail1_login(django_user_model):
    """
        Не передали email для авторизации
    """
    django_user_model.objects.create_user(email="test@tester.com", password='1', is_active=True, first_name='tester')
    response = client.post(reverse('login'), json.dumps({
        "password": "1"
    }), content_type=JCT)

    assert response.status_code == 400


@pytest.mark.django_db
def test_fail2_login(django_user_model):
    """
        Не правильный пароль
    """
    django_user_model.objects.create_user(email="test@tester.com", password='1', is_active=True, first_name='tester')
    response = client.post(reverse('login'), json.dumps({
        "email": "test@tester.com",
        "password": "144"
    }), content_type=JCT)

    assert response.status_code == 400


@pytest.mark.django_db
def test_fail3_login(django_user_model):
    """
        Пользователь не найден
    """
    django_user_model.objects.create_user(email="test@tester.com", password='1', is_active=True, first_name='tester')
    response = client.post(reverse('login'), json.dumps({
        "email": "test4@tester.com",
        "password": "1"
    }), content_type=JCT)

    assert response.status_code == 400


@pytest.mark.django_db
def test_registration():
    """
        Регистрация
    """
    response = client.post(reverse('registration'), json.dumps({
        "email": "test_user@site.ru",
        "first_name": "tester",
        "password": "123123",
        "language": "ru"
    }), content_type=JCT)

    assert response.status_code == 201


@pytest.mark.django_db
def test_all_users(login_header):
    """
        Получение пользователей
    """
    response = client.get(reverse('users'), content_type=JCT, **login_header)

    assert response.status_code == 200


@pytest.mark.django_db
def test_edit_user(login_header):
    """
        Изменение пользователя
    """
    username = "Tester"
    response = client.put(reverse('user'), json.dumps({
        "first_name": username
    }), content_type=JCT, **login_header)

    assert response.json().get("first_name") == username
    assert response.status_code == 200


@pytest.mark.django_db
def test_get_user(login_header):
    """
        Получение пользователя
    """
    response = client.get(reverse('user'), content_type=JCT, **login_header)

    assert response.status_code == 200
