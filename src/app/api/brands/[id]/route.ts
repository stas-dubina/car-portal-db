import {NextResponse} from 'next/server';
import brandRepository from "@/app/api/brands/repository";
import {connect} from "@/lib/db/connection";
import {crudController} from "../controller";
import {PathParams} from "@/lib/crud_controller";

export async function GET(request: Request, context: { params: PathParams }) {
    return crudController.getOne(request, context)
}

export async function DELETE(request: Request, context: { params: PathParams }) {
    return crudController.deleteOne(request, context)
}

export async function PUT(request: Request, context: { params: PathParams }) {
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

