# Generated by Django 4.1.13 on 2024-01-07 01:28

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Courses', '0004_alter_course_course_image_url_and_more'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='course_image_url',
            field=models.ImageField(blank=True, upload_to='assets/coursesPhotos/'),
        ),
        migrations.AlterField(
            model_name='course',
            name='trailer_video_url',
            field=models.FileField(blank=True, upload_to='assets/coursesVideos/'),
        ),
    ]