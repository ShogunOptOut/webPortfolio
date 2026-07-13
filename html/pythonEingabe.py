from html.pythonEingabe import Element

def run_code():
    code = Element("codeInput").value
    exec(code)
    
    # in html einbinden