//Custom error handler that responds with JSON data instead of default behavior of a HTML page.
//This error handler returns a specific error message. It uses the error message of the status codes other than 500. If the status code is 500, it returns a generic message.
const errorHandler = (err, req, res, next) => {
    console.error(err);

    const statusCode = err.status || 500;
    const message =
        statusCode === 500
        ? 'An unexpected server error occurred. Please try again later.'
        : err.message;

        res.status(statusCode).json({ msg: message })
};

export default errorHandler;