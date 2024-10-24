import {Range, RangeParser} from '@/lib/range'

export type SearchParams = {
    ids: number[];
    range?: Range;
    filter?: any;
}

export function SearchParamsParser(request: Request): SearchParams {
    const {searchParams} = request.nextUrl;
    const ids = searchParams.getAll('id');
    const rangeParam = searchParams.get('range');
    const range = RangeParser(rangeParam);
    const filterParam = searchParams.get('filter');
    let filter = null;
    if (filterParam) {
        filter = JSON.parse(filterParam);
    }
    return {ids, range, filter};
}