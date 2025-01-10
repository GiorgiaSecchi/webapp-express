//# COLLEGAMENTO DB BLOG
// Importiamo file di connessione al database
const connection = require("../db/connection");

//# INDEX

function index(req, res) {
  // prepariamo la query
  const sql = "SELECT * FROM movies";

  // eseguiamo la query
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    res.json(results);
    console.log(results);
  });
}

module.exports = { index };
