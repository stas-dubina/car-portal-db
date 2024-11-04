import {NextResponse} from 'next/server';
import {getById} from "@/app/api/cars/db_repository";

type Params = {
    id: Number
}

export async function GET(request: Request, context: { params: Params }) {
    const id = context.params.id;

    const car = await getById(Number(id));

    if (!car) {
        return NextResponse.json({error: 'Авто не найден'}, {status: 404});
    }

    return NextResponse.json(car, {status: 200});

}

