export const isRequired = (value) => {
    return value !== null && value !== undefined && value.trim() !== '';
};

export const isEmail = (value) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(value);
};

export const isAllowedEmailDomain = (value, allowedDomains = ['example.com']) => {
    const domain = value.split('@')[1];
    return allowedDomains.includes(domain);
};

export const isStrongPassword = (value) => {
    const passwordRegex = /^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
    return passwordRegex.test(value);
};

export const isPasswordBlacklisted = (value, blacklist = ['password', '12345678', 'qwerty']) => {
    return !blacklist.includes(value.toLowerCase());
};

export const isValidDate = (value) => {
    return !isNaN(Date.parse(value));
};

export const isNotFutureDate = (value) => {
    const date = new Date(value);
    return date <= new Date();
};

export const isInRange = (value, min, max) => {
    return value >= min && value <= max;
};

export const isValidUsername = (value) => {
    const usernameRegex = /^[a-zA-Z0-9_]{3,20}$/;
    return usernameRegex.test(value);
};

export const doesAgeMatchBirthdate = (age, birthdate) => {
    const birth = new Date(birthdate);
    const today = new Date();
    let calculatedAge = today.getFullYear() - birth.getFullYear();
    const m = today.getMonth() - birth.getMonth();
    if (m < 0 || (m === 0 && today.getDate() < birth.getDate())) {
        calculatedAge--;
    }
    return age === calculatedAge;
};

export const validateUserInput = (data) => {
    const errors = {};

    if (!isRequired(data.username)) {
        errors.username = 'Username is required';
    } else if (!isValidUsername(data.username)) {
        errors.username = 'Username must be 3-20 characters, letters, numbers, or underscores only';
    }

    if (!isEmail(data.email)) {
        errors.email = 'Email is invalid';
    } else if (!isAllowedEmailDomain(data.email, ['example.com', 'workbridge.com'])) {
        errors.email = 'Email domain is not allowed';
    }

    if (!isStrongPassword(data.password)) {
        errors.password = 'Password must be at least 8 characters long, include an uppercase letter, a number, and a special character';
    } else if (!isPasswordBlacklisted(data.password)) {
        errors.password = 'Password is too common or insecure';
    }

    if (!isValidDate(data.birthdate)) {
        errors.birthdate = 'Birthdate is invalid';
    } else if (!isNotFutureDate(data.birthdate)) {
        errors.birthdate = 'Birthdate cannot be in the future';
    }

    if (!isInRange(data.age, 18, 100)) {
        errors.age = 'Age must be between 18 and 100';
    } else if (!doesAgeMatchBirthdate(data.age, data.birthdate)) {
        errors.age = 'Age does not match birthdate';
    }

    return {
        isValid: Object.keys(errors).length === 0,
        errors
    };
};