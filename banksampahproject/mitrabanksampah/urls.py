from django.urls import path

from . import views

urlpatterns = [
        #Leave as empty string for base url
	path('', views.home, name="home"),
	path('profile/', views.profile, name="profile"),
	path('galeri/', views.galeri, name="galeri"),
    path('report/', views.report, name="report"),
	path('form_Mitra/', views.form_mitra, name="form_mitra"),
	path('form_nonMitra/', views.form_nonMitra, name="form_nonMitra"),
	path('regist/', views.register, name="register"),
 	path('login/', views.login, name="login"),
	path('admindash/', views.dashboard, name="dashboard"),
	path('adminmain/', views.maintenance, name="maintenance"),
	path('adminmitra/', views.mitrabs, name="mitrabs"),
 	path('admintrans/', views.transaction, name="transaction")
]