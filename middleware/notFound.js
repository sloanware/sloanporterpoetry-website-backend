//Custom catch all error handler that responds with JSON data instead of default behavior of a HTML page.
//This catch all is for any API request that does not exist.
const notFound = (req, res, next) => {
    const error = new Error('Not Found');
    error.status = 404;
    next(error);
};

export default notFound;