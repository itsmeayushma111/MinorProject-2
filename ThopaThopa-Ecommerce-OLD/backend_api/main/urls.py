from django.urls import path,include
from . import views
from rest_framework import routers

router=routers.DefaultRouter()
router.register('address',views.CustomerAddressViewSet)
router.register('productrating',views.ProductRatingViewSet)
# router.register('product-images', views.ProductImageViewSet)

urlpatterns = [
    # Vendors
    path('vendors/',views.VendorList.as_view() ),
    path('vendor/<int:pk>',views.VendorDetail.as_view() ),
    path('vendor/register/',views.vendor,name='vendor_register'),
    # Products
    path('products/',views.ProductList.as_view() ),
    path('products/tag/<str:tag>/', views.TagProductList.as_view()),
    path('product/<int:pk>',views.ProductDetail.as_view() ),
    path('related-products/<int:pk>/', views.RelatedProductList.as_view()),
    # Product Categories
    path('categories/',views.CategoryList.as_view() ),
    path('category/<int:pk>',views.CategoryDetail.as_view() ),
    # Customers
    path('customers/',views.CustomerList.as_view() ),
    path('customer/<int:pk>',views.CustomerDetail.as_view() ),
    path('customer/login/',views.customer_login,name='customer_login'),
    path('customer/register/',views.customer_register,name='customer_register'),
    # Order
    path('orders/',views.OrderList.as_view() ),
    path('order/<int:pk>',views.OrderDetail.as_view() ),
    path('orderitems/',views.OrderItemList.as_view() ),
    path('', include(router.urls)),
]

