from rest_framework import serializers
from . import models
from django.contrib.auth.models import User

# view le serializer bata data linxa ie getting data from it and serializer gets it from model
# view responsible for returing data and serializer for transforming model data to js

# Vendor
class VendorSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Vendor
        fields=['id','user','address']

    def __init__(self, *args, **kwargs):
        super(VendorSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1

class VendorDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Vendor
        fields=['id','user','address']
    
    def __init__(self, *args, **kwargs):
        super(VendorDetailSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1
    
    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['user']=UserSerializer(instance.user).data
        return response

# Product
class ProductListSerializer(serializers.ModelSerializer):
    product_ratings=serializers.StringRelatedField(many=True,read_only=True)
    class Meta:
        model=models.Product
        fields=['id','category','vendor','title','tag_list','detail','price','product_ratings','image','tags','publish_status']
    
    def __init__(self, *args, **kwargs):
        super(ProductListSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1

# Product Image
class ProductImageSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ProductImage
        fields=['id','product','image']

class ProductDetailSerializer(serializers.ModelSerializer):
    product_ratings=serializers.StringRelatedField(many=True,read_only=True)
    product_imgs=ProductImageSerializer(many=True,read_only=True)
    class Meta:
        many=True
        model=models.Product
        fields=['id','category','vendor','title','tag_list','detail','price','product_ratings','product_imgs','image','publish_status','tags']
    
    def __init__(self, *args, **kwargs):
        super(ProductDetailSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1
    
class UserSerializer(serializers.ModelSerializer):
    class Meta:
        model=User
        fields=['id','first_name','last_name','username','email']

# Customer
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Customer
        fields=['id','user','mobile']

    def __init__(self, *args, **kwargs):
        super(CustomerSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

# In your serializers.py

# class CustomerDetailSerializer(serializers.ModelSerializer):
#     user = UserSerializer()
    
#     class Meta:
#         model = models.Customer
#         fields = ['id', 'user', 'mobile', 'profile_img']
#         extra_kwargs = {
#             'profile_img': {'required': False}
#         }

#     def update(self, instance, validated_data):
#         # Handle user data
#         user_data = validated_data.pop('user', None)
#         if user_data:
#             user = instance.user
#             for attr, value in user_data.items():
#                 setattr(user, attr, value)
#             user.save()

#         # Handle customer data
#         return super().update(instance, validated_data)
class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Customer
        fields=['id','user','mobile','profile_img']

    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['user']=UserSerializer(instance.user).data
        return response
    
    # def __init__(self, *args, **kwargs):
    #     super(CustomerDetailSerializer, self).__init__(*args, **kwargs)
    #     self.Meta.depth = 1

class OrderSerializer(serializers.ModelSerializer):
    customer = serializers.PrimaryKeyRelatedField(queryset=models.Customer.objects.all())
    class Meta:
        model=models.Order
        fields=['id','customer','order_time','order_status']

    def to_representation(self, instance):
        rep = super().to_representation(instance)
        rep['customer'] = CustomerSerializer(instance.customer).data
        return rep

class OrderItemSerializer(serializers.ModelSerializer):
    order=OrderSerializer()
    product=ProductDetailSerializer()
    class Meta:
        model=models.OrderItems
        fields=['id','order','product','qty','price']

        def to_representation(self, instance):
            response=super().to_representation(instance)
            response['order']=OrderSerializer(instance.order).data
            response['customer']=CustomerSerializer(instance.order.customer).data
            response['user']=UserSerializer(instance.order.customer.user).data
            response['product']=ProductDetailSerializer(instance.product).data
            return response

class OrderDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.OrderItems
        fields=['id','order','product']

    def __init__(self, *args, **kwargs):
        super(OrderDetailSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

# Customer Address
class CustomerAddressSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.CustomerAddress
        fields=['id','customer','address','default_address']

    def __init__(self, *args, **kwargs):
        super(CustomerAddressSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

# Product Rating
class ProductRatingSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ProductRating
        fields=['id','customer','product','rating','reviews','add_time']

    def __init__(self, *args, **kwargs):
        super(ProductRatingSerializer, self).__init__(*args, **kwargs)

    def to_representation(self, instance):
        response=super().to_representation(instance)
        response['customer']=CustomerSerializer(instance.customer).data
        return response

# Product Category
class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ProductCategory
        fields=['id','title','detail']

    def __init__(self, *args, **kwargs):
        super(CategorySerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

class CategoryDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.ProductCategory
        fields=['id','title','detail']
    
    def __init__(self, *args, **kwargs):
        super(CategoryDetailSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1