// will run whenever `next(err)` is called
function errorHandler(err, req, res, next) {

  console.error('ERROR', req.method, req.path, err);

  // Check if the response was already sent, as sending a response twice for the same request will cause an error.
  if (!res.headersSent) {
    res.status(500).json({ message: 'Internal server error. Check the server console' });
  }
}


// will run whenever the requested route is not found
function notFoundHandler(req, res, next) {

  res.status(404).json({ message: 'This route does not exist' });
}

module.exports = {
  errorHandler,
  notFoundHandler
};
