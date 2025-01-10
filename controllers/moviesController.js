//# COLLEGAMENTO DB BLOG
// Importiamo file di connessione al database
const connection = require("../db/connection");

//# INDEX

function index(req, res) {
  // prepariamo la query
  const sql = `
  SELECT id, title, director, genre, release_year, image
  FROM movies
  `;

  // eseguiamo la query
  connection.query(sql, (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    res.json({
      status: "OK",
      movies: results,
    });

    // res.json(results);
    // console.log(results);
  });
}

//# SHOW

function show(req, res) {
  // recuperiamo l'id dall' URL
  const id = parseInt(req.params.id);

  const sql = "SELECT * FROM movies WHERE id = ?";
  connection.query(sql, [id], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({ error: "Database query failed" });
    }

    if (results.length === 0)
      return res.status(404).json({ error: "Movies not found" });

    res.json(results[0]);
  });
}

module.exports = { index, show };
