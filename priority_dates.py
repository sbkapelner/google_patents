import requests
from bs4 import BeautifulSoup
import re

my_headers = {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15",
    "Accept-Encoding": "gzip, deflate",
    "Accept": "*/*",
    "Connection": "keep-alive",
}

r = requests.get(
    "https://patents.google.com/patent/US10509073B2/en?oq=US10509073B2",
    headers=my_headers,
).text
soup = BeautifulSoup(r, "html.parser")

priority_date = soup.find(itemprop="priorityDate").text

print(priority_date)
