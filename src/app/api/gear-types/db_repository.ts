import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {Database, GearType} from "@/lib/db/types";
import {Expression, expressionBuilder, SqlBool} from "kysely";

function withFilter(ids:Array<number>, filter?: Partial<GearType>) {
    const eb = expressionBuilder<Database, 'gear_type'>()
    const filters: Expression<SqlBool>[] = []

    if (ids.length > 0) {
        filters.push(eb('gear_type_id', 'in', ids.map(Number)));
    }

    if (filter?.gear_type_name) {
        filters.push(eb('gear_type_name', 'like', `%${filter?.gear_type_name}%`))
    }

    return eb.and(filters)
}

export async function getCount(ids:Array<number>, filter?: Partial<GearType>): Promise<number> {
    const db = await connect();

    let query = db.selectFrom('gear_type')
        .select(
            (eb) => eb.fn.count<number>('gear_type_id').as('gear_type_count')
        )
        .where(withFilter(ids, filter))

    const result = await query.executeTakeFirstOrThrow();
    return result.gear_type_count;
}

export async function getAll(ids:Array<number>, range?:Range, filter?: Partial<GearType>): Promise<GearType[]> {
    const db = await connect();
    let query = db.selectFrom('gear_type').where(withFilter(ids, filter))
        .select([
            'gear_type_id',
            'gear_type_name'
        ])
        .where(withFilter(ids, filter))

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('gear_type_id asc').execute();
}

export async function getById(id:number): Promise<GearType | undefined> {
    const db = await connect();
    return await db.selectFrom('gear_type')
        .select([
            "gear_type_id",
            "gear_type_name"
        ])
        .where('gear_type_id', '=', id)
        .executeTakeFirst()
}

export async function insert(e: GearType): Promise<number> {
    const db = await connect();
    const result = await db.insertInto('gear_type')
        .values({
            gear_type_name: e.gear_type_name
        })
        .returning(['gear_type_id'])
        .executeTakeFirstOrThrow()
    return result.gear_type_id;
}

export async function deleteById(id: number): Promise<void> {
    const db = await connect();
    await db.deleteFrom('gear_type')
        .where('gear_type_id', '=', id)
        .executeTakeFirst()
}

export async function update(e: GearType): Promise<boolean> {
    const db = await connect();
    const result = await db.selectFrom('gear_type')
        .set({
            gear_type_name: e.gear_type_name
        })
        .where('gear_type_id', '=', e.gear_type_id)
        .executeTakeFirst()
    return result.numUpdatedRows != BigInt(0)
}

export default {
    getById,
    getAll,
    getCount,
    insert,
    deleteById,
    update
}