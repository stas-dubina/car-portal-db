
export type Range = {
    start: number;
    end: number;
};

export function RangeParser(rangeString: string | null): Range | undefined {
    if (!rangeString) {
        return undefined;
    }
    const match = rangeString.match(/^\[(\d+),(\d+)\]$/);
    if (!match){ 
        return undefined;
    }
    return {
        start: parseInt(match[1], 10),
        end: parseInt(match[2], 10)
    };
}
