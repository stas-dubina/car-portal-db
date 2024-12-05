import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {City,  Database} from "@/lib/db/types";
import {Expression, expressionBuilder, SqlBool} from "kysely";

function withFilter(ids: Array<number>, filter?: Partial<City>) {
    const eb = expressionBuilder<Database, 'city'>()
    const filters: Expression<SqlBool>[] = []

    if (ids.length > 0) {
        filters.push(eb('city_id', 'in', ids.map(Number)))
    }

    if (filter?.city_name) {
        filters.push(eb('city_name', 'like', `%${filter?.city_name}%`))
    }

    return eb.and(filters)
}

export async function getCount(ids: Array<number>, filter?: Partial<City>): Promise<number> {
    const db = await connect();

    let query = db.selectFrom('city')
        .select(
            (eb) => eb.fn.count<number>('city_id').as('city_count')
        )
        .where(withFilter(ids, filter))

    const result = await query.executeTakeFirstOrThrow();
    return result.city_count;
}

export async function getAll(ids: Array<number>, range?: Range, filter?: Partial<City>): Promise<City[]> {
    const db = await connect();
    let query = db.selectFrom('city')
        .select([
            'city_id',
            'city_name'
        ])
        .where(withFilter(ids, filter))

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('city_id asc').execute();
}

export async function getById(id: number): Promise<City | undefined> {
    const db = await connect();
    return await db.selectFrom('city')
        .select([
            'city_id',
            'city_name'
        ])
        .where('city_id', '=', id)
        .executeTakeFirst()
}

export async function insert(e: City): Promise<number> {
    const db = await connect();
    const result = await db.insertInto('city')
        .values({
            city_name: e.city_name
        })
        .returning(['city_id'])
        .executeTakeFirstOrThrow()
    return result.city_id
}

export async function deleteById(id: number): Promise<void> {
    const db = await connect();
    await db.deleteFrom('city')
        .where('city_id', '=', id)
        .executeTakeFirst()
}

export async function update(e: City): Promise<boolean> {
    const db = await connect();
    const result = await db.updateTable('city')
        .set({
            city_name: e.city_name
        })
        .where('city_id', '=', e.city_id)
        .executeTakeFirstOrThrow()
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