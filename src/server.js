import sql from "mssql/msnodesqlv8.js";

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

sql.connect(config, function (err) {
    if (err) {
      conole.log(err);
      return false;
    }
  
  
    // make a request as
  
    var request = new sql.Request();
  
    var query =
      "INSERT INTO tEnter (C_Date, C_Time, L_TID, L_UID, L_Mode) VALUES (28022023,192860,1,133,1)";
  
    request.query(query, (err, rec) => {
      if (err) {
        console.log(err);
      } else {
        console.log(rec);
        //  your out put as records
      }
    });
  });
  