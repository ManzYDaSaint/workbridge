/**
 * Formats and logs errors, then sends a standardized response.
 * @param {Error} err - The error object.
 * @param {Object} req - Express request object.
 * @param {Object} res - Express response object.
 * @param {Function} next - Express next middleware.
 */
function errorHandler(err, req, res, next) {
    // Log error with request context
    console.error(`[${new Date().toISOString()}] ${req.method} ${req.originalUrl} - ${err.stack || err}`);

    // Example: send to external service
    // sendErrorToService({ err, req });

    const status = err.status || 500;
    let message = err.message || 'Internal Server Error';

    // Mask details in production
    if (process.env.NODE_ENV === 'production' && status === 500) {
        message = 'Something went wrong. Please try again later.';
    }

    res.status(status).json({
        success: false,
        error: {
            message,
            status,
            ...(process.env.NODE_ENV === 'development' && { stack: err.stack }),
            path: req.originalUrl,
            method: req.method
        }
    });
}

module.exports = errorHandler;