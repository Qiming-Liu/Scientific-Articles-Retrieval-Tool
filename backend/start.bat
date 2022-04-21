pip install -r requirements.txt
@echo off
start ./frpc/frpc.exe -c ./frpc/frpc.ini
start python app.py