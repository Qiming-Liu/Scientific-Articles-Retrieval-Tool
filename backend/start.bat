pip install -r requirements.txt
docker-compose up -d
@echo off
start ./frpc/frpc.exe -c ./frpc/frpc.ini
start python app.py