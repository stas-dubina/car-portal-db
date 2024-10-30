import {NextResponse} from 'next/server';
import {SearchParamsParser} from "@/lib/params/search_params";
import {getAll, getCount} from "@/app/api/fuel-types/db_repository";

export async function GET(request: Request) {
    const searchParams = SearchParamsParser(request);

    const totalCount = await getCount(searchParams.ids);
    const models = await getAll(searchParams.ids, searchParams.range);

    return NextResponse.json(models, {
        status: 200,
        headers: {
            'Access-Control-Expose-Headers': 'Content-Range',
            'Content-Range': `brands ${searchParams.range?.start}-${searchParams.range?.end}/${totalCount}`
        }
    });
}
