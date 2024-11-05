from django.shortcuts import render

# Create your views here.

def home(request):
     context = {}
     return render(request, 'pengguna/home.html', context)

def profile(request):
     context = {}
     return render(request, 'pengguna/profile.html', context)

def galeri(request):
      context = {}
      return render(request, 'pengguna/galeri.html', context)

def report(request):
     context = {}
     return render(request, 'pengguna/report.html', context)

def form_mitra(request):
     context = {}
     return render(request, 'pengguna/formMitra.html', context)

def form_nonMitra(request):
      context = {}
      return render(request, 'pengguna/formnonMitra.html', context)

def register(request):
     context = {}
     return render(request, 'regist/register.html', context)

def login(request):
     context = {}
     return render(request, 'regist/login.html', context)

def dashboard(request):
     context = {}
     return render(request, 'admin/dashboard.html', context)

def maintenance(request):
     context = {}
     return render(request, 'admin/maintenance.html', context)

def mitrabs(request):
     context = {}
     return render(request, 'admin/mitrabs.html', context)

def transaction(request):
     context = {}
     return render(request, 'admin/transaction.html', context)
