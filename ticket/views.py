
from .models import Ticket
from django.contrib.auth.models import User

from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth import authenticate, login, logout
from django.contrib.auth.decorators import login_required
from rest_framework.authtoken.models import Token

class LoginView(APIView):
    def post(self, request):
        
        # Extract email and password from the JSON body of the request
        email = request.data.get('email')
        password = request.data.get('password')
        # Authenticate user
        user = authenticate(request, username=email, password=password)
        if user is not None:
            # Authentication successful
            token = Token.objects.create(user=user)
            return Response({"message": "Login successful","user":token.key}, status=status.HTTP_200_OK)
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

class TicketsApi(APIView):

    def get(self, request):
        
        data = Ticket.objects.filter()
        data = list(data.values())
        return Response(data, status=status.HTTP_200_OK)
    def post(self, request):
        # Extract email and password from the JSON body of the request
        ticket = request.data.get('newticket')

        newticket = Ticket.objects.create(value=ticket,status="active")
        newticket.save()
        return Response({"message": "add successful"}, status=status.HTTP_200_OK)
    def delete(self, request,id):
        
 
        print('//////////////////////////////////////////////////////////////')
        ticket = Ticket.objects.get(id=id)
        ticket.delete()
        return Response({"message": "delete successful"}, status=status.HTTP_200_OK)
    
    def put(self, request, id):
        ticket = Ticket.objects.get(id=id)
        if 'value' in request.data:
            value = request.data.get('value')

            print(value)
            ticket.value = value
            ticket.save()

            return Response({"message": "updated successful"}, status=status.HTTP_200_OK)
        if 'status' in request.data:
        

            ticket.done = False if ticket.done else True
            ticket.save()

            return Response({"message": "updated successful"}, status=status.HTTP_200_OK)
class Logout(APIView):
    def post(self, request):
        print(request.user)
        token = request.data.get('token')
        token = Token.objects.get(key=token)
        token.delete()
        #logout(request)
        
        return Response({"message": "logout successful"}, status=status.HTTP_200_OK)
                