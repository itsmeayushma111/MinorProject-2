# Generated by Django 5.1.6 on 2025-02-21 15:52

from django.db import migrations


class Migration(migrations.Migration):

    dependencies = [
        ('main', '0010_productimage'),
    ]

    operations = [
        migrations.AlterModelOptions(
            name='productimage',
            options={},
        ),
        migrations.RemoveField(
            model_name='productimage',
            name='default_address',
        ),
    ]
