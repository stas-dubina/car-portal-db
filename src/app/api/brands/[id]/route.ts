import {NextResponse} from 'next/server';
import brandRepository from "@/app/api/brands/repository";
import {connect} from "@/lib/db/connection";

type Params = {
    id: Number
}

export async function GET(request: Request, context: { params: Params }) {
    const id = Number(context.params.id);

    const brand = await brandRepository.findById(id);

    if (!brand) {
        return NextResponse.json({error: 'Бренд не найден'}, {status: 404});
    }

    return NextResponse.json(brand, {status: 200});

}

export async function PUT(request: Request, context: { params: Params }) {
    const updateBrand = await request.json();
    const id = Number(context.params.id);

    const db = await connect();

    const result = await db.updateTable('brand')
        .set({
            brand_name: updateBrand.name
        })
        .where('brand_id', '=', id)
        .executeTakeFirst();


    if (result.numUpdatedRows === 0) {
        return NextResponse.json({error: 'Бренд не найден'}, {status: 404});
    }

    const brand = await brandRepository.findById(id);
    return NextResponse.json(brand, {status: 200});

}

