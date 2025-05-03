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
    path('vendor/<int:pk>/',views.VendorDetail.as_view() ),
    path('vendor/register/',views.vendor_register,name='vendor_register'),
    path('vendor/login/',views.vendor_login,name='vendor_login'),
    path('vendor/<int:pk>/orderitems/',views.VendorOrderItemList.as_view()),
    path('vendor/<int:pk>/customers/',views.VendorCustomerList.as_view()),
    path('vendor/<int:vendor_id>/customer/<int:customer_id>/orderitems/',views.VendorCustomerOrderItemList.as_view()),
    path('vendor/<int:pk>/customers/',views.VendorCustomerList.as_view()),
    path('vendor/<int:pk>/dashboard/',views.vendor_dashboard),
    # Products
    path('products/',views.ProductList.as_view() ),
    path('products/tag/<str:tag>/', views.TagProductList.as_view()),
    path('product/<int:pk>/',views.ProductDetail.as_view() ),
    path('related-products/<int:pk>/', views.RelatedProductList.as_view()),
    path('product-imgs/', views.ProductImgsList.as_view()),
    path('product-imgs/<int:product_id>/', views.ProductImgsDetail.as_view()),
    path('product-img/<int:pk>/', views.ProductImgDetail.as_view()),
    # Product Categories
    path('categories/',views.CategoryList.as_view() ),
    path('category/<int:pk>/',views.CategoryDetail.as_view() ),
    # Customers
    path('customers/',views.CustomerList.as_view() ),
    path('customer/<int:pk>/',views.CustomerDetail.as_view() ),
    path('user/<int:pk>/',views.UserDetail.as_view() ),
    path('customer/login/',views.customer_login,name='customer_login'),
    path('customer/register/',views.customer_register,name='customer_register'),
    # Order
    path('orders/',views.OrderList.as_view() ),
    path('order/<int:pk>/',views.OrderDetail.as_view() ),
    path('delete-customer-orders/<int:customer_id>/', views.delete_customer_orders),
    path('order-modify/<int:pk>/',views.OrderModify.as_view() ),
    path('orderitems/',views.OrderItemList.as_view() ),
    path('customer/<int:pk>/orderitems/',views.CustomerOrderItemList.as_view()),
    path('update_order_status/<int:order_id>/',views.update_order_status,name='update_order_status'),
    path('', include(router.urls)),
    # Customer Address
    path('customer/<int:pk>/address-list/', views.CustomerAddressList.as_view()),
    path('mark-default-address/<int:pk>/', views.mark_default_address,name='mark_default_address'),
    path('customer/dashboard/<int:pk>/', views.customer_dashboard,name='customer_dashboard'),
]

