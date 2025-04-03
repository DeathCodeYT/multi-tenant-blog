export function validateUsername(username) {
    // Regex pattern: Minimum 5 characters, only letters, numbers, and underscores allowed
    const pattern = /^[a-zA-Z0-9_]{5,}$/;

    if (pattern.test(username)) {
        return true;
    } else {
        return false;
    }
}

export function validateEmail(email) {
    // Regex pattern: Standard email format
    const pattern = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;

    if (pattern.test(email)) {
        return true;
    } else {
        return false;
    }
}