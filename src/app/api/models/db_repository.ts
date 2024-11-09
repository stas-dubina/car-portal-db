import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {Database, Model} from "@/lib/db/types";
import {Expression, expressionBuilder, SqlBool} from "kysely";

function withFilter(ids: Array<number>, filter?:Partial<Model>) {
    const eb = expressionBuilder<Database, 'model'>()
    const filters: Expression<SqlBool>[] = []

    if (ids.length > 0) {
        filters.push(eb('model_id', 'in', ids.map(Number)));
    }

    if (filter?.model_id) {
        filters.push(eb('model_name', 'like', `%${filter?.model_name}%`))
    }

    return eb.and(filters)
}

export async function getCount(ids: Array<number>, filter?:Partial<Model>): Promise<number> {
    const db = await connect();

    let query = db.selectFrom('model')
        .select(
            (eb) => eb.fn.count<number>('model_id').as('model_count')
        )
        .where(withFilter(ids, filter))

    const result = await query.executeTakeFirstOrThrow();
    return result.model_count;
}

export async function getAll(ids: Array<number>, range?: Range, filter?:Partial<Model>): Promise<Model[]> {
    const db = await connect();
    let query = db.selectFrom('model').where(withFilter(ids, filter))
        .select([
            'model_id',
            'model_name',
            'model_brand_id'
        ]);

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