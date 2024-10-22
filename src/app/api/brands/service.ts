import {connect} from "@/lib/db/connection";
import {Range} from '@/lib/range';

export async function getCount(ids:Array<number>) {
    const db = await connect();

    let query = db.selectFrom('brand')
        .select(
            (eb) => eb.fn.count<number>('brand_id').as('brand_count')
        );

    if (ids.length > 0) {
        query = query.where('brand_id', 'in', ids.map(Number));
    }
    const result = await query.executeTakeFirstOrThrow();
    return result.brand_count;
}

export async function getAll(ids:Array<number>, range?:Range) {
    const db = await connect();
    let query = db.selectFrom('brand')
        .select([
            'brand_id as id',
            'brand_name as name'
        ]);

    if (ids.length > 0) {
        query = query.where('brand_id', 'in', ids.map(Number));
    }

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('brand_id asc').execute();
}