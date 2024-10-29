import {NextResponse} from 'next/server';
import {SearchParamsParser} from "@/lib/params/search_params";
import {SimpleSearchFilter} from "@/lib/params/simple_search_filter";
import modelRepository from "@/app/api/models/repository";

export async function GET(request: Request) {
    const searchParams = SearchParamsParser(request);
    const filter = searchParams.filter as SimpleSearchFilter;

    const models = await modelRepository.findAll(searchParams.ids, searchParams.range, filter);

    return NextResponse.json(models.list, {
        status: 200,
        headers: {
            'Access-Control-Expose-Headers': 'Content-Range',
            'Content-Range': `brands ${searchParams.range?.start}-${searchParams.range?.end}/${models.total}`
        }
    });
}
