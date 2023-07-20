import WebSocket from "ws";
import dotenv from "dotenv";
dotenv.config();
import axios from "axios";
import fs from "fs";

let path = "database.json";

const jsonData = fs.readFileSync(path);

const data = JSON.parse(jsonData);

let socket = new WebSocket(data.socket_url);

socket.onopen = () => console.log("connected");
socket.onerror = (err) => console.log(err);

// let url = "../backend/logs/logs.csv";
let url = "debug.csv";

socket.onmessage = ({ data }) => {
  let {
    UserCode: UserID,
    DeviceID,
    RecordDate: LogTime,
    RecordNumber: SerialNumber,
  } = JSON.parse(data).Data;

  let str = `${UserID},${DeviceID},${LogTime.replace(
    "T",
    " "
  )},${SerialNumber}`;

  if (UserID > 0) {
    axios
      .post("http://127.0.0.1:8000/insert_record", {
        UserID,
        DeviceID,
        LogTime,
      })
      .then(({ data }) => {
        let result = JSON.stringify(data);
        // fs.appendFileSync(url, result + "\n");
        console.log(result);
      })
      .catch((error) => console.log(error));
  }
};
