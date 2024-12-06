import {Range, RangeParser} from '@/lib/range'

export type SearchParams = {
    ids: number[];
    range?: Range;
    filter?: any;
    sort?: any;
}

export function SearchParamsParser(request: Request): SearchParams {
    // @ts-ignore
    const {searchParams} = request.nextUrl;
    const ids = searchParams.getAll('id');
    const rangeParam = searchParams.get('range');
    const range = RangeParser(rangeParam);
    const filterParam = searchParams.get('filter');
    let filter = null;
    if (filterParam) {
        filter = JSON.parse(filterParam);
    }
    const sortParam = searchParams.get('sort');
    let sort = {};
    if (sortParam) {
        const sortParamArray: Array<string> = JSON.parse(sortParam);
        if (sortParamArray.length > 0) {
            sort = {
                [sortParamArray[0]]: sortParamArray[1].toLowerCase()
            }
        }
    }
    return {ids, range, filter, sort};
}