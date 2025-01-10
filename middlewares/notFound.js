function notFound(req, res, next) {
  res.status(404);
  res.json({
    status: "KO",
    message: "Page Not Found",
  });
}

module.exports = notFound;
