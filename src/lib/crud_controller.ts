import {SearchParamsParser} from "@/lib/params/search_params";
import {NextResponse} from "next/server";
import CrudRepository from "@/lib/crud_repository";

export type PathParams = {
    id: Number
}

export default class CrudController<E, T> {

    private readonly resourceName: string;
    private readonly repository: CrudRepository<E, T>;

    constructor(resourceName: string, repository: CrudRepository<E, T>) {
        this.resourceName = resourceName;
        this.repository = repository;
    }

    public async getAll(request: Request) {
        const searchParams = SearchParamsParser(request);

        const result = await this.repository.findAll(searchParams.ids, searchParams.range, searchParams.filter);

        return NextResponse.json(
            result.list,
            {
                status: 200,
                headers: {
                    'Access-Control-Expose-Headers': 'Content-Range',
                    'Content-Range': `${this.resourceName} ${searchParams.range?.start}-${searchParams.range?.end}/${result.total}`
                }
            });
    }

    public async getOne(request: Request, context: { params: PathParams }) {
        const id = Number(context.params.id);

        const element = await this.repository.findById(id);

        if (!element) {
            return NextResponse.json({error: 'Запис не знайдено'}, {status: 404});
        }

        return NextResponse.json(element, {status: 200});
    }
}