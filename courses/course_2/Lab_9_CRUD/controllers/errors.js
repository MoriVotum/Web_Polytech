async function errorsController(err, req, res, next) {
  res.send(500, err.message);
}

export { errorsController };
