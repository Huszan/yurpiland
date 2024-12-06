export type ResourceData = {
    amount: number;
    multiplier?: number;
    icon?: string;
};

export type ResourceCollection = {
    [key: string]: ResourceData;
};
