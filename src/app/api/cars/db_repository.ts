import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {CarSearchFilter} from "@/app/api/cars/car_search_filter";
import {CarDriveType, CarStatus, Database} from "@/lib/db/types";
import {expressionBuilder, Kysely} from "kysely";

export async function getCount(ids: Array<number>, filter: CarSearchFilter): Promise<number> {
    const db = await connect();

    let query = db.selectFrom('car')
        .select(
            (eb) => eb.fn.count<number>('car_id').as('car_count')
        );

    if (ids.length > 0) {
        query = query.where('car_id', 'in', ids.map(Number));
    }

    if (filter.accident != undefined) {
        query = query.where('car_accident', '=', filter.accident)
    }

    if (filter.driveType) {
        query = query.where('car_drive_type', '=', filter.driveType as CarDriveType)
    }

    if (filter.inCredit != undefined) {
        query = query.where('car_in_credit', '=', filter.inCredit)
    }

    if (filter.abroad != undefined) {
        query = query.where('car_abroad', '=', filter.abroad)
    }

    if (filter.status) {
        query = query.where('car_status', '=', filter.status as CarStatus)
    }

    const result = await query.executeTakeFirstOrThrow();
    return result.car_count;
}

function selectCarView(db: Kysely<Database>) {
    return db.selectFrom('car as c')
        .innerJoin('body_type as bt', 'bt.body_type_id', 'c.car_body_type_id')
        .innerJoin('car_type as ct', 'ct.car_type_id', 'bt.body_car_type_id')
        .innerJoin('color as co', 'co.color_id', 'c.car_color_id')
        .innerJoin('fuel_type as ft', 'ft.fuel_type_id', 'c.car_fuel_type_id')
        .innerJoin('gear_type as gt', 'gt.gear_type_id', 'c.car_gear_type_id')
        .innerJoin('model as m', 'm.model_id', 'c.car_model_id')
        .innerJoin('brand as b', 'b.brand_id', 'm.model_brand_id')
        .innerJoin('user as u', 'u.user_id', 'c.car_user_id')
        .leftJoin(
            eb =>
                eb.selectFrom('image')
                    .select(ebTopImage => [
                        'image_car_id',
                        ebTopImage.fn.min('image_id').as('image_id')
                    ])
                    .groupBy('image_car_id')
                    .as('top_image'),
            join =>
                join.onRef('top_image.image_car_id', '=', 'c.car_id')
        )
        .leftJoin('image as i', 'i.image_id', 'top_image.image_id')
        .innerJoin('city', 'city.city_id', 'u.user_city_id')
        .select([
            'c.car_id as id',
            'b.brand_id as brandId',
            'b.brand_name as brandName',
            'm.model_id as modelId',
            'm.model_name as modelName',
            'c.car_year as year',
            'ft.fuel_type_id as fuelTypeId',
            'ft.fuel_type_name as fuelTypeName',
            'gt.gear_type_id as gearTypeId',
            'gt.gear_type_name as gearTypeName',
            'c.car_mileage as mileage',
            'c.car_price as price',
            'u.user_id as userId',
            'u.user_first_name as firstName',
            'u.user_last_name as lastName',
            'u.user_phone as phone',
            'u.user_email as email',
            'c.car_status as status',
            'co.color_id as colorId',
            'co.color_name as colorName',
            'co.color_value as colorValue',
            'c.car_created_at as createdAt',
            'c.car_vin as vin',
            'c.car_description as description',
            'bt.body_type_id as bodyTypeId',
            'bt.body_type_name as bodyTypeName',
            'ct.car_type_id as carTypeId',
            'ct.car_type_name as carTypeName',
            'c.car_accident as accident',
            'c.car_abroad as abroad',
            'c.car_owner_number as ownerNumber',
            'c.car_in_credit as inCredit',
            'c.car_power as power',
            'c.car_seat as seat',
            'c.car_drive_type as driveType',
            'i.image_id as imageId',
            'i.image_file as imageFile',
            'city.city_id as cityId',
            'city.city_name as cityName'
        ]);
}

export async function getAll(ids: Array<number>, filter: CarSearchFilter, range?: Range) {
    const db = await connect();
    /*
    select * from car left join
    (select image_car_id, min(image_id) as image_id from image group by image_car_id) as top_image on top_image.image_car_id = car_id
    left join image i on i.image_id = top_image.image_id
     */
    let query = selectCarView(db)

    if (ids.length > 0) {
        query = query.where('car_id', 'in', ids.map(Number));
    }

    if (filter.accident != undefined) {
        query = query.where('car_accident', '=', filter.accident)
    }

    if (filter.driveType) {
        query = query.where('car_drive_type', '=', filter.driveType as CarDriveType)
    }

    if (filter.inCredit != undefined) {
        query = query.where('car_in_credit', '=', filter.inCredit)
    }

    if (filter.abroad != undefined) {
        query = query.where('car_abroad', '=', filter.abroad)
    }

    if (filter.status) {
        query = query.where('car_status', '=', filter.status as CarStatus)
    }

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('car_id asc').execute();
}

export async function getById(id: number) {
    const db = await connect();
    return await selectCarView(db)
        .where('car_id', '=', id)
        .executeTakeFirst();
}

export default {
    getById,
    getCount,
    getAll
}