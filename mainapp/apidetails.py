import requests
import json

def formatdatetime(s):
    lst = [s.split("T")[0],s.split("T")[1][:-1]]
    return " ".join(lst)

def getFlightDetails(dd,dest,org):
    url = "https://travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com/v1/prices/direct/"

    querystring = {"depart_date":dd,"destination":dest,"origin":org,"currency":"usd"}

    headers = {
        'x-access-token': "f0afb81f080d1df0aff58f61abb73cc8",
        'x-rapidapi-host': "travelpayouts-travelpayouts-flight-data-v1.p.rapidapi.com",
        'x-rapidapi-key': "685b594612msh31bcb1f55f7a8afp153497jsn5d214ab6d507"
        }

    response = requests.request("GET", url, headers=headers, params=querystring)

    fjson = response.json()
    print(fjson)
    md = {}
    if fjson["success"]:
        md["price"]=fjson["data"][dest]['0']["price"]
        md["airline"]=fjson["data"][dest]['0']["airline"]
        md["flight_number"]=fjson["data"][dest]['0']["flight_number"]
        md["departure_at"]=formatdatetime(fjson["data"][dest]['0']["departure_at"])
    return md

def getCovidData(country):
    r=requests.get('https://api.apify.com/v2/key-value-stores/tVaYRsPHLjNdNBu7S/records/LATEST?disableRedirect=true')
    lst = json.loads(str(r.text))
    ind=-1
    for i in range(len(lst)):
        if lst[i]['country'] == country:
            ind = i
            break
    md = {}
    if ind != -1:
        myjsn = lst[ind]
        infected = myjsn["infected"]
        md["infected"]=myjsn["infected"]
        md["tested"]=myjsn["tested"]
        md["recovered"]=myjsn["recovered"]
        md["deceased"]=myjsn["deceased"]
        md["sourceUrl"]=myjsn["sourceUrl"]
        md["lastUpdated"]=formatdatetime(myjsn["lastUpdatedApify"])
        if infected < 10000:
            md["classname"] = "btn-success"
            md["BtnText"] = "Safe"
        elif infected < 300000:
            md["classname"] = "btn-warning"
            md["BtnText"] = "Moderately Safe"
        else:
            md["classname"] = "btn-danger"
            md["BtnText"] = "Extremely Unsafe"

    return md
