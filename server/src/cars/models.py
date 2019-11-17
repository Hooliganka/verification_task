from django.db import models
from custom_users.models import User


class Car(models.Model):
    class Meta:
        verbose_name = 'Автомобиль'
        verbose_name_plural = 'Автомобили'

    owner = models.ForeignKey(User, verbose_name='Хозяин автомобиля', on_delete=models.CASCADE,
                              related_name='uesr_owner')
    user = models.ForeignKey(User, verbose_name='Взял в аренду', on_delete=models.CASCADE, related_name='car_to_user',
                             blank=True, null=True)
    year = models.IntegerField(verbose_name='год создания', default=0)
    name = models.CharField(verbose_name='Имя машины', max_length=255)
    date = models.DateTimeField('Дата добавления машины в систему', auto_now_add=True)
