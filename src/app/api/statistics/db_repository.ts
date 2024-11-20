import {connect} from "@/lib/db/connection";

export async function getOnSaleStatistic() {
    // select COUNT(car_id), SUM(car_price) from car c where c.car_status = 'ON_SALE'
    const db = await connect();
    return db.selectFrom('car')
        .select(builder => [
            builder.fn.count<number>('car_id').as('car_count'),
            builder.fn.sum<number>('car_price').as('car_price_sum'),
        ])
        .where('car_status', '=', 'ON_SALE')
        .executeTakeFirst()
}

export async function getSalesByDate(from: Date, to: Date) {
    // select COUNT(order_id), SUM(order_price) from "order"
    // where order_created_at between '2024-10-01' and '2024-10-31'
    const db = await connect();
    return db.selectFrom('order')
        .select(builder => [
            builder.fn.count<number>('order_id').as('order_count'),
            builder.fn.sum<number>('order_price').as('order_price_sum'),
        ])
        .where(builder => builder.between('order_created_at', from, to))
        .executeTakeFirst()
}