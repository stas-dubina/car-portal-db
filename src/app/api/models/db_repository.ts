import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {Model} from "@/lib/db/types";

export async function getCount(ids: Array<number>, searchName?: string) {
    const db = await connect();

    let query = db.selectFrom('model')
        .select(
            (eb) => eb.fn.count<number>('model_id').as('model_count')
        );

    if (ids.length > 0) {
        query = query.where('model_id', 'in', ids.map(Number));
    }

    if (searchName) {
        query = query.where('model_name', 'like', `%${searchName}%`)
    }
    const result = await query.executeTakeFirstOrThrow();
    return result.model_count;
}

export async function getAll(ids: Array<number>, range?: Range, searchName?: string): Promise<Model[]> {
    const db = await connect();
    let query = db.selectFrom('model')
        .select([
            'model_id',
            'model_name',
            'model_brand_id'
        ]);

    if (ids.length > 0) {
        query = query.where('model_id', 'in', ids.map(Number));
    }

    if (searchName) {
        query = query.where('model_name', 'like', `%${searchName}%`)
    }

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('model_id asc').execute();
}

export async function getById(id: number): Promise<Model | undefined> {
    const db = await connect();
    return await db.selectFrom('model')
        .select([
            'model_id',
            'model_name',
            'model_brand_id'
        ])
        .where('model_id', '=', id)
        .executeTakeFirst();
}