import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {Color, Database} from "@/lib/db/types";
import {Expression, expressionBuilder, SqlBool} from "kysely";

function withFilter(ids: Array<number>, filter?: Partial<Color>) {
    const eb = expressionBuilder<Database, 'color'>()
    const filters: Expression<SqlBool>[] = []

    if (ids.length > 0) {
        filters.push(eb('color_id', 'in', ids.map(Number)))
    }

    if (filter?.color_name) {
        filters.push(eb('color_name', 'like', `%${filter?.color_name}%`))
        filters.push(eb('color_value', 'like', `%${filter?.color_value}%`))
    }

    return eb.and(filters)
}

export async function getCount(ids: Array<number>, filter?: Partial<Color>): Promise<number> {
    const db = await connect();

    let query = db.selectFrom('color')
        .select(
            (eb) => eb.fn.count<number>('color_id').as('color_count')
        )
        .where(withFilter(ids, filter))

    const result = await query.executeTakeFirstOrThrow();
    return result.color_count;
}

export async function getAll(ids: Array<number>, range?: Range, filter?: Partial<Color>): Promise<Color[]> {
    const db = await connect();
    let query = db.selectFrom('color')
        .select([
            'color_id',
            'color_name',
            'color_value'
        ])
        .where(withFilter(ids, filter))

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('color_id asc').execute();
}

export async function getById(id: number): Promise<Color | undefined> {
    const db = await connect();
    return await db.selectFrom('color')
        .select([
            'color_id',
            'color_name',
            'color_value'
        ])
        .where('color_id', '=', id)
        .executeTakeFirst()
}

export default {
    getById,
    getCount,
    getAll
}