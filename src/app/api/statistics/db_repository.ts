import {connect} from "@/lib/db/connection";

export async function getOnSaleStatistic() {
    /*
    select COUNT(car_id) SUM(car_price) from car c
    where c.car_status = 'ON_SALE'
    */
    const db = await connect();
    return db.selectFrom('car')
        .select(builder => [
            builder.fn.count<number>('car_id').as('car_count'),
            builder.fn.sum<number>('car_price').as('car_price_sum'),
            builder.fn.avg<number>('car_price').as('car_price_avg'),
        ])
        .where('car_status', '=', 'ON_SALE')
        .executeTakeFirst()
}

export async function getSalesByDate(from: Date, to: Date) {
    /*
    select COUNT(order_id), SUM(order_price) from "order"
    where order_created_at between '2024-10-01' and '2024-10-31'
    */
    const db = await connect();
    return db.selectFrom('order')
        .select(builder => [
            builder.fn.count<number>('order_id').as('order_count'),
            builder.fn.sum<number>('order_price').as('order_price_sum'),
            builder.fn.avg<number>('order_price').as('order_price_avg'),
        ])
        .where(builder => builder.between('order_created_at', from, to))
        .executeTakeFirst()
}

export async function getSalesAndDiscountByBrand() {
    /*
    select brand_name, COUNT(car_id), COALESCE(SUM(car_price),0) as price_on_sale, COALESCE(SUM(order_price),0) as price_sold, COALESCE(SUM(car_price),0) - COALESCE(SUM(order_price),0) as discount
    from brand
    inner join model on model_brand_id = brand_id
    left join car on car_model_id = model_id and car_status = 'SOLD'
    left join "order" on order_car_id = car_id
    group by brand_name
     */
    const db = await connect();
    return db.selectFrom('brand')
        .innerJoin('model', 'model_brand_id', 'brand_id')
        .leftJoin('car',
            (join) => join
                .onRef('car_model_id', '=', 'model_id')
                .on('car_status', '=', 'SOLD')
        )
        .leftJoin('order', 'order_car_id', 'car_id')
        .select(builder => [
            'brand_id as id',
            'brand_name',
            builder.fn.count<number>('car_id').as('car_count'),
            builder.fn.coalesce(builder.fn.avg<number>('car_price'), builder.val(0)).as('price_on_sale'),
            builder.fn.coalesce(builder.fn.avg<number>('order_price'), builder.val(0)).as('price_sold'),
            builder.eb(
                builder.fn.coalesce(builder.fn.avg<number>('car_price'), builder.val(0)),
                '-',
                builder.fn.coalesce(builder.fn.avg<number>('order_price'), builder.val(0))
            ).as('discount')
        ])
        .groupBy(['brand_id', 'brand_name'])
        .orderBy('brand_id')
        .execute()
}

export async function getMileageGroup() {
    /*
    select car_year,
        case
            when car_mileage < 50000 then '< 50 000'
            when car_mileage >= 50000 and car_mileage < 100000 then '< 100 000'
            when car_mileage >= 100000 and car_mileage < 200000 then '< 200 000'
            when car_mileage >= 200000 and car_mileage < 300000 then '< 300 000'
            else '> 300 000'
        end as mileage_group,
        count(car_id)
    from car
    group by car_year, mileage_group
    order by car_year
     */

    const db = await connect();
    return db.selectFrom('car')
        .select(builder => [
            'car_year as id',
            builder.case()
                .when('car_mileage', '<', 50000).then('< 50 000')
                .when(builder.and(
                    [
                        builder.eb('car_mileage', '>=', 50000),
                        builder.eb('car_mileage', '<', 100000)
                    ])).then('< 100 000')
                .when(builder.and(
                    [
                        builder.eb('car_mileage', '>=', 100000),
                        builder.eb('car_mileage', '<', 200000)
                    ])).then('< 200 000')
                .when(builder.and(
                    [
                        builder.eb('car_mileage', '>=', 200000),
                        builder.eb('car_mileage', '<', 300000)
                    ])).then('< 300 000')
                .else('> 300 000')
                .end()
                .as('mileage_group'),
            builder.fn.count('car_id').as('car_count')
        ])
        .groupBy(['car_year', 'mileage_group'])
        .orderBy('car_year')
        .execute()
}