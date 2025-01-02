from rest_framework_simplejwt.views import TokenObtainSlidingView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import SlidingToken
from .serializers import RegisterSerializer, \
    OuathCallBackSerializer, UserInfoSerializer, TwoFatorAuthcSerializer
from rest_framework import status, generics, permissions
from rest_framework.decorators import api_view

class TestAuthView(APIView):

    def get(self, request):
        return Response({"message": "success"})


class LoginView(TokenObtainSlidingView):
    def post(self, request):
        response = super().post(request)
        if response.status_code == 200:
            response.set_cookie(
                key="jwt_token",
                value=response.data.pop('token'),
                httponly=True,
            )
            response.data = {"message": "you loged in successfully"}
        return response


class LogOutView(APIView):
    def get(self, request):
        token = SlidingToken(request.COOKIES["jwt_token"])
        token.blacklist()
        res = Response({"message": "you signed out"})
        res.delete_cookie("jwt_token")
        return res


class RegisterView(APIView):
    permission_classes = []
    serializer_class = RegisterSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({"message": "user created successfully"})


class OauthCallBackView(APIView):
    permission_classes = []
    serializer_class = OuathCallBackSerializer

    def post(self, request):
        serializer = self.serializer_class(data=request.data)
        serializer.is_valid(raise_exception=True)
        user = serializer.save()
        token = SlidingToken.for_user(user)
        res = Response({"message": "you loged in successfully"})
        res.set_cookie(
            key="jwt_token",
            value=str(token),
            httponly=True,
        )
        return res


class UserView(APIView):
    serializer_class = UserInfoSerializer

    def get(self, request):
        user = request.user
        serializer = self.serializer_class(user)
        return Response(serializer.data)


class TwoFaBaseView(generics.GenericAPIView):
    serializer_class = TwoFatorAuthcSerializer
    permission_classes = [permissions.IsAuthenticated]

    def post(self, request):
        self.context["request"] = request
        serializer = self.serializer_class(
            data=request.data,
            context=self.context,
        )
        serializer.is_valid(raise_exception=True)
        return Response(serializer.validated_data)
        pass

class Enable2FAView(TwoFaBaseView):
    context = {"action": "enable"}

class Disable2FAView(TwoFaBaseView):
    context = {"action": "disable"}
    