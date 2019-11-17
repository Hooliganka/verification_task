from django.core.mail import send_mail
from rest_framework.generics import CreateAPIView, ListAPIView
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView

from cars.models import Car
from cars.serializers import CarSerializer, CarCreateSerializer
from verification_task import settings


class CreateCarAPIView(CreateAPIView):
    """
        Создание машины
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = CarCreateSerializer

    def perform_create(self, serializer):
        return serializer.save(owner=self.request.user)

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class CarListUserAPIView(ListAPIView):
    """
        Получение всех автомобилий текущего пользователя
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = CarSerializer

    def get_queryset(self):
        return Car.objects.filter(owner=self.request.user)

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class CarListAPIView(ListAPIView):
    """
        Получение всех автомобилий
    """
    permission_classes = (IsAuthenticated,)
    serializer_class = CarSerializer
    queryset = Car.objects.all()

    def get(self, request, *args, **kwargs):
        return self.list(request, *args, **kwargs)


class CarToUserAPIView(APIView):
    """
        Выдача автомобиля в аренду пользователю
    """
    permission_classes = (IsAuthenticated,)

    def put(self, request, car_id):
        car = Car.objects.get(
            id=car_id
        )
        car.user = request.user
        car.save()

        email = request.user.email
        email_message = 'Вы взяли в аренду машину'
        send_mail('Аренда машины', email_message, settings.EMAIL_HOST_USER, [email])

        return Response({"success": "ok"})
