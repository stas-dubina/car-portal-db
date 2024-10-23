import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";

export async function getCount(ids:Array<number>) {
    const db = await connect();

    let query = db.selectFrom('model')
        .select(
            (eb) => eb.fn.count<number>('model_id').as('model_count')
        );

    if (ids.length > 0) {
        query = query.where('model_id', 'in', ids.map(Number));
    }
    const result = await query.executeTakeFirstOrThrow();
    return result.model_count;
}

export async function getAll(ids:Array<number>, range?:Range) {
    const db = await connect();
    let query = db.selectFrom('model')
        .select([
            'model_id as id',
            'model_name as name',
            'model_brand_id as brandId'
        ]);

    if (ids.length > 0) {
        query = query.where('model_id', 'in', ids.map(Number));
    }

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('model_id asc').execute();
}

export async function getById(id: number) {
    const db = await connect();
    return await db.selectFrom('model')
        .select([
            'model_id as id',
            'model_name as name',
            'model_brand_id as brandId'
        ])
        .where('model_id', '=', id)
        .executeTakeFirst();
}