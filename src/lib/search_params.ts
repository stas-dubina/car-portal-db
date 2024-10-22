import {Range, RangeParser} from '@/lib/range'

export type SearchParams = {
    ids: number[];
    range?: Range;
}

export function SearchParamsParser(request: Request): SearchParams {
    const {searchParams} = request.nextUrl;
    const ids = searchParams.getAll('id');
    const rangeParam = searchParams.get('range');
    const range = RangeParser(rangeParam)

    return {ids, range};
}