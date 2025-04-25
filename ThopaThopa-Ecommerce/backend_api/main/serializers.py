from rest_framework import serializers
from . import models

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

# Product
class ProductListSerializer(serializers.ModelSerializer):
    product_ratings=serializers.StringRelatedField(many=True,read_only=True)
    class Meta:
        model=models.Product
        fields=['id','category','vendor','title','tag_list','detail','price','product_ratings','image']
    
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
        fields=['id','category','vendor','title','tag_list','detail','price','product_ratings','product_imgs','image']
    
    def __init__(self, *args, **kwargs):
        super(ProductDetailSerializer, self).__init__(*args, **kwargs)
        # self.Meta.depth = 1

# Customer
class CustomerSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Customer
        fields=['id','user','mobile']

    def __init__(self, *args, **kwargs):
        super(CustomerSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

class CustomerDetailSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Customer
        fields=['id','user','mobile']
    
    def __init__(self, *args, **kwargs):
        super(CustomerDetailSerializer, self).__init__(*args, **kwargs)
        self.Meta.depth = 1

# Order
class OrderSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.Order
        fields=['id','customer','order_time']

    # def __init__(self, *args, **kwargs):
    #     super(OrderSerializer, self).__init__(*args, **kwargs)
    #     self.Meta.depth = 1

class OrderItemSerializer(serializers.ModelSerializer):
    class Meta:
        model=models.OrderItems
        fields=['id','order','product','qty','price']

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
        self.Meta.depth = 1

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