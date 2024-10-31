import {NextResponse} from 'next/server';
import {SearchParamsParser} from "@/lib/params/search_params";
import bodyTypeRepository from "@/app/api/body-types/repository";

export async function GET(request: Request) {
    const searchParams = SearchParamsParser(request);

    const bodyTypes = await bodyTypeRepository.findAll(searchParams.ids, searchParams.range, searchParams.filter);

    return NextResponse.json(bodyTypes.list, {
        status: 200,
        headers: {
            'Access-Control-Expose-Headers': 'Content-Range',
            'Content-Range': `body-types ${searchParams.range?.start}-${searchParams.range?.end}/${bodyTypes.total}`
        }
    });
}
