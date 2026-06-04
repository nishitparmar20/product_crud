const express = require("express");
const cors = require("cors");
const router = require("./Router/router");
require("dotenv").config();
const app = express();
const dns = require("dns");
dns.setServers(["1.1.1.1","8.8.8.8"]);

app.use(express.json());
app.use("/uploads",express.static("uploads"));
app.use(cors());    
app.use("/api",router);

const PORT = process.env.PORT || 8000;

app.listen(PORT,()=>{
    console.log(`server is running on ${PORT}`);
})