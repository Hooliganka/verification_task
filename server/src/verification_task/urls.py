"""verification_task URL Configuration

The `urlpatterns` list routes URLs to views. For more information please see:
    https://docs.djangoproject.com/en/2.2/topics/http/urls/
Examples:
Function views
    1. Add an import:  from my_app import views
    2. Add a URL to urlpatterns:  path('', views.home, name='home')
Class-based views
    1. Add an import:  from other_app.views import Home
    2. Add a URL to urlpatterns:  path('', Home.as_view(), name='home')
Including another URLconf
    1. Import the include() function: from django.urls import include, path
    2. Add a URL to urlpatterns:  path('blog/', include('blog.urls'))
"""
from django.contrib import admin
from django.urls import path, include

from cars.views import CreateCarAPIView, CarListUserAPIView, CarToUserAPIView, CarListAPIView
from custom_users.views import CreateUserAPIView, UserRetrieveUpdateAPIView, AuthenticateUserAPIView, UsersAPIView

urlpatterns = [
    path('admin/', admin.site.urls),
    path('api/', include([
        path('car/', include([
            path('<int:car_id>', CarToUserAPIView.as_view(), name='to_user'),
            path('', CreateCarAPIView.as_view(), name='car'),
        ])),
        path('cars', CarListUserAPIView.as_view(), name='cars'),
        path('all_cars', CarListAPIView.as_view(), name='all_cars'),
        path('users', UsersAPIView.as_view(), name='users'),
        path('user/', include([
            path('registration', CreateUserAPIView.as_view(), name='registration'),
            path('login', AuthenticateUserAPIView.as_view(), name='login'),
            path('', UserRetrieveUpdateAPIView.as_view(), name='user'),
        ])),
    ]))
]
