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

export default {
    getById,
    getCount,
    getAll
}