from django.contrib import admin
from django.urls import include, path

urlpatterns = [
    path("admin/", admin.site.urls),
    path("api/", include("apps.core.urls")),
    path("api/", include("apps.suppliers.urls")),
    path('api/', include('authentication.urls')),
    path("api/", include("apps.catalogs.urls")),
    path("api/", include("apps.medicines.urls")),
    path("api/", include("apps.products.urls")),
]
