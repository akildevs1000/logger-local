@ECHO OFF


cd device-sdk
start FCardProtocolAPI.exe

cd ..

cd src

timeout /t 10
@set PATH=node;%PATH%
start node socket.js ws://localhost:5000/Websocket
