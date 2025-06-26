import requests
api_key="2e11b8a13eb94a3f9cd86560eeea7a2c"
query=input("What type of news are you interested in: ")
url=f"https://newsapi.org/v2/everything?q={query}&from=2025-05-26&sortBy=publishedAt&apiKey={api_key}"
c=requests.get(url)
data=c.json()
articles=(data["articles"])
i=1
for article in articles:
    print(i,". ",article["title"],"\n")
    i+=1
    
    print(article["url"])
    print("\n ______________________________________________________________\n")