function errorsHandler(err, req, res, next) {
  res.status(err.status ?? 500);
  res.json({
    status: "KO",
    message: err.message,
  });
}
module.exports = errorsHandler;
