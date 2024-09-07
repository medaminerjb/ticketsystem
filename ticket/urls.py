from django.urls import path, include
from rest_framework.routers import DefaultRouter
from .views import TicketViewSet,LoginView,SignUp

router = DefaultRouter()
router.register(r'tickets', TicketViewSet)

urlpatterns = [
    path('', include(router.urls)),
    path('login/', LoginView.as_view(), name='login'),
    path('signup/', SignUp.as_view(), name='signup'),
]
