from django.db import models
from django.contrib.auth.models import User

# Vendor Models
class Vendor(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    mobile=models.PositiveBigIntegerField(unique=True,null=True)
    profile_img=models.ImageField(upload_to='seller_imgs/',null=True)
    address=models.TextField(null=True)

    def __str__(self):
        return self.user.username

# Product Category
class ProductCategory(models.Model):
    title=models.CharField(max_length=200)
    detail=models.TextField(null=True)

    class Meta:
        verbose_name_plural = "Product categories"  # Correct plural form

    def __str__(self):
        return self.title
    
# Product
class Product(models.Model):
    category=models.ForeignKey(ProductCategory,on_delete=models.SET_NULL,null=True,related_name='category_product')
    vendor=models.ForeignKey(Vendor,on_delete=models.SET_NULL,null=True)
    title=models.CharField(max_length=200)
    # slug = models.CharField(max_length=200, unique=True,null=True)
    detail=models.TextField(null=True)
    price=models.DecimalField(max_digits=10,decimal_places=2)
    tags=models.TextField(null=True)
    image=models.ImageField(upload_to='product_imgs/', null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.title
    def tag_list(self):
        if self.tags:
            return self.tags.split(',')
        return []
    
# Customer Model
class Customer(models.Model):
    user=models.ForeignKey(User,on_delete=models.CASCADE)
    mobile=models.PositiveBigIntegerField()
    profile_img=models.ImageField(upload_to='customer_imgs/',null=True)

    def __str__(self):
        return self.user.username

# Order Model
class Order(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='customer_orders')
    order_time=models.DateTimeField(auto_now_add=True)
    def __str__(self):
        return '%s' % (self.order_time)


# Order Items Model
class OrderItems(models.Model):
    order=models.ForeignKey(Order,on_delete=models.CASCADE,related_name='order_items')
    product=models.ForeignKey(Product,on_delete=models.CASCADE)
    qty=models.IntegerField(default=1)
    price=models.DecimalField(max_digits=10,decimal_places=2,default=0)

    def __str__(self):
        return self.product.title
    
# Customer Address Model
class CustomerAddress(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='customer_addresses')
    address = models.TextField(null=True, blank=True)
    default_address=models.BooleanField(default=False)

    class Meta:
        verbose_name_plural = "Customer addresses"  # Correct plural form

    def __str__(self):
        return self.address
    
# Product Rating and Reviews
class ProductRating(models.Model):
    customer=models.ForeignKey(Customer,on_delete=models.CASCADE,related_name='rating_customers')
    product=models.ForeignKey(Product,on_delete=models.CASCADE,related_name='product_ratings')
    rating=models.IntegerField()
    reviews=models.TextField()
    add_time=models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f'{self.rating} - {self.reviews}'
    
# Product Images Model
class ProductImage(models.Model):
    product=models.ForeignKey(Product,on_delete=models.CASCADE,related_name='product_imgs')
    image = models.ImageField(upload_to='product_imgs/' ,null=True)

    def __str__(self):
        return self.image.url