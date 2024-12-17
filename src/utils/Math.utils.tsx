import BigNumber from "bignumber.js";

export function clamp(min: number, max: number, val: number) {
    return Math.min(max, Math.max(min, val));
}

export function hasDecimal(num: number) {
    return num % 1 !== 0;
}

const predefinedSuffixes = ["", "K", "M", "B", "T", "P", "E", "Z", "Y"];

const calculateBigNumberDetails = (num: BigNumber | number | string) => {
    const bigNum = new BigNumber(num);

    if (!bigNum.isFinite()) {
        throw new Error("Invalid number: not finite");
    }

    if (bigNum.isLessThan(1000)) {
        return {
            scaled: bigNum,
            suffix: "",
        };
    }

    const tier = Math.floor((bigNum.e ?? 0) / 3);

    const suffix =
        tier < predefinedSuffixes.length
            ? predefinedSuffixes[tier]
            : `e${tier - predefinedSuffixes.length + 1}`;

    const scale = new BigNumber(10).pow(tier * 3);
    const scaled = bigNum.dividedBy(scale);

    return {
        scaled,
        suffix,
    };
};

export const formatBigNumber = (
    num: BigNumber | number | string,
    decimals = 1
): string => {
    const { scaled, suffix } = calculateBigNumberDetails(num);
    if (!hasDecimal(scaled.toNumber())) {
        return scaled.toFixed(0) + suffix;
    }
    return scaled.toFixed(decimals) + suffix;
};

export const formatBigNumberSeparately = (
    num: BigNumber | number | string
): { scaled: BigNumber; suffix: string } => {
    const { scaled, suffix } = calculateBigNumberDetails(num);
    return {
        scaled,
        suffix,
    };
};
