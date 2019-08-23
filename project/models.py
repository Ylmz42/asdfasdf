from django.contrib.auth.models import Permission, User
from django.db import models

# Create your models here.


class Project(models.Model):

    user = models.ForeignKey(
        User, default=1, on_delete=models.SET_DEFAULT, related_name='user')
    name = models.CharField(max_length=100)
    situation = models.CharField(max_length=10)

    def __str__(self):
        return self.name + ' - ' + self.situation


class Application(models.Model):

    project = models.ForeignKey(
        Project, on_delete=models.CASCADE, related_name='project')
    name = models.CharField(max_length=100)
    access = models.CharField(max_length=100)
    username = models.CharField(max_length=30)
    notes = models.TextField(max_length=1000)
    checklist = models.CharField(max_length=100)
    reported = models.CharField(max_length=100)

    def __str__(self):
        return self.name + ' - ' + self.access + ' - ' + self.username + ' - ' + self.notes + ' - ' + self.checklist + ' - ' + self.reported

    def usernameInApp(userRequest):
        appList = []
        applications = Application.objects.all()
        for app in applications:
            userInApp = (app.username).split(',')
            for user in userInApp:
                if user == userRequest.user.username:
                    appList.append(app)
        return appList

    def stats(request):
        percentage = 0.0
        percentage_list = []
        application = Application.objects.all()
        for app in application:
            percentage = (app.reported).count('1')/len(app.reported)
            percentage_list.append([app.id, percentage])
        return percentage_list

class CheckList(models.Model):

    name = models.CharField(max_length=100)

    def __str__(self):
        return self.name
