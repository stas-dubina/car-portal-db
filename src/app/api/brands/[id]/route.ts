import {NextResponse} from 'next/server';
import {connect} from "@/lib/db/connection";

type Params = {
    id: Number
}

async function getBrandById(id: number) {
    const db = await connect();
    return await db.selectFrom('brand')
        .select([
            'brand_id as id',
            'brand_name as name'
        ])
        .where('brand_id', '=', id)
        .executeTakeFirst();
}

export async function GET(request: Request, context: { params: Params }) {
    const id = context.params.id;

    const brand = await getBrandById(id);

    if (!brand) {
        return NextResponse.json({error: 'Бренд не найден'}, {status: 404});
    }

    return NextResponse.json(brand, {status: 200});

}

export async function PUT(request: Request, context: { params: Params }) {
    const updateBrand = await request.json();
    const id = context.params.id;

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

    const brand = await getBrandById(id);
    return NextResponse.json(brand, {status: 200});

}

