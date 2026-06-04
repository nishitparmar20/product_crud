const { MongoClient } = require("mongodb");

async function dbconnect() {
    try {
        const url = process.env.URL;
        const client = new MongoClient(url); // no useUnifiedTopology here
        await client.connect();
        console.log("✅ Connected to MongoDB successfully");

        const db = client.db(); // DB name from URI
        return db;
    } catch (err) {
        console.error("❌ MongoDB connection error:", err);
        throw err;
    }
}

module.exports = { dbconnect };