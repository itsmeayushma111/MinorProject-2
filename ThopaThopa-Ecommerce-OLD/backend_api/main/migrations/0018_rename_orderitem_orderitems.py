# Generated by Django 5.1.6 on 2025-04-24 18:43

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0017_orderitem_price_orderitem_qty'),
    ]

    operations = [
        migrations.RenameModel(
            old_name='OrderItem',
            new_name='OrderItems',
        ),
    ]
