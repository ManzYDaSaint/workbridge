require('dotenv').config();

/**
 * Gets an environment variable with optional default and required flag.
 * @param {string} key - The environment variable name.
 * @param {Object} [options]
 * @param {boolean} [options.required=false] - Throw error if not set.
 * @param {any} [options.default] - Default value if not set.
 * @returns {string|any}
 */
function getEnv(key, options = {}) {
    const value = process.env[key];
    if (value !== undefined) return value;
    if (options.required) {
        throw new Error(`Environment variable "${key}" is required but not set.`);
    }
    return options.default;
}

/**
 * Loads multiple environment variables at once.
 * @param {Array<{key: string, required?: boolean, default?: any}>} vars
 * @returns {Object}
 */
function loadEnv(vars) { 
    const result = {};
    for (const v of vars) {
        result[v.key] = getEnv(v.key, { required: v.required, default: v.default });
    }
    return result;
}

module.exports = { getEnv, loadEnv };