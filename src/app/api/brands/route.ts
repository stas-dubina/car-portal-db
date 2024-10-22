import {NextResponse} from 'next/server';
import {getAll, getCount} from "@/app/api/brands/service";
import {SearchParamsParser} from "@/lib/search_params";

export async function GET(request: Request) {
    const searchParams = SearchParamsParser(request);

    const totalCount = await getCount(searchParams.ids);
    const brands = await getAll(searchParams.ids, searchParams.range);

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
