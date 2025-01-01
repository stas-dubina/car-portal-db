import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {Database, Feature} from "@/lib/db/types";
import {Expression, expressionBuilder, SqlBool} from "kysely";

function withFilter(ids: Array<number>, filter?: Partial<Feature>) {
    const eb = expressionBuilder<Database, 'feature'>()
    const filters: Expression<SqlBool>[] = []

    if (ids.length > 0) {
        filters.push(eb('feature_id', 'in', ids.map(Number)))
    }

    if (filter?.feature_name) {
        filters.push(eb('feature_name', 'like', `%${filter?.feature_name}%`))
    }

    return eb.and(filters)
}

export async function getCount(ids: Array<number>, filter?: Partial<Feature>): Promise<number> {
    const db = await connect();

    let query = db.selectFrom('feature')
        .select(
            (eb) => eb.fn.count<number>('feature_id').as('feature_count')
        )
        .where(withFilter(ids, filter))

    const result = await query.executeTakeFirstOrThrow();
    return result.feature_count;
}

export async function getAll(ids: Array<number>, range?: Range, filter?: Partial<Feature>): Promise<Feature[]> {
    const db = await connect();
    let query = db.selectFrom('feature')
        .select([
            'feature_id',
            'feature_name'
        ])
        .where(withFilter(ids, filter))

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('feature_id asc').execute();
}

export async function getById(id: number): Promise<Feature | undefined> {
    const db = await connect();
    return await db.selectFrom('feature')
        .select([
            'feature_id',
            'feature_name'
        ])
        .where('feature_id', '=', id)
        .executeTakeFirst()
}

export async function insert(e: Feature): Promise<number> {
    const db = await connect();
    const result = await db.insertInto('feature')
        .values({
            feature_name: e.feature_name
        })
        .returning(['feature_id'])
        .executeTakeFirstOrThrow()
    return result.feature_id
}

export async function deleteById(id: number): Promise<void> {
    const db = await connect();
    await db.deleteFrom('feature')
        .where('feature_id', '=', id)
        .executeTakeFirst()
}

export async function update(e: Feature): Promise<boolean> {
    const db = await connect();
    const result = await db.updateTable('feature')
        .set({
            feature_name: e.feature_name
        })
        .where('feature_id', '=', e.feature_id)
        .executeTakeFirst()
    return result.numUpdatedRows != BigInt(0)
}

export default {
    getById,
    getCount,
    getAll,
    insert,
    deleteById,
    update
}