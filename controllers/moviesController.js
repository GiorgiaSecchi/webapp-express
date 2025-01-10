//# COLLEGAMENTO DB BLOG
// Importiamo file di connessione al database
const connection = require("../db/connection");

//# INDEX

function index(req, res) {
  res.json({
    message: "OK",
  });
}

module.exports = { index };
