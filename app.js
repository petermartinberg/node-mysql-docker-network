const express = require('express');
const mysql = require("mysql2");
const app = express();
require(`dotenv`).config();



const connection = mysql.createConnection({
    host: "mysql2",
    user: "root",
    password: process.env.MYSQL_ROOT_PASSWORD,
    database: process.env.MYSQL_DATABASE
});
connection.connect();
connection.query(`CREATE TABLE IF NOT EXISTS daten (
    id INT AUTO_INCREMENT PRIMARY KEY,
    logEintrag VARCHAR(255)
)`);
app.get("/add", (req, res) => {
    connection.query(`INSERT INTO daten (logEintrag) VALUES ("Eintrag am ${new Date()}")`);
    res.send("Neuer Eintrag in die Datenbank erfolgreich gespeichert");
});
app.get("/all", (req, res) => {
    connection.query("SELECT * FROM daten", (err, results) => {
        if (err) {
            return res.status(500).send(err);
        }
        res.json(results);
    });
});
const port = process.env.EXPRESS_PORT
app.listen(port, () => {
    console.log(`Server läuft auf Port ${port}`);
});