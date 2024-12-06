export type Loader = {
    key: string;
    startTime?: number;
    interval: number;
    extractTime: number;
    currTimeout?: number;
    isLoading: boolean;
    isLooped: boolean;
    isAutostart: boolean;
    cb: () => void;
};
