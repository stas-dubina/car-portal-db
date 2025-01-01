import {NextResponse} from 'next/server';
import {SearchParamsParser} from "@/lib/params/search_params";
import {getAll, getById, getCount, insert, updateFeatures} from "@/app/api/cars/db_repository";
import {CarSearchFilter} from "@/app/api/cars/car_search_filter";
import {CarSearchSorter} from "@/app/api/cars/car_search_sorter";
import {CarDriveType} from "@/lib/db/types";
import {verify} from "jsonwebtoken";
import {headers} from "next/headers";

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

export async function GET(request: Request) {
    const searchParams = SearchParamsParser(request);
    const filter = searchParams.filter as CarSearchFilter;
    const sort = searchParams.sort as CarSearchSorter;

    const totalCount = await getCount(searchParams.ids, filter);
    const models = await getAll(searchParams.ids, filter, sort, searchParams.range);

    return NextResponse.json(models, {
        status: 200,
        headers: {
            'Access-Control-Expose-Headers': 'Content-Range',
            'Content-Range': `brands ${searchParams.range?.start}-${searchParams.range?.end}/${totalCount}`
        }
    });
}

function getToken () {
    const headersList = headers();
    const auth = headersList.get('Authorization');
    const bearer = 'Bearer '
    //"Bearer tokentext"
    if (auth && auth.startsWith(bearer)) {
        const token = auth.substring(bearer.length)
        return token
    }
    return undefined;
}

export async function POST(request: Request) {
    const car: NewCarRequest = await request.json();
    const token = getToken()
    let tokenData = undefined;
    try {
        tokenData = verify(token, process.env.JWT_SECRET);
    } catch(err) {
        return NextResponse.json({}, {status: 403})
    }
    const newCarId = await insert({
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
        car_user_id: tokenData.userId,
        car_vin: car.vin,
        car_year: car.year
    })
    await updateFeatures(newCarId, car.featureIds)

    const result = await getById(newCarId)

    return NextResponse.json(result, {status: 200});
}
