import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {CarType,  Database} from "@/lib/db/types";
import {Expression, expressionBuilder, SqlBool} from "kysely";

function withFilter(ids: Array<number>, filter?: Partial<CarType>) {
    const eb = expressionBuilder<Database, 'car_type'>()
    const filters: Expression<SqlBool>[] = []

    if (ids.length > 0) {
        filters.push(eb('car_type_id', 'in', ids.map(Number)))
    }

    if (filter?.car_type_name) {
        filters.push(eb('car_type_name', 'like', `%${filter?.car_type_name}%`))
    }

    return eb.and(filters)
}

export async function getCount(ids: Array<number>, filter?: Partial<CarType>): Promise<number> {
    const db = await connect();

    let query = db.selectFrom('car_type')
        .select(
            (eb) => eb.fn.count<number>('car_type_id').as('car_type_count')
        )
        .where(withFilter(ids, filter))

    const result = await query.executeTakeFirstOrThrow();
    return result.car_type_count;
}

export async function getAll(ids: Array<number>, range?: Range, filter?: Partial<CarType>): Promise<CarType[]> {
    const db = await connect();
    let query = db.selectFrom('car_type')
        .select([
            'car_type_id',
            'car_type_name'
        ])
        .where(withFilter(ids, filter))

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('car_type_id asc').execute();
}

export async function getById(id: number): Promise<CarType | undefined> {
    const db = await connect();
    return await db.selectFrom('car_type')
        .select([
            'car_type_id',
            'car_type_name'
        ])
        .where('car_type_id', '=', id)
        .executeTakeFirst()
}

export default {
    getById,
    getCount,
    getAll
}