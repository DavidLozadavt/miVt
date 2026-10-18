from django.db import models
from django.conf import settings


class PerfilUsuario(models.Model):
    usuario = models.OneToOneField(
        settings.AUTH_USER_MODEL,
        on_delete=models.CASCADE,
        related_name="perfil"
    )

    telefono = models.CharField(
        max_length=20,
        blank=True
    )

    def __str__(self):
        return self.usuario.username