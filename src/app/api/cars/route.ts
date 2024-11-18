import {NextResponse} from 'next/server';
import {SearchParamsParser} from "@/lib/params/search_params";
import {getAll, getCount} from "@/app/api/cars/db_repository";
import {CarSearchFilter} from "@/app/api/cars/car_search_filter";

export async function GET(request: Request) {
    const searchParams = SearchParamsParser(request);
    const filter = searchParams.filter as CarSearchFilter;

    const totalCount = await getCount(searchParams.ids, filter);
    const models = await getAll(searchParams.ids, filter, searchParams.range);

    return NextResponse.json(models, {
        status: 200,
        headers: {
            'Access-Control-Expose-Headers': 'Content-Range',
            'Content-Range': `brands ${searchParams.range?.start}-${searchParams.range?.end}/${totalCount}`
        }
    });
}

export async function POST(request: Request) {
    const car = await request.json()
}