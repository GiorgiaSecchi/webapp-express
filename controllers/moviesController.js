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
      return res.status(500).json({
        status: "KO",
        message: "Database query failed",
      });
    }

    // const movies = results.map(movies => ({
    //   ...movies,
    //   image: generateMovieImagePath(movies.image)
    // }))

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
  const movieid = parseInt(req.params.id);

  const sqlMovie = `
  SELECT id, title, director, genre, release_year, abstract, image
  FROM movies
   WHERE id = ?
  `;

  connection.query(sqlMovie, [movieid], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: "KO",
        message: "Database query failed",
      });
    }

    const [movie] = results;

    if (!movie) return res.status(404).json({ error: "Movie not found" });

    // movie.image = generateMovieImagePath(movie.image)

    const sqlReviews = `
    SELECT id, name, vote, text, created_at
    FROM reviews
    WHERE movie_id = ?
    `;

    connection.query(sqlReviews, [movieid], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: "KO",
          message: "Database query failed",
        });
      }

      movie.reviews = results;

      res.json({
        status: "OK",
        movie,
      });
    });
  });
}

// const generateMovieImagePath = (imageName) => {
//    const { APP_HOST, APP_PORT } = process.env;
//   return `${APP_HOST}:${APP_PORT}/img/movies${imageName}`
// }

module.exports = { index, show };
