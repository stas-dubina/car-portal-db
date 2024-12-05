import {NextResponse} from 'next/server';
import {cancelCar, getById, soldCar} from "@/app/api/cars/db_repository";
import {PathParams} from "@/lib/crud_controller";
import {CarStatus} from "@/lib/db/types";

type ChangeStatusReq = {
    status: CarStatus
    price?: number
}

export async function GET(request: Request, context: { params: PathParams }) {
    const id = context.params.id;

    const car = await getById(Number(id));

    if (!car) {
        return NextResponse.json({error: 'Авто не найден'}, {status: 404});
    }

    return NextResponse.json(car, {status: 200});

}

export async function PUT(request: Request, context: { params: PathParams }) {
    const carId = Number(context.params.id);
    const updateStatus: ChangeStatusReq = await request.json()

    if (updateStatus.status == 'SOLD') {
       await soldCar(carId, updateStatus.price!)
    } else if (updateStatus.status == 'CANCELLED') {
        await cancelCar(carId)
    } else {
        return NextResponse.json({}, {status: 400});
    }

    const car = await getById(carId);

    return NextResponse.json(car, { status: 200 });
}