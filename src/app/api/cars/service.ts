import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";

export async function getCount(ids: Array<number>) {
    const db = await connect();

    let query = db.selectFrom('car')
        .select(
            (eb) => eb.fn.count<number>('car_id').as('car_count')
        );

    if (ids.length > 0) {
        query = query.where('car_id', 'in', ids.map(Number));
    }
    const result = await query.executeTakeFirstOrThrow();
    return result.car_count;
}

export async function getAll(ids: Array<number>, range?: Range) {
    const db = await connect();
    let query = db.selectFrom('car')
        .select([
            'car_id as id',
            'car_model_id as modelId',
            'car_year as year',
            'car_fuel_type_id as fuelTypeId',
            'car_gear_type_id as gearTypeId',
            'car_mileage as mileage',
            'car_price as price',
            'car_user_id as userId',
            'car_status as status',
            'car_color_id as colorId',
            'car_created_at as createdAt',
            'car_vin as vin',
            'car_description as description',
            'car_body_type_id as bodyTypeId',
            'car_accident as accident',
            'car_abroad as abroad',
            'car_owner_number as ownerNumber',
            'car_in_credit as inCredit',
            'car_power as power',
            'car_seat as seat',
            'car_drive_type as driveType'
        ]);

    if (ids.length > 0) {
        query = query.where('car_id', 'in', ids.map(Number));
    }

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('car_id asc').execute();
}

export async function getById(id: number) {
    const db = await connect();
    return await db.selectFrom('car')
        .select([
            'car_id as id',
            'car_model_id as modelId',
            'car_year as year',
            'car_fuel_type_id as fuelTypeId',
            'car_gear_type_id as gearTypeId',
            'car_mileage as mileage',
            'car_price as price',
            'car_user_id as userId',
            'car_status as status',
            'car_color_id as colorId',
            'car_created_at as createdAt',
            'car_vin as vin',
            'car_description as description',
            'car_body_type_id as bodyTypeId',
            'car_accident as accident',
            'car_abroad as abroad',
            'car_owner_number as ownerNumber',
            'car_in_credit as inCredit',
            'car_power as power',
            'car_seat as seat',
            'car_drive_type as driveType'
        ])
        .where('car_id', '=', id)
        .executeTakeFirst();
}