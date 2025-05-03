from rest_framework import generics,permissions,pagination,viewsets
from . import serializers
from . import models

from django.http import JsonResponse
from django.views.decorators.csrf import csrf_exempt
from django.contrib.auth import authenticate
import json
from django.contrib.auth.models import User

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
                password = password,
            )

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
                password = password,
            )

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

# Product Image
# class ProductImageViewSet(viewsets.ModelViewSet):
# queryset = models.ProductImage.objects.all()
# serializer_class=serializers.ProductImageSerializer