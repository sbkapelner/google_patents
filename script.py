import requests
from bs4 import BeautifulSoup
import re
from docx import Document
from docx.shared import Inches
from hyperlink import add_hyperlink


def headers():
    my_headers = {
        "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 11_6) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/14.1.2 Safari/605.1.15",
        "Accept-Encoding": "gzip, deflate",
        "Accept": "*/*",
        "Connection": "keep-alive",
    }

    return my_headers


def get_not_status(result_link):
    html = requests.get(result_link, headers=headers()).text
    soup = BeautifulSoup(html, "html.parser")

    titleandid = soup.find_all("title")[0].text
    id = re.split(" - | \n", titleandid)[0]
    title = re.split(" - | \n", titleandid)[1]

    inventor_tag = soup.find("dd", itemprop="inventor")
    inventor = "Inventor: " + inventor_tag.text

    assignee_tag = soup.find("span", itemprop="assigneeSearch")
    if assignee_tag.text != inventor_tag.text:
        assignee = "Assignee: " + assignee_tag.text
    else:
        assignee = "Assignee: None"

    return f"{id}\n", f"{title.strip()}\n{inventor}\n{assignee}\n"


def get_status(result_link):
    html = requests.get(result_link, headers=headers()).text
    soup = BeautifulSoup(html, "html.parser")
    status_tag = soup.find_all("span", itemprop="status")
    exp_tag = soup.find_all("time", itemprop="expiration")

    if not status_tag:
        status = 0
    else:
        status = status_tag[0].text
        if (
            "Expired" in status
        ):  # reset the status to Expired instead of "Expired - Fee Related"
            status = "Expired"

    if not exp_tag:
        exp = "DATE MISSING"
    else:
        exp = exp_tag[0].text

    match status:
        case "Expired":
            return status
        case "Active":
            return f"{status} (Exp. {exp})"
        case 0:
            return "No status or exp date"
        case "Abandoned":
            return status
        case "Pending":
            return status
        case "Withdrawn":
            return status


class updateDocument:
    def __init__(self, docxfilename, result_link):
        self.docxfilename = docxfilename
        self.result_link = result_link

    def create_document(self):
        document = Document()
        document.save(self.docxfilename)

    def add_table(self):
        document = Document(self.docxfilename)
        document.add_paragraph()
        table = document.add_table(rows=1, cols=1)
        table.style = "Table Grid"
        document.save(self.docxfilename)

    def add_row(self, table_no):
        document = Document(self.docxfilename)
        table = document.tables[table_no]
        table.add_row()
        cell = table._cells[len(table._cells) - 1]
        p = cell.add_paragraph()
        p.paragraph_format.space_after = Inches(0.3)
        add_hyperlink(p, get_not_status(self.result_link)[0], self.result_link)
        p.add_run(
            f"{get_not_status(self.result_link)[1]}{get_status(self.result_link)}"
        )
        document.save(self.docxfilename)


if __name__ == "__main__":
    headers()
