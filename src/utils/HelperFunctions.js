export function firstLetterToUpperCase(str) {
    if (str.length === 0) return '';
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}