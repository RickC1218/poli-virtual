# Generated by Django 4.1.13 on 2024-01-06 18:25

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Courses', '0002_alter_course_trailer_video_url'),
    ]

    operations = [
        migrations.AddField(
            model_name='course',
            name='course_image_url',
            field=models.URLField(blank=True, default=''),
        ),
    ]