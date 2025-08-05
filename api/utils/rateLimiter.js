/**
 * Advanced in-memory rate limiter with automatic cleanup and custom error handling.
 * @param {string} key - Unique identifier for the client (e.g., IP or user ID).
 * @param {number} limit - Max number of allowed actions per window.
 * @param {number} windowMs - Time window in milliseconds.
 * @returns {{allowed: boolean, remaining: number, reset: number, error?: string}}
 */
const rateLimits = new Map();
const CLEANUP_INTERVAL = 10 * 60 * 1000; // 10 minutes

function rateLimiter(key, limit = 10, windowMs = 60000) {
    const now = Date.now();
    let entry = rateLimits.get(key);

    if (!entry || now - entry.start > windowMs) {
        entry = { count: 1, start: now };
        rateLimits.set(key, entry);
        return {
            allowed: true,
            remaining: limit - 1,
            reset: now + windowMs
        };
    }

    if (entry.count < limit) {
        entry.count += 1;
        return {
            allowed: true,
            remaining: limit - entry.count,
            reset: entry.start + windowMs
        };
    }

    return {
        allowed: false,
        remaining: 0,
        reset: entry.start + windowMs,
        error: 'Rate limit exceeded'
    };
}

// Periodic cleanup to remove expired entries and free memory
setInterval(() => {
    const now = Date.now();
    for (const [key, entry] of rateLimits.entries()) {
        if (now - entry.start > CLEANUP_INTERVAL) {
            rateLimits.delete(key);
        }
    }
}, CLEANUP_INTERVAL);

module.exports = { rateLimiter };