export function clamp(min: number, max: number, val: number) {
    return Math.min(max, Math.max(min, val));
}
