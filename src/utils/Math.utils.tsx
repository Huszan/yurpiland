import BigNumber from "bignumber.js";

export function clamp(min: number, max: number, val: number) {
    return Math.min(max, Math.max(min, val));
}

export const formatBigNumber = (
    num: BigNumber | string,
    decimals = 1
): string => {
    const predefinedSuffixes = ["", "K", "M", "B", "T", "P", "E", "Z", "Y"];
    const bigNum = new BigNumber(num);

    // Ensure the number is finite
    if (!bigNum.isFinite()) {
        throw new Error("Invalid number: not finite");
    }

    // Handle numbers less than 1,000 directly
    if (bigNum.isLessThan(1000)) {
        return bigNum.toFixed(0);
    }

    // Safely calculate the tier
    const tier = Math.floor((bigNum.e ?? 0) / 3);

    // Determine the suffix
    let suffix: string;
    if (tier < predefinedSuffixes.length) {
        suffix = predefinedSuffixes[tier];
    } else {
        // Generate custom suffixes for larger tiers
        suffix = `e${tier - predefinedSuffixes.length + 1}`;
    }

    // Scale the number down
    const scale = new BigNumber(10).pow(tier * 3);
    const scaled = bigNum.dividedBy(scale);

    // Format the number with the suffix
    return scaled.toFixed(decimals) + suffix;
};
