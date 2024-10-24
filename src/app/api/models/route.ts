import {NextResponse} from 'next/server';
import {SearchParamsParser} from "@/lib/params/search_params";
import {getAll, getCount} from "@/app/api/models/service";
import {SimpleSearchFilter} from "@/lib/params/simple_search_filter";

export async function GET(request: Request) {
    const searchParams = SearchParamsParser(request);
    const filter = searchParams.filter as SimpleSearchFilter;

    const totalCount = await getCount(searchParams.ids, filter?.name);
    const models = await getAll(searchParams.ids, searchParams.range, filter?.name);

    return NextResponse.json(models, {
        status: 200,
        headers: {
            'Access-Control-Expose-Headers': 'Content-Range',
            'Content-Range': `brands ${searchParams.range?.start}-${searchParams.range?.end}/${totalCount}`
        }
    });
}
