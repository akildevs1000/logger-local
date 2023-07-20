import WebSocket from "ws";
import sql from "mssql/msnodesqlv8.js";

let dateTime = new Date();
let d = dateTime.getDate();
let m = dateTime.getMonth() + 1;
let y = dateTime.getFullYear();
let h = dateTime.getHours();
let mi = dateTime.getMinutes();
let s = dateTime.getSeconds();
let ms = dateTime.getMilliseconds().toString().substring(0, 2);
const addConZero = (arg) => (arg < 9 ? "0" + arg : arg);

var config = {
  server: "DESKTOP-F729IDL\\SQLEXPRESS01",
  database: "UNIS",
  user: "francis",
  password: "1@Ab56ab56",
  options: {
    trustedConnection: true,
  },
  driver: "msnodesqlv8",
};

let socket = new WebSocket("wss://sdk.ideahrms.com/WebSocket");

socket.onopen = () => console.log("Connected with cloud");
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
    sql.connect(config, (err) => {
      if (err) {
        conole.log(err);
        return false;
      }

      var request = new sql.Request();

      let C_Date = `${addConZero(d)}${addConZero(m)}${addConZero(y)}`;

      let C_Time = `${addConZero(h)}${addConZero(mi)}${addConZero(s)}`;

      let L_Mode = h < 15 ? 1 : 2;

      let query = `INSERT INTO tEnter (C_Date, C_Time, L_TID, L_UID, L_Mode) VALUES (${C_Date},${C_Time},1,${UserID},${L_Mode})`;

      request.query(query, (err, rec) => {
        if (err) {
          console.log(err);
        } else {
          console.log(rec);
        }
      });
    });
  }
};
