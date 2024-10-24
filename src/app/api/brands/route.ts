import {NextResponse} from 'next/server';
import {getAll, getCount} from "@/app/api/brands/service";
import {SearchParamsParser} from "@/lib/params/search_params";
import {SimpleSearchFilter} from "@/lib/params/simple_search_filter";

export async function GET(request: Request) {
    const searchParams = SearchParamsParser(request);
    const filter = searchParams.filter as SimpleSearchFilter;

    const totalCount = await getCount(searchParams.ids, filter?.name);
    const brands = await getAll(searchParams.ids, searchParams.range, filter?.name);

    return NextResponse.json(
        brands,
        {
            status: 200,
            headers: {
                'Access-Control-Expose-Headers': 'Content-Range',
                'Content-Range': `brands ${searchParams.range?.start}-${searchParams.range?.end}/${totalCount}`
            }
        });
}
