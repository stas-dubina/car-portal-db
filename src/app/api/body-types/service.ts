import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";

export async function getCount(ids:Array<number>) {
    const db = await connect();

    let query = db.selectFrom('body_type')
        .select(
            (eb) => eb.fn.count<number>('body_type_id').as('body_type_count')
        );

    if (ids.length > 0) {
        query = query.where('body_type_id', 'in', ids.map(Number));
    }
    const result = await query.executeTakeFirstOrThrow();
    return result.body_type_count;
}

export async function getAll(ids:Array<number>, range?:Range) {
    const db = await connect();
    let query = db.selectFrom('body_type')
        .select([
            'body_type_id as id',
            'body_type_name as name'
        ]);

    if (ids.length > 0) {
        query = query.where('body_type_id', 'in', ids.map(Number));
    }

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('body_type_id asc').execute();
}