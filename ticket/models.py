
from django.db import models
from django.contrib.auth.models import User

class Ticket(models.Model):
    id = models.AutoField(primary_key=True)
    value = models.CharField(max_length=200,null=True, blank=True)
    status = models.CharField(max_length=200,null=True, blank=True)
    done = models.BooleanField(default=False)
    user = models.ForeignKey(User, null=True,blank=True,on_delete=models.CASCADE)
    
    created_at = models.DateTimeField(auto_now_add=True)
    updated_at = models.DateTimeField(auto_now=True)
    
    def __str__(self):
        return self.value


# Create your models here.
