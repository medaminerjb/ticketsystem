from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import LoginView,SignUp,TicketsApi,Logout
from django.contrib.auth.views import LogoutView
router = DefaultRouter()


urlpatterns = [

    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignUp.as_view(), name='signup'),
    path('ticket/', TicketsApi.as_view(), name='ticket'), # new endpoint for creating new ticket
    path('tickets/<int:id>/', TicketsApi.as_view(), name='ticket-detail'),  # For DELETE
    path('tickets/<int:id>/update/', TicketsApi.as_view(), name='ticket-update'),
    path('logout/', Logout.as_view(), name='logout'),


]
