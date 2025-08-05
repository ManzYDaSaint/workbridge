const crypto = require('crypto');
const { validateUserInput } = require('./validator');

/**
 * Checks password strength requirements.
 * @param {string} password
 * @returns {{valid: boolean, errors: string[]}}
 */

/**
 * Hashes a password using PBKDF2.
 * @param {string} password - The plain password.
 * @param {number} saltLength - Length of the salt in bytes.
 * @returns {{hash: string, salt: string}}
 */
function hashPassword(password, saltLength = 16) {
    const { valid, errors } = validateUserInput(password);
    if (!valid) {
        throw new Error('Password validation failed: ' + errors.join(' '));
    }
    const salt = crypto.randomBytes(saltLength).toString('hex');
    const hash = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    return { hash, salt };
}

/**
 * Verifies a password against a hash and salt.
 * @param {string} password - The plain password.
 * @param {string} hash - The stored hash.
 * @param {string} salt - The stored salt.
 * @returns {boolean}
 */
function verifyPassword(password, hash, salt) {
    const hashToVerify = crypto.pbkdf2Sync(password, salt, 100000, 64, 'sha512').toString('hex');
    // Use timingSafeEqual for comparison
    const hashBuffer = Buffer.from(hash, 'hex');
    const verifyBuffer = Buffer.from(hashToVerify, 'hex');
    if (hashBuffer.length !== verifyBuffer.length) return false;
    return crypto.timingSafeEqual(hashBuffer, verifyBuffer);
}

module.exports = { hashPassword, verifyPassword };