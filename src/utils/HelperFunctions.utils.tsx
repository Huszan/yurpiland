import { AbbreviateArray, HslArray } from "../types/Math.types";

export function firstLetterToUpperCase(str: string) {
    if (!str || str.length === 0) return "";
    return `${str[0].toUpperCase()}${str.slice(1)}`;
}

export function clamp(num: number, min: number, max: number) {
    return Math.min(Math.max(num, min), max);
}

export function colorTransition(
    percent: number,
    hsl1: HslArray,
    hsl2: HslArray
) {
    const offsetHue = -((hsl1[0] - hsl2[0]) / 100) * percent;
    const offsetSat = -((hsl1[1] - hsl2[1]) / 100) * percent;
    const offsetLig = -((hsl1[2] - hsl2[2]) / 100) * percent;
    const color = [
        hsl1[0] + offsetHue,
        hsl1[1] + offsetSat,
        hsl1[2] + offsetLig,
    ];
    return `hsl(${color[0]},${color[1]}%,${color[2]}%)`;
}

export function basicColorTransition(percent: number) {
    return colorTransition(percent, [0, 100, 50], [120, 100, 50]);
}

export function formatTime(ms: number) {
    const s = ms / 1000;
    const m = s / 60;
    const h = m / 60;
    return `
        ${h >= 1 ? Math.floor(h % 60) + "h" : ""} 
        ${m >= 1 ? Math.floor(m % 60) + "m" : ""} 
        ${Math.floor(s % 60) + "s"}`;
}

export function abbreviateNumber(value: number): AbbreviateArray {
    if (value < 1000) return [value, null];
    const abr = Intl.NumberFormat("en-US", {
        notation: "compact",
        maximumFractionDigits: 1,
    }).format(value);

    return [
        Number(
            abr
                .slice(0, abr.length - 1)
                .split(",")
                .join("")
        ),
        abr.slice(abr.length - 1, abr.length),
    ];
}
