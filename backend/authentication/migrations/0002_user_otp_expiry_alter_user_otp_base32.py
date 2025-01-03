# Generated by Django 4.2.16 on 2025-01-02 22:39

from django.db import migrations, models


class Migration(migrations.Migration):

    dependencies = [
        ('authentication', '0001_initial'),
    ]

    operations = [
        migrations.AddField(
            model_name='user',
            name='otp_expiry',
            field=models.DateTimeField(blank=True, null=True),
        ),
        migrations.AlterField(
            model_name='user',
            name='otp_base32',
            field=models.CharField(default='6JH7DOSELSI6AR62LGS7XJWE2O5YLKAN', max_length=32),
        ),
    ]
