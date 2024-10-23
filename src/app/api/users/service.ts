import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";

export async function getCount(ids:Array<number>) {
    const db = await connect();

    let query = db.selectFrom('user')
        .select(
            (eb) => eb.fn.count<number>('user_id').as('user_count')
        );

    if (ids.length > 0) {
        query = query.where('user_id', 'in', ids.map(Number));
    }
    const result = await query.executeTakeFirstOrThrow();
    return result.user_count;
}

export async function getAll(ids:Array<number>, range?:Range) {
    const db = await connect();
    let query = db.selectFrom('user')
        .select([
            'user_id as id',
            'user_first_name as firstName',
            'user_last_name as lastName',
            'user_phone as phone',
            'user_city_id as cityId',
            'user_email as email'
        ]);

    if (ids.length > 0) {
        query = query.where('user_id', 'in', ids.map(Number));
    }

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('user_id asc').execute();
}