# Generated by Django 4.1.13 on 2023-12-08 22:21

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Users', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='email_verification',
            field=models.BooleanField(default=False),
        ),
    ]
