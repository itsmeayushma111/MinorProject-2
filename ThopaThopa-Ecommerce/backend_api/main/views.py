from rest_framework import generics,permissions,pagination,viewsets
from . import serializers
from . import models

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
import json
from django.contrib.auth.models import User
from .models import Order, Vendor, OrderItems

# responsible for listing and adding the data
class VendorList(generics.ListCreateAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class=serializers.VendorSerializer
    # permission_classes=[permissions.IsAuthenticated]

# responsible for fetching,updating and destroying single data
class VendorDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Vendor.objects.all()
    serializer_class=serializers.VendorDetailSerializer
    # permission_classes=[permissions.IsAuthenticated]

@csrf_exempt
def vendor_register(request):
    if request.method == 'POST':  
        try:
            if request.content_type == "application/json":
                data = json.loads(request.body)  # JSON data from React
            else:
                data = request.POST  # Form data (if sent from a form)

            first_name = data.get('first_name')
            last_name = data.get('last_name')
            email = data.get('email')
            mobile = data.get('mobile')
            address = data.get('address')
            username = data.get('username')
            password = data.get('password')
            user=User.objects.create(
                first_name = first_name,
                last_name = last_name,
                email = email,
                username = username,
            )
            user.set_password(password)  # this hashes the password properly
            user.save()

            if user is not None:
                # create customer
                vendor=models.Vendor.objects.create(
                    user=user,
                    mobile=mobile,
                    address=address,
                )
                return JsonResponse({
                    'bool':True,
                    "user": user.id,
                    'vendor':vendor.id,
                    'msg':'Thank you for your registration. You can login now.'
                })
            else:
                return JsonResponse({
                    'bool':False,
                    "msg": "Oops... Something went wrong!!"
                })
        except json.JSONDecodeError:
            return JsonResponse({
                "bool": "error",
                "msg": "Invalid JSON format"
            }, status=400)

    return JsonResponse({"bool": False, "message": "Invalid request method"}, status=400)

@csrf_exempt
def vendor_login(request):
    if request.method == 'POST':  
        try:
            if request.content_type == "application/json":
                data = json.loads(request.body)  # JSON data from React
            else:
                data = request.POST  # Form data (if sent from a form)

            username = data.get('username')
            password = data.get('password')

            # Authenticate user
            user = authenticate(username=username, password=password)

            if user is not None:
                vendor=models.Vendor.objects.get(user=user)
                return JsonResponse({
                    'bool':True,
                    "user": user.username,
                    "id": vendor.id,
                })
            else:
                return JsonResponse({
                    'bool':False,
                    "msg": "Invalid username or password"
                })
        except json.JSONDecodeError:
            return JsonResponse({
                "bool": "error",
                "msg": "Invalid JSON format"
            }, status=400)

    return JsonResponse({"bool": False, "message": "Invalid request method"}, status=400)

# Product
class ProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all().order_by('-created_at')
    serializer_class=serializers.ProductListSerializer
    pagination_class=pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        if 'category' in self.request.GET:
            category=self.request.GET['category']
            category=models.ProductCategory.objects.get(id=category)
            qs=qs.filter(category=category)
        if 'fetch_limit' in self.request.GET:
            limit=int(self.request.GET['fetch_limit'])
            qs=qs[:limit]
        if 'latest' in self.request.GET:
            qs = qs.order_by('-created_at')
        return qs
    
class ProductImgsList(generics.ListCreateAPIView):
    queryset = models.ProductImage.objects.all()
    serializer_class=serializers.ProductImageSerializer

class ProductImgsDetail(generics.ListCreateAPIView):
    queryset = models.ProductImage.objects.all()
    serializer_class=serializers.ProductImageSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        product_id=self.kwargs['product_id']
        qs=qs.filter(product__id=product_id)
        return qs
    
class ProductImgDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ProductImage.objects.all()
    serializer_class=serializers.ProductImageSerializer

#image
class ProductViewSet(viewsets.ModelViewSet):
    queryset = models.Product.objects.all()
    serializer_class = serializers.ProductListSerializer
# Tag Product
class TagProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class=serializers.ProductListSerializer
    pagination_class=pagination.PageNumberPagination

    def get_queryset(self):
        qs = super().get_queryset()
        tag=self.kwargs['tag']
        qs=qs.filter(tags__icontains=tag)
        return qs
# Related Product
class RelatedProductList(generics.ListCreateAPIView):
    queryset = models.Product.objects.all()
    serializer_class=serializers.ProductListSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        product_id=self.kwargs['pk']
        product=models.Product.objects.get(id=product_id)
        qs=qs.filter(category=product.category).exclude(id=product_id)
        return qs
class ProductDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Product.objects.all()
    serializer_class=serializers.ProductDetailSerializer

# Customers
class CustomerList(generics.ListCreateAPIView):
    queryset = models.Customer.objects.all()
    serializer_class=serializers.CustomerSerializer
    # permission_classes=[permissions.IsAuthenticated]

class CustomerDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.Customer.objects.all()
    serializer_class=serializers.CustomerDetailSerializer
    # permission_classes=[permissions.IsAuthenticated]

class UserDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.User.objects.all()
    serializer_class=serializers.UserSerializer
    # permission_classes=[permissions.IsAuthenticated]
@csrf_exempt
def customer_login(request):
    if request.method == 'POST':  
        try:
            if request.content_type == "application/json":
                data = json.loads(request.body)  # JSON data from React
            else:
                data = request.POST  # Form data (if sent from a form)

            username = data.get('username')
            password = data.get('password')

            # Authenticate user
            user = authenticate(username=username, password=password)

            if user is not None:
                customer=models.Customer.objects.get(user=user)
                return JsonResponse({
                    'bool':True,
                    "user": user.username,
                    "id": customer.id,
                })
            else:
                return JsonResponse({
                    'bool':False,
                    "msg": "Invalid username or password"
                })
        except json.JSONDecodeError:
            return JsonResponse({
                "bool": "error",
                "msg": "Invalid JSON format"
            }, status=400)

    return JsonResponse({"bool": False, "message": "Invalid request method"}, status=400)

@csrf_exempt
def customer_register(request):
    if request.method == 'POST':  
        try:
            if request.content_type == "application/json":
                data = json.loads(request.body)  # JSON data from React
            else:
                data = request.POST  # Form data (if sent from a form)

            first_name = data.get('first_name')
            last_name = data.get('last_name')
            email = data.get('email')
            mobile = data.get('mobile')
            username = data.get('username')
            password = data.get('password')
            user=User.objects.create(
                first_name = first_name,
                last_name = last_name,
                email = email,
                username = username,
            )
            user.set_password(password)  # this hashes the password properly
            user.save()

            if user is not None:
                # create customer
                customer=models.Customer.objects.create(
                    user=user,
                    mobile=mobile
                )
                return JsonResponse({
                    'bool':True,
                    "user": user.id,
                    'customer':customer.id,
                    'msg':'Thank you for your registration. You can login now.'
                })
            else:
                return JsonResponse({
                    'bool':False,
                    "msg": "Oops... Something went wrong!!"
                })
        except json.JSONDecodeError:
            return JsonResponse({
                "bool": "error",
                "msg": "Invalid JSON format"
            }, status=400)

    return JsonResponse({"bool": False, "message": "Invalid request method"}, status=400)


# Order
class OrderList(generics.ListCreateAPIView):
    queryset = models.Order.objects.all()
    serializer_class=serializers.OrderSerializer
    # permission_classes=[permissions.IsAuthenticated]

# Order Items
class OrderItemList(generics.ListCreateAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class=serializers.OrderItemSerializer
    # permission_classes=[permissions.IsAuthenticated]

# Customer Order Items
class CustomerOrderItemList(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class=serializers.OrderItemSerializer
    
    def get_queryset(self):
        qs=super().get_queryset()
        customer_id=self.kwargs['pk']
        qs=qs.filter(order__customer__id=customer_id)
        return qs

# Vendor Order Items
class VendorOrderItemList(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class=serializers.OrderItemSerializer
    
    def get_queryset(self):
        qs=super().get_queryset()
        vendor_id=self.kwargs['pk']
        qs=qs.filter(product__vendor__id=vendor_id)
        return qs
    
    # Vendor Customers
from django.db.models import Subquery

class VendorCustomerList(generics.ListAPIView):
    serializer_class = serializers.CustomerDetailSerializer
    
    def get_queryset(self):
        vendor_id = self.kwargs['pk']
        # First get orders containing vendor's products
        vendor_order_items = models.OrderItems.objects.filter(
            product__vendor__id=vendor_id
        ).values('order__customer')
        
        # Then get customers from those orders
        return models.Customer.objects.filter(
            id__in=Subquery(vendor_order_items)
        ).distinct()
    
    # Vendor Customer Order Items
class VendorCustomerOrderItemList(generics.ListAPIView):
    queryset = models.OrderItems.objects.all()
    serializer_class=serializers.OrderItemSerializer
    
    def get_queryset(self):
        qs=super().get_queryset()
        vendor_id=self.kwargs['vendor_id']
        customer_id=self.kwargs['customer_id']
        qs=qs.filter(order__customer__id=customer_id,product__vendor__id=vendor_id)
        return qs

class OrderDetail(generics.ListAPIView):
    # queryset = models.OrderItems.objects.all()
    serializer_class=serializers.OrderDetailSerializer
    # permission_classes=[permissions.IsAuthenticated]

    def get_queryset(self):
        order_id=self.kwargs['pk']
        order=models.Order.objects.get(id=order_id)
        order_items=models.OrderItems.objects.filter(order=order)
        return order_items

# diff diff function create garna pardaina mathi orderlist,detail jasto 
# viewset ma testo garna pardaina viewset matra add garne and add it to 
# url router and there define the prefix ,this prefix will work in url
# req url eutai func ma combine garna milxa with viewset and router
class CustomerAddressViewSet(viewsets.ModelViewSet):
    serializer_class=serializers.CustomerAddressSerializer
    queryset=models.CustomerAddress.objects.all()

class ProductRatingViewSet(viewsets.ModelViewSet):
    serializer_class=serializers.ProductRatingSerializer
    queryset=models.ProductRating.objects.all()

# category list api
class CategoryList(generics.ListCreateAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class=serializers.CategorySerializer
    # permission_classes=[permissions.IsAuthenticated]

# responsible for fetching,updating and destroying single data
class CategoryDetail(generics.RetrieveUpdateDestroyAPIView):
    queryset = models.ProductCategory.objects.all()
    serializer_class=serializers.CategoryDetailSerializer
    # permission_classes=[permissions.IsAuthenticated]
# order delete
class OrderDelete(generics.RetrieveDestroyAPIView):
    queryset = models.Order.objects.all()
    serializer_class=serializers.OrderDetailSerializer
@csrf_exempt
def delete_customer_orders(request, customer_id):
    if request.method == 'DELETE':
        vendor_id = request.GET.get('vendor_id')  # Get vendor_id as query param
        if not vendor_id:
            return JsonResponse({'bool': False, 'message': 'vendor_id is required'}, status=400)

        try:
            vendor_id = int(vendor_id)
        except ValueError:
            return JsonResponse({'bool': False, 'message': 'Invalid vendor_id'}, status=400)

        # Step 1: Get all orders of this customer
        customer_orders = Order.objects.filter(customer_id=customer_id)

        deleted_any = False

        for order in customer_orders:
            # Get all OrderItems in this order belonging to this vendor
            order_items = order.order_items.filter(product__vendor_id=vendor_id)
            if order_items.exists():
                order_items.delete()
                deleted_any = True

            # If after deleting, the order has no items left, delete the order itself
            if order.order_items.count() == 0:
                order.delete()

        if deleted_any:
            return JsonResponse({'bool': True, 'message': 'Orders for the vendor deleted.'})
        else:
            return JsonResponse({'bool': False, 'message': 'No vendor-specific orders found for this customer.'})

# order update
class OrderModify(generics.RetrieveUpdateAPIView):
    queryset = models.Order.objects.all()
    serializer_class=serializers.OrderSerializer
    # permission_classes=[permissions.IsAuthenticated]

@csrf_exempt
def update_order_status(request, order_id):
    if request.method == 'POST':
        updateRes=models.Order.objects.filter(id=order_id).update(order_status=True)
        msg={
            'bool':False,
        }
        if updateRes:
            msg={
                'bool':True,
            }
    return JsonResponse(msg)

# Product Image
# class ProductImageViewSet(viewsets.ModelViewSet):
# queryset = models.ProductImage.objects.all()
# serializer_class=serializers.ProductImageSerializer


# Customer Address
class CustomerAddressList(generics.ListAPIView):
    queryset = models.CustomerAddress.objects.all()
    serializer_class=serializers.CustomerAddressSerializer

    def get_queryset(self):
        qs = super().get_queryset()
        customer_id=self.kwargs['pk']
        qs=qs.filter(customer__id=customer_id).order_by('id')
        return qs
    
@csrf_exempt
def mark_default_address(request, pk):
    if request.method == 'POST':
        try:
            address = models.CustomerAddress.objects.get(id=pk)
            customer = address.customer
            models.CustomerAddress.objects.filter(customer=customer).update(default_address=False)
            address.default_address = True
            address.save()
            return JsonResponse({'bool': True})
        except models.CustomerAddress.DoesNotExist:
            return JsonResponse({'bool': False, 'error': 'Address not found'})

    return JsonResponse({'bool': False})

@csrf_exempt
def customer_dashboard(request, pk):
    customer_id = request.POST.get('pk')
    totalAddress=models.CustomerAddress.objects.filter(customer__id=customer_id).count()
    totalOrders=models.Order.objects.filter(customer__id=customer_id).count()
    # totalWishlist=models.Wishlist.objects.filter(customer__id=customer_id).count()

    msg={
        'totalOrders':totalOrders,
        # 'totalWishlist':totalWishlist,
        'totalAddress':totalAddress,
    }
    return JsonResponse(msg)

def vendor_dashboard(request, pk):
    vendor_id=pk
    totalProducts=models.Product.objects.filter(vendor__id=vendor_id).count()
    totalOrders=models.OrderItems.objects.filter(product__vendor__id=vendor_id).distinct().count()
    totalCustomers=models.OrderItems.objects.filter(product__vendor__id=vendor_id).values('order__customer').distinct().count()

    msg={
        'totalProducts':totalProducts,
        'totalOrders':totalOrders,
        'totalCustomers':totalCustomers,
    }
    return JsonResponse(msg)