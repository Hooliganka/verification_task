from modeltranslation.translator import register, TranslationOptions
from cars.models import Car


@register(Car)
class NewsTranslationOptions(TranslationOptions):
    fields = ('name',)
