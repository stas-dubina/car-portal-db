import {NextResponse} from 'next/server';
import {getById} from "@/app/api/models/service";

type Params = {
    id: Number
}

export async function GET(request: Request, context: { params: Params }) {
    const id = context.params.id;

    const model = await getById(Number(id));

    if (!model) {
        return NextResponse.json({error: 'Модель не знайдено'}, {status: 404});
    }

    return NextResponse.json(model, {status: 200});

}

