import {Range} from "@/lib/range";
import {SimpleSearchFilter} from "@/lib/params/simple_search_filter";

export type ListResult<T> = {
    total: number;
    list: Array<T>;
}

export interface Repository<T> {
    findAll(ids: Array<number>, range?: Range, filter?: SimpleSearchFilter): Promise<ListResult<T>>;
    findById(id: number): Promise<T | undefined>;
}

