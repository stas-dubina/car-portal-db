import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {Model, OrderView} from "@/lib/db/types";

export async function getCount(ids: Array<number>, filter?: Partial<Model>): Promise<number> {
    const db = await connect();

    let query = db.selectFrom('order')
        .innerJoin('car as c', 'car_id', 'order_car_id')
        .innerJoin('model as m', 'm.model_id', 'c.car_model_id')
        .innerJoin('brand as b', 'b.brand_id', 'm.model_brand_id')
        .innerJoin('user as u', 'u.user_id', 'c.car_user_id')
        .select(
            (eb) => eb.fn.count<number>('order_id').as('order_count')
        )

    const result = await query.executeTakeFirstOrThrow();
    return result.order_count;
}

export async function getAll(ids: Array<number>, range?: Range, filter?: Partial<OrderView>): Promise<OrderView[]> {
    const db = await connect();
    let query = db.selectFrom('order')
        .innerJoin('car as c', 'car_id', 'order_car_id')
        .innerJoin('model as m', 'm.model_id', 'c.car_model_id')
        .innerJoin('brand as b', 'b.brand_id', 'm.model_brand_id')
        .innerJoin('user as u', 'u.user_id', 'c.car_user_id')
        .innerJoin('city', 'city.city_id', 'u.user_city_id')
        .select([
            'order_id',
            'order_car_id',
            'order_price',
            'order_created_at',
            'brand_name',
            'model_name',
            'car_year',
            'car_mileage',
            'car_price',
            'user_id',
            'user_first_name',
            'user_last_name',
            'user_phone',
            'city_id',
            'city_name'
        ])


    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('order_id asc').execute();
}

export default {
    getCount,
    getAll,
}