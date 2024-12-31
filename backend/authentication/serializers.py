from rest_framework import serializers
from django.contrib.auth import get_user_model
from requests_oauthlib import OAuth2Session
from django.conf import settings
import random

User = get_user_model()


class RegisterSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'username', 'email', 'password')
        extra_kwargs = {
            'first_name': {'required': True},
            'last_name': {'required': True},
            'email': {'required': True},
        }

    def create(self, validated_data):
        user = User.objects.create_user(**validated_data)
        return user


class OuathCallBackSerializer(serializers.Serializer):
    code = serializers.CharField(write_only=True)

    def validate(self, attrs):
        oauth = OAuth2Session(
            client_id=settings.OAUTH_CLIENT_ID,
            redirect_uri=settings.OAUTH_REDIRECT_URI,
        )
        _ = oauth.fetch_token(
            token_url="https://api.intra.42.fr/oauth/token",
            code=attrs['code'],
            client_secret=settings.OAUTH_CLIENT_SECRET,
        )

        user_info = oauth.get("https://api.intra.42.fr/v2/me")
        user_info.raise_for_status()
        user_info_json = user_info.json()

        return {
            'username': user_info_json['login'],
            'email': user_info_json['email'],
            'first_name': user_info_json['first_name'],
            'last_name': user_info_json['last_name'],
            'avatar': user_info_json['image']["link"],
        }

    def unique_unique_username(self, username):
        while User.objects.filter(username=username).exists():
            username = f"{username}_{random.randint(1000, 9999)}"
        return username

    def create(self, validated_data):
        username = self.unique_unique_username(validated_data['username'])
        validated_data['username'] = username
        email = validated_data.pop('email')
        user, _ = User.objects.get_or_create(email=email, defaults={**validated_data})
        return user


class UserInfoSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'


class UpdateUserSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = ('first_name', 'last_name', 'password')
        extra_kwargs = {
            'password': {'write_only': True},
            'first_name': {'required': False},
            'last_name': {'required': False}
        }

    def update(self, instance, validated_data):
        # Get each field from validated_data, or keep existing value if not provided
        instance.first_name = validated_data.get('first_name', instance.first_name)
        instance.last_name = validated_data.get('last_name', instance.last_name)

        # Only update password if provided
        if 'password' in validated_data:
            instance.set_password(validated_data['password'])

        # Save the changes to database
        instance.save()
        return instance

class UpdateUsernameSerializer(serializers.ModelSerializer):
    class Meta:
        model = User
        fields = '__all__'
    def update(self, instance, validated_data):
        instance.username = validated_data.get('username', instance.username)
        instance.save()
        return instance
