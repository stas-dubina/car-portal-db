import {NextResponse} from 'next/server';
import {RangeParser} from '@/lib/range';
import {getAll, getCount} from "@/app/api/brands/service";

export async function GET(request: Request) {
    const {searchParams} = request.nextUrl;
    const ids = searchParams.getAll('id');
    const rangeParam = searchParams.get('range');
    const range = RangeParser(rangeParam)

    const totalCount = await getCount(ids);
    const brands = await getAll(ids, range);

    return NextResponse.json(
        brands,
        {
            status: 200,
            headers: {
                'Access-Control-Expose-Headers': 'Content-Range',
                'Content-Range': `brands ${rangeParam}/${totalCount}`
            }
        });
}
