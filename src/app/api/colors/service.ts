import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";

export async function getCount(ids:Array<number>) {
    const db = await connect();

    let query = db.selectFrom('color')
        .select(
            (eb) => eb.fn.count<number>('color_id').as('color_count')
        );

    if (ids.length > 0) {
        query = query.where('color_id', 'in', ids.map(Number));
    }
    const result = await query.executeTakeFirstOrThrow();
    return result.color_count;
}

export async function getAll(ids:Array<number>, range?:Range) {
    const db = await connect();
    let query = db.selectFrom('color')
        .select([
            'color_id as id',
            'color_name as name',
            'color_value as value'
        ]);

    if (ids.length > 0) {
        query = query.where('color_id', 'in', ids.map(Number));
    }

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('color_id asc').execute();
}