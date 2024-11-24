import {connect} from "@/lib/db/connection";
import {Range} from '@/lib/range';
import {Brand, Database} from "@/lib/db/types";
import {Expression, expressionBuilder, SqlBool} from "kysely";
import {id} from "date-fns/locale";

function withFilter(ids: Array<number>, filter?: Partial<Brand>) {
    const eb = expressionBuilder<Database, 'brand'>()
    const filters: Expression<SqlBool>[] = []

    if (ids.length > 0) {
        filters.push(eb('brand_id', 'in', ids.map(Number)))
    }

    if (filter?.brand_name) {
        filters.push(eb('brand_name', 'like', `%${filter?.brand_name}%`));
    }

    return eb.and(filters)
}

export async function getCount(ids: Array<number>, filter?: Partial<Brand>): Promise<number> {
    const db = await connect();

    let query = db.selectFrom('brand')
        .select(
            (eb) => eb.fn.count<number>('brand_id').as('brand_count')
        )
        .where(withFilter(ids, filter))

    const result = await query.executeTakeFirstOrThrow();
    return result.brand_count;
}

export async function getAll(ids: Array<number>, range?: Range, filter?: Partial<Brand>): Promise<Brand[]> {
    const db = await connect();
    let query = db.selectFrom('brand')
        .select([
            'brand_id',
            'brand_name'
        ])
        .where(withFilter(ids, filter))

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('brand_id asc').execute();
}

export async function getById(id: number): Promise<Brand | undefined> {
    const db = await connect();
    return await db.selectFrom('brand')
        .select([
            'brand_id',
            'brand_name'
        ])
        .where('brand_id', '=', id)
        .executeTakeFirst();
}

export async function insert(e: Brand): Promise<number> {
    const db = await connect();
    const result = await db.insertInto('brand')
        .values({
            brand_name: e.brand_name
        })
        .returning(['brand_id'])
        .executeTakeFirstOrThrow()
    return result.brand_id
}

export async function deleteById(id: number): Promise<void> {
    const db = await connect();
    await db.deleteFrom('brand')
        .where('brand_id', '=', id)
        .executeTakeFirst()
}

export async function update(e: Brand): Promise<boolean> {
    const db = await connect();
    const result = await db.updateTable('brand')
        .set({
            brand_name: e.brand_name
        })
        .where('brand_id', '=', e.brand_id)
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