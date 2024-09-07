from rest_framework import viewsets
from .models import Ticket
from django.contrib.auth.models import User
from .serializers import TicketSerializer
from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout

class TicketViewSet(viewsets.ModelViewSet):
    queryset = Ticket.objects.all()
    serializer_class = TicketSerializer
class LoginView(APIView):
    def post(self, request):
        
        # Extract email and password from the JSON body of the request
        email = request.data.get('email')
        password = request.data.get('password')
        # Authenticate user
        user = authenticate(request, username=email, password=password)
        if user is not None:
            # Authentication successful
            return Response({"message": "Login successful"}, status=status.HTTP_200_OK)
        else:
            # Authentication failed
            return Response({"message": "Invalid email or password"}, status=status.HTTP_400_BAD_REQUEST)

class SignUp(APIView):
    def post(self, request):
        
        # Extract email and password from the JSON body of the request
        email = request.data.get('email')
        password = request.data.get('password')
        new_user = User.objects.create_user(username=email, password=password)
        new_user.save()
        return Response({"message": "signup successful"}, status=status.HTTP_200_OK)
        # Authenticate user
                
                