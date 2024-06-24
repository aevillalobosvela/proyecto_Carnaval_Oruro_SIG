from django import forms
from django.forms import ModelForm
from .models import calificacion

class CreateNewProject(forms.Form):
    name = forms.CharField(label="Nombre del proyecto", max_length=200)

class calificacionForm(forms.ModelForm):
    class Meta:
        model = calificacion
        fields = ['rating_need', 'rating_situation', 'rating_experience', 'rating_satisfaction']