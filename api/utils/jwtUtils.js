const jwt = require('jsonwebtoken');

/**
 * Generates a JWT token with additional security options.
 * @param {Object} payload - Data to encode in the token.
 * @param {string} secret - Secret key for signing.
 * @param {Object} [options] - jwt.sign options (e.g., expiresIn, issuer, audience).
 * @returns {string} - JWT token.
 */
function generateToken(payload, secret, options = {}) {
    // Set default options for security
    const defaultOptions = {
        expiresIn: '1h',
        algorithm: 'HS512', // Stronger algorithm
        issuer: 'workbridge',
        audience: 'workbridge-users'
    };
    return jwt.sign(payload, secret, { ...defaultOptions, ...options });
}

/**
 * Verifies a JWT token with error handling and options.
 * @param {string} token - JWT token to verify.
 * @param {string} secret - Secret key for verification.
 * @param {Object} [options] - jwt.verify options (e.g., issuer, audience).
 * @returns {{valid: boolean, payload?: Object, error?: string}}
 */
function verifyToken(token, secret, options = {}) {
    const defaultOptions = {
        algorithms: ['HS512'],
        issuer: 'workbridge',
        audience: 'workbridge-users'
    };
    try {
        const payload = jwt.verify(token, secret, { ...defaultOptions, ...options });
        return { valid: true, payload };
    } catch (err) {
        return { valid: false, error: err.message };
    }
}

/**
 * Decodes a JWT token without verifying signature.
 * @param {string} token - JWT token to decode.
 * @returns {Object|null} - Decoded payload or null if invalid.
 */
function decodeToken(token) {
    return jwt.decode(token, { complete: true });
}

module.exports = { generateToken, verifyToken, decodeToken };