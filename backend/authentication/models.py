from django.db import models
from django.contrib.auth.models import AbstractUser
import pyotp


class User(AbstractUser):
    avatar = models.URLField(max_length=200, null=True, blank=True)
    coverImage = models.URLField(max_length=200, null=True, blank=True)
    email = models.EmailField(unique=True)
    twofa_enabled = models.BooleanField(default=False)
    otpauth_url = models.CharField(max_length=225, blank=True, null=True)
    otp_base32 = models.CharField(max_length=32, default=pyotp.random_base32())
    friends = models.ManyToManyField('User', blank=True)
    level = models.PositiveIntegerField(default=0)
    status = models.CharField(max_length=20, default='offline')
    
    @property
    def verify_otp(self, otp_code):
        return pyotp.TOTP(self.otp_base32).verify(otp_code)
    
    def __str__(self) -> str:
        return self.username
# Create your models here.



# class   Product(models.Model):
#     name = models.CharField(max_length=100)
#     price = models.PositiveIntegerField(default=0)
#     description = models.TextField()


# class   Notification(models.Model):
#     title = models.CharField(max_length=100)
    
#     class   NotifType(models.TextChoices):
#         FRIEND = 'Friend', 'Friend'
#         CHAT = 'chat', 'chat'
#         TOUR = 'tour', 'tour'
#         MATCH = 'match', 'match'
    
#     notif_type = models.CharField(max_length=20, choices=NotifType.choices, default=NotifType.FRIEND)

#     def __str__(self) -> str:
#         return str(self.title)
    
    