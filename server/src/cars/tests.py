import pytest
from django.urls import reverse

from cars.models import Car
from conftest import client, JCT
import json

from custom_users.models import User


@pytest.mark.django_db
def test_all_cars_user(login_header):
    """
        Получение всех автомобилий текущего пользователя
    """
    response = client.get(reverse('cars'), content_type=JCT, **login_header)

    assert response.status_code == 200


@pytest.mark.django_db
def test_all_cars(login_header):
    """
        Получение всех автомобилий
    """
    response = client.get(reverse('all_cars'), content_type=JCT, **login_header)

    assert response.status_code == 200


@pytest.mark.django_db
def test_create_car(login_header):
    """
        Создание машины
    """
    response = client.post(reverse('car'), json.dumps({
        "year": "2014",
        "name_ru": "Фольксваген",
        "name_en": "Volkswagen",
    }), content_type=JCT, **login_header)

    assert response.status_code == 201


@pytest.mark.django_db
def test_car_to_user(auth_user_data):
    """
        Выдача автомобиля в аренду пользователю
    """
    own = User.objects.create(email="test1@tester.com", password='1', is_active=True, first_name='tester1')
    car = Car.objects.create(
        year=1999,
        owner=own,
        name='Фольксваген',
        name_en='Volkswagen',
    )
    response = client.put(reverse('to_user', kwargs={
        'car_id': car.id,
    }), content_type=JCT, **{
        "HTTP_AUTHORIZATION": f'Bearer {auth_user_data.get("token")}'
    })

    assert response.status_code == 200
