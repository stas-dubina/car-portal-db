import {NextResponse} from 'next/server';
import modelRepository from "@/app/api/models/repository";

type Params = {
    id: Number
}

export async function GET(request: Request, context: { params: Params }) {
    const id = Number(context.params.id);

    const model = await modelRepository.findById(id);

    if (!model) {
        return NextResponse.json({error: 'Модель не знайдено'}, {status: 404});
    }

    return NextResponse.json(model, {status: 200});

}

