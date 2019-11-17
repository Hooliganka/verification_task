import jwt
from django.contrib.auth import user_logged_in
from rest_framework import status
from rest_framework.generics import RetrieveUpdateAPIView, CreateAPIView, ListAPIView
from rest_framework.permissions import AllowAny, IsAuthenticated
from rest_framework.response import Response
from rest_framework.views import APIView
from rest_framework_jwt.serializers import jwt_payload_handler

from custom_users.models import User
from custom_users.serializers import UserSerializer
from verification_task import settings


class CreateUserAPIView(CreateAPIView):
    """
        Регистрация пользователя
    """
    permission_classes = (AllowAny,)
    serializer_class = UserSerializer

    def post(self, request, *args, **kwargs):
        return self.create(request, *args, **kwargs)


class AuthenticateUserAPIView(APIView):
    """
        Авторизация пользователя
    """
    permission_classes = (AllowAny,)

    def post(self, request):
        try:
            email = request.data['email']
            password = request.data['password']
        except KeyError:
            return Response({
                'error': 'Не корректные данные'
            }, status=status.HTTP_400_BAD_REQUEST)

        try:
            user = User.objects.get(email=email)
            if not user.check_password(password):
                return Response({
                    'error': 'Пароль не верный'
                }, status=status.HTTP_400_BAD_REQUEST)

        except User.DoesNotExist:
            return Response({
                'error': 'Пользователь не найден'
            }, status=status.HTTP_400_BAD_REQUEST)

        payload = jwt_payload_handler(user)
        token = jwt.encode(payload, settings.SECRET_KEY)
        user_details = {
            'name': f"{user.first_name}",
            'token': token
        }
        user_logged_in.send(
            sender=user.__class__,
            request=request,
            user=user
        )
        return Response(user_details, status=status.HTTP_200_OK)


class UserRetrieveUpdateAPIView(RetrieveUpdateAPIView):
    """
        Редактирование пользователя и получение
    """
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer

    def get_object(self):
        return self.request.user

    def put(self, request, *args, **kwargs):
        return self.partial_update(request, *args, **kwargs)


class UsersAPIView(ListAPIView):
    """
        Получение пользователей
    """
    permission_classes = (IsAuthenticated,)
    queryset = User.objects.all()
    serializer_class = UserSerializer
