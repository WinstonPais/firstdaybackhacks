from django.shortcuts import render
from mainapp.apidetails import getFlightDetails,getCovidData
# Create your views here.

def index(request):
    return render(request,'index.html')

def input(request):
    return render(request,'input.html')

def result(request):
    d={}
    api_key = "AIzaSyB7-fsDcAMuQHANPCIsBeGiyyqlOizpRsg"
    d["API_KEY"] = api_key
    d["dest"] = "NYC"
    d["org"] = "MOW"
    flightdict = getFlightDetails("2020-11","NYC","MOW")
    covidict = getCovidData("United States")
    return render(request,'results.html',{**d,**flightdict,**covidict})
