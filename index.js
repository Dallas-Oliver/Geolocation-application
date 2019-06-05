const express = require("express");
const app = express();
const Datastore = require("nedb");
app.listen(3000, () => console.log("listening at port 3000"));
app.use(express.static("public"));
app.use(express.json({ limit: "1mb" }));

const db = new Datastore({ filename: "./datastore/db.txt" });

app.post("/api", (req, res) => {
  db.insert(req.body);
  db.loadDatabase();
  console.log(req.body);
  res.json({
    status: "Success",
    latitude: req.body.lat,
    longitude: req.body.lon,
    name: req.body.name,
    timestamp: new Date()
  });
});
