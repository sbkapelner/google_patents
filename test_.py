import pytest
import pandas as pd
from script import get_status


def test_status():
    test_data = pd.read_csv("testdata.csv")
    result_links = test_data["result link"].to_list()
    correct_answer = test_data["status-date"].to_list()

    assert get_status(result_links[0]) == "Expired"
    assert get_status(result_links[1]) == "Active (Exp. 2031-8-02)"
