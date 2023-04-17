// This function is an error handling middleware that sets the HTTP response status
// code to 404 and passes an error object to the next error handling middleware in the stack.
// It handles cases where a user requests a page that does not exist on the server.
function notFound(req, res, next) {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
}

// This middleware function is responsible for handling errors that occur during the processing of a request.
// It takes in four parameters: err, req, res, and next.
// If the original response had a status code of 200, it is replaced with 500, which indicates an internal server error.
// The function then sends a JSON response with the error message and stack trace (if not in production environment).
// This function is useful in situations where the previous middleware or route handler did not properly handle the error
// and allowed the request to continue to this error handler.
function errorHandler(err, req, res, next) {
  const statusCode = res.statusCode === 200 ? 500 : res.statusCode;
  res.status(statusCode)
  res.json({
    message: err.message,
    stack: process.env.NODE_ENV === 'production' ? null : err.stack,
  });
}

export { notFound, errorHandler };
