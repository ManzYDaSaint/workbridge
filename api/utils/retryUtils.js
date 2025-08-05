/**
 * Retries a given async function on failure.
 * @param {Function} fn - The async function to retry.
 * @param {number} retries - Number of retry attempts.
 * @param {number} delay - Delay between retries in ms.
 * @returns {Promise<any>}
 */
async function retry(fn, retries = 3, delay = 500) {
    let lastError;
    for (let attempt = 1; attempt <= retries; attempt++) {
        try {
            return await fn();
        } catch (err) {
            lastError = err;
            if (attempt < retries) {
                await new Promise(res => setTimeout(res, delay));
            }
        }
    }
    throw lastError;
}

module.exports = { retry };