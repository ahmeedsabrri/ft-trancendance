from rest_framework_simplejwt.views import TokenObtainSlidingView
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework_simplejwt.tokens import SlidingToken
from .serializers import RegisterSerializer, \
    OuathCallBackSerializer, UserInfoSerializer, UpdateUserSerializer, UpdateUsernameSerializer
from rest_framework import status
from rest_framework.permissions import IsAuthenticated

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


class UpdateUserView(APIView):
    permission_classes = [IsAuthenticated]
    serializer_class = UpdateUserSerializer
    def put(self, request):
        user = request.user
        serializer = self.serializer_class(user, data=request.data, partial=True)
        print(serializer.data.items('username'))
        if serializer.is_valid():
            # This will call the update method in serializer
            updated_user = serializer.save()

            # Return the updated data
            return Response({
                'message': 'User updated successfully',
                'user': {
                    'first_name': updated_user.first_name,
                    'last_name': updated_user.last_name,
                }
            }, status=status.HTTP_200_OK)

        return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)


class UpdateUsernameView(APIView):
    serializer_class = UpdateUsernameSerializer
    def put(self, request):
        username = request.user.username
        serializer = self.serializer_class(username, data=request.username)
        serializer.is_valid(raise_exception=True)
        serializer.save()
        return Response({
                'message': 'User updated successfully',
            }, status=status.HTTP_200_OK)