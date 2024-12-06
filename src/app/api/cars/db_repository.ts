import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {CarSearchFilter} from "@/app/api/cars/car_search_filter";
import {Brand, CarDriveType, CarStatus, Database} from "@/lib/db/types";
import {Expression, expressionBuilder, Kysely, SqlBool} from "kysely";
import {CarSearchSorter} from "@/app/api/cars/car_search_sorter";

function selectFrom(db: Kysely<Database>) {
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

}

function selectCarView(db: Kysely<Database>) {
    return selectFrom(db)
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

export async function getCount(ids: Array<number>, filter: CarSearchFilter): Promise<number> {
    const db = await connect();

    let query = selectFrom(db)
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

    if (filter.userId) {
        query = query.where('car_user_id', '=', filter.userId)
    }

    if (filter.brandId) {
        query = query.where('brand_id', '=', filter.brandId)
    }

    if (filter.priceMin) {
        query = query.where('car_price', '>', filter.priceMin)
    }

    if (filter.priceMax) {
        query = query.where('car_price', '<', filter.priceMax)
    }

    if (filter.yearMin) {
        query = query.where('car_year', '>=', filter.yearMin)
    }

    if (filter.yearMax) {
        query = query.where('car_year', '<=', filter.yearMax)
    }

    if (filter.mileageMin) {
        query = query.where('car_mileage', '>=', filter.mileageMin)
    }

    if (filter.mileageMax) {
        query = query.where('car_mileage', '<=', filter.mileageMax)
    }

    const result = await query.executeTakeFirstOrThrow();
    return result.car_count;
}

export async function getAll(ids: Array<number>, filter: CarSearchFilter, sort: CarSearchSorter, range?: Range) {
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

    if (filter.userId) {
        query = query.where('car_user_id', '=', filter.userId)
    }

    if (filter.brandId) {
        query = query.where('brand_id', '=', filter.brandId)
    }

    if (filter.priceMin) {
        query = query.where('car_price', '>=', filter.priceMin)
    }

    if (filter.priceMax) {
        query = query.where('car_price', '<=', filter.priceMax)
    }

    if (filter.yearMin) {
        query = query.where('car_year', '>=', filter.yearMin)
    }

    if (filter.yearMax) {
        query = query.where('car_year', '<=', filter.yearMax)
    }

    if (filter.mileageMin) {
        query = query.where('car_mileage', '>=', filter.mileageMin)
    }

    if (filter.mileageMax) {
        query = query.where('car_mileage', '<=', filter.mileageMax)
    }

    if (sort.mileage) {
        query = query.orderBy('car_mileage', sort.mileage)
    }

    if (sort.year) {
        query = query.orderBy('car_year', sort.year)
    }

    if (sort.price) {
        query = query.orderBy('car_price', sort.price)
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

export async function updateCarStatus(id: number, carStatus: CarStatus) {
    const db = await connect();
    await db.updateTable('car')
        .set({
            car_status: carStatus
        })
        .where('car_id', '=', id)
        .where('car_status', '=', 'ON_SALE')
        .executeTakeFirstOrThrow()
}

export async function cancelCar(id: number) {
    const db = await connect();
    await updateCarStatus(id, 'CANCELLED')
}

export async function insertOrder(id: number, price: number) {
    const db = await connect();
    await db.insertInto('order')
        .values({
            order_car_id: id,
            order_price: price,
            order_created_at: new Date()
        })
        .returning(['order_id'])
        .executeTakeFirst()
}

export async function soldCar(id: number, price: number) {
    // VercelPostgresError - 'kysely_transactions_not_supported': Transactions are not supported yet.
    // await db.transaction().execute(async (trx) => {
    await updateCarStatus(id, 'SOLD')
    await insertOrder(id, price)
    // })
}

export default {
    getById,
    getCount,
    getAll,
    cancelCar,
    soldCar
}