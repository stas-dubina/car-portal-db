import {NextResponse} from 'next/server';
import {getById, update, updateFeatures} from "@/app/api/cars/db_repository";
import {CarDriveType} from "@/lib/db/types";
import {PathParams} from "@/lib/crud_controller";

type Params = {
    id: Number
}

type NewCarRequest = {
    brandId: number,
    modelId: number,
    year: number,
    fuelTypeId: number,
    gearTypeId: number,
    mileage: number,
    price: number,
    colorId: number,
    vin: string,
    carTypeId: number,
    bodyTypeId: number,
    accident: boolean,
    abroad: boolean,
    inCredit: boolean,
    ownerNumber: number,
    power: number,
    seat: number,
    driveType: CarDriveType,
    description: string,
    featureIds: number[]
}

export async function GET(request: Request, context: { params: Params }) {
    const id = context.params.id;

    const car = await getById(Number(id));

    if (!car) {
        return NextResponse.json({error: 'Авто не найден'}, {status: 404});
    }

    return NextResponse.json(car, {status: 200});

}

export async function PUT(request: Request, context: { params: PathParams }) {
    const id = Number(context.params.id);
    const car: NewCarRequest = await request.json();

    const updated = await update({
        car_id: id,
        car_abroad: car.abroad,
        car_accident: car.accident,
        car_body_type_id: car.bodyTypeId,
        car_color_id: car.colorId,
        car_created_at: new Date(),
        car_drive_type: car.driveType,
        car_fuel_type_id: car.fuelTypeId,
        car_gear_type_id: car.gearTypeId,
        car_in_credit: car.inCredit,
        car_mileage: car.mileage,
        car_model_id: car.modelId,
        car_owner_number: car.ownerNumber,
        car_power: car.power,
        car_price: car.price,
        car_seat: car.seat,
        car_status: 'ON_SALE',
        car_vin: car.vin,
        car_year: car.year
    })

    if (!updated) {
        return NextResponse.json({error: 'Запис не знайдено'}, {status: 404});
    }

    await updateFeatures(id, car.featureIds)

    // get updated
    const result = await getById(id)

    return NextResponse.json(result, {status: 200});
}