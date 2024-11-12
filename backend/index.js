const express = require("express");
const dbConnection = require("./config/db");
const routes = require("./routes/companies");
const routes1 = require("./routes/items");
const cors = require("cors");
const bodyParser = require("body-parser");

const app = express();
app.use(cors({ origin: true, credentials: true }));  //security enhancement

//DB connection
dbConnection();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.get("/", (req, res) => res.send("Hello Server is Running .."));
app.use("/api/companies", routes);

app.get("/", (req, res) => res.send("Hello Server is Running .."));
app.use("/api/items", routes1);

const PORT = 3000;

app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

