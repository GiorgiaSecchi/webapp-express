//# COLLEGAMENTO DB BLOG
// Importiamo file di connessione al database
const connection = require("../db/connection");

// Lista nomi file cover film
imageFiles = [
  "inception.jpg",
  "interstellar.jpg",
  "the_matrix.jpg",
  "the_godfather.jpg",
  "titanic.jpg",
];

//# INDEX

/**
 * Funzione che mostra tutti i film
 * @param {*} req
 * @param {*} res
 */
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

    const movies = results.map((movie) => ({
      ...movie,
      image: generateMovieImagePath(generateMovieImageName(movie.title)),
    }));

    res.json({
      status: "OK",
      movies: movies,
    });

    // res.json(results);
    // console.log(results);
  });
}

//# SHOW

/**
 * Funzione che mostra il dettaglio di un film
 * @param {*} req
 * @param {*} res
 */
function show(req, res) {
  // recuperiamo l'id dall' URL
  const movieid = parseInt(req.params.id);

  const sqlMovie = `
  SELECT id, title, director, genre, release_year, abstract, image
  FROM movies
   WHERE id = ?
  `;

  //* Prima query: recupera i dettagli del film
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

    movie.image = generateMovieImagePath(generateMovieImageName(movie.title));

    const sqlReviews = `
    SELECT id, name, vote, text, created_at
    FROM reviews
    WHERE movie_id = ?
    `;

    //* Seconda query: recupera le recensioni del film
    connection.query(sqlReviews, [movieid], (err, results) => {
      if (err) {
        console.log(err);
        return res.status(500).json({
          status: "KO",
          message: "Database query failed",
        });
      }

      // Aggiunge le recensioni a movies
      movie.reviews = results;

      res.json({
        status: "OK",
        movie: movie,
      });
    });
  });
}

//# STORE

/**
 * Funzione che aggiugne una recensione ad un libro
 * @param {*} title
 * @returns
 */
function storeReview(req, res) {
  const movieId = parseInt(req.params.id);
  const { name, text, vote } = req.body;

  const sql = `
  INSERT INTO reviews (name, text, vote, movie_id)
  VALUES (?, ?, ?, ?)
  `;

  connection.query(sql, [name, text, vote, movieId], (err, results) => {
    if (err) {
      console.log(err);
      return res.status(500).json({
        status: "KO",
        message: "Database query failed",
      });
    }

    res.json({
      status: "OK",
      message: "Review added",
    });
  });
}

// funzione genera nome dell'immagine in base al titolo
const generateMovieImageName = (title) => {
  const matchedImage = imageFiles.find((file) =>
    file.toLowerCase().startsWith(title.toLowerCase().replace(" ", "_"))
  );
  return matchedImage || null;
};

// funzione genera percorso completo dell'immagine
const generateMovieImagePath = (imageName) => {
  const { APP_HOST, APP_PORT } = process.env;
  return imageName ? `${APP_HOST}:${APP_PORT}/img/movies/${imageName}` : null;
};

module.exports = { index, show, storeReview };
