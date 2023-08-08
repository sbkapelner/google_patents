import requests
from bs4 import BeautifulSoup
import re


def headers():
    my_headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15",
        "Accept-Encoding": "gzip, deflate",
        "Accept": "*/*",
        "Connection": "keep-alive",
    }

    return my_headers


def get_priority_date(no):
    html = requests.get(
        f"https://patents.google.com/patent/{no}/en?oq={no}", headers=headers()
    ).text
    soup = BeautifulSoup(html, "html.parser")
    priority_date = soup.find(itemprop="priorityDate").text

    return priority_date
