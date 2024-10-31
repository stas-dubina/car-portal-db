import {NextResponse} from 'next/server';
import {SearchParamsParser} from "@/lib/params/search_params";
import brandRepository, {BrandDto} from "@/app/api/brands/repository";

export async function GET(request: Request) {
    const searchParams = SearchParamsParser(request);
    const filter = searchParams.filter as Partial<BrandDto>;

    const brands = await brandRepository.findAll(searchParams.ids, searchParams.range, filter);

    return NextResponse.json(
        brands.list,
        {
            status: 200,
            headers: {
                'Access-Control-Expose-Headers': 'Content-Range',
                'Content-Range': `brands ${searchParams.range?.start}-${searchParams.range?.end}/${brands.total}`
            }
        });
}
