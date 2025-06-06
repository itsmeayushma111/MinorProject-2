# Generated by Django 5.1.6 on 2025-04-25 06:15

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0018_rename_orderitem_orderitems'),
    ]

    operations = [
        migrations.AddField(
            model_name='customer',
            name='profile_img',
            field=models.ImageField(null=True, upload_to='customer_imgs/'),
        ),
        migrations.AddField(
            model_name='vendor',
            name='mobile',
            field=models.PositiveBigIntegerField(null=True, unique=True),
        ),
        migrations.AddField(
            model_name='vendor',
            name='profile_img',
            field=models.ImageField(null=True, upload_to='seller_imgs/'),
        ),
    ]
