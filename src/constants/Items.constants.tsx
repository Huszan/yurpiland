import BigNumber from "bignumber.js";
import AlchemyIcon from "../resources/images/icons/alchemy-icon.png";
import CogIcon from "../resources/images/icons/settings-icon.png";

export type Item = {
    icon: string;
    count: BigNumber;
};

export type ItemCollection = {
    [key: string]: Item;
};

export const items: ItemCollection = {
    item_1: {
        icon: AlchemyIcon,
        count: BigNumber("12e12"),
    },
    item_2: {
        icon: CogIcon,
        count: BigNumber("233"),
    },
};
