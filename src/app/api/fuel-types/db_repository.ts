import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {Database, FuelType} from "@/lib/db/types";
import {Expression, expressionBuilder, SqlBool} from "kysely";

function withFilter(ids:Array<number>, filter?:Partial<FuelType>) {
    const eb = expressionBuilder<Database, 'fuel_type'>()
    const filters: Expression<SqlBool>[] = []

    if (ids.length > 0) {
        filters.push(eb('fuel_type_id', 'in', ids.map(Number)))
    }

    if (filter?.fuel_type_name) {
        filters.push(eb('fuel_type_name', 'like', `%${filter?.fuel_type_name}%`))
    }

    return eb.and(filters)
}

export async function getCount(ids:Array<number>, filter?:Partial<FuelType>): Promise<number> {
    const db = await connect();

    let query = db.selectFrom('fuel_type')
        .select(
            (eb) => eb.fn.count<number>('fuel_type_id').as('fuel_type_count')
        )
        .where(withFilter(ids, filter))

    const result = await query.executeTakeFirstOrThrow();
    return result.fuel_type_count;
}

export async function getAll(ids:Array<number>, range?:Range, filter?:Partial<FuelType>): Promise<FuelType[]> {
    const db = await connect();
    let query = db.selectFrom('fuel_type').where(withFilter(ids, filter))
        .select([
            'fuel_type_id',
            'fuel_type_name'
        ])
        .where(withFilter(ids, filter))

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('fuel_type_id asc').execute();
}

export async function getById(id:number): Promise<FuelType | undefined> {
    const db = await connect();
    return await db.selectFrom('fuel_type')
        .select([
            "fuel_type_id",
            "fuel_type_name"
        ])
        .where('fuel_type_id', '=', id)
        .executeTakeFirst()
}

export async function insert(e: FuelType): Promise<number> {
    const db = await connect();
    const result = await db.selectFrom('fuel_type')
        .values({
            fuel_type_name: e.fuel_type_name
        })
        .returning(['fuel_type_id'])
        .executeTakeFirst()
    return result.fuel_type_id;
}

export async function deleteById(id: number): Promise<void> {
    const db = await connect();
    await db.deleteFrom('fuel_type')
        .where('fuel_type_id', '=', id)
        .executeTakeFirst()
}

export async function update(e: FuelType): Promise<boolean> {
    const db = await connect();
    const result = await db.updateTable('fuel_type')
        .set({
            fuel_type_name: e.fuel_type_name
        })
        .where('fuel_type_id', '=', e.fuel_type_id)
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