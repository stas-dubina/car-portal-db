import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";

export async function getCount(ids:Array<number>) {
    const db = await connect();

    let query = db.selectFrom('fuel_type')
        .select(
            (eb) => eb.fn.count<number>('fuel_type_id').as('fuel_type_count')
        );

    if (ids.length > 0) {
        query = query.where('fuel_type_id', 'in', ids.map(Number));
    }
    const result = await query.executeTakeFirstOrThrow();
    return result.fuel_type_count;
}

export async function getAll(ids:Array<number>, range?:Range) {
    const db = await connect();
    let query = db.selectFrom('fuel_type')
        .select([
            'fuel_type_id as id',
            'fuel_type_name as name'
        ]);

    if (ids.length > 0) {
        query = query.where('fuel_type_id', 'in', ids.map(Number));
    }

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('fuel_type_id asc').execute();
}