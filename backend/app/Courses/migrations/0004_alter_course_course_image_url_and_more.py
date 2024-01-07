# Generated by Django 4.1.13 on 2024-01-06 23:35

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('Courses', '0003_course_course_image_url'),
    ]

    operations = [
        migrations.AlterField(
            model_name='course',
            name='course_image_url',
            field=models.ImageField(blank=True, upload_to='../../../frontend/src/assets/coursesVideos/'),
        ),
        migrations.AlterField(
            model_name='course',
            name='trailer_video_url',
            field=models.FileField(blank=True, upload_to='../../../frontend/src/assets/instructorsPhotos/'),
        ),
    ]
