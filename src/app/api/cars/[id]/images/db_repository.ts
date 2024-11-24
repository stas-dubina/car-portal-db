import {BodyTypeView, Brand, Database, Image} from "@/lib/db/types";
import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {Expression, expressionBuilder, SqlBool} from "kysely";

function withFilter(ids: Array<number>, filter?: Partial<Image>) {
    const eb = expressionBuilder<Database, 'image'>()
    const filters: Expression<SqlBool>[] = []

    if (ids.length > 0) {
        filters.push(eb('image_id', 'in', ids.map(Number)))
    }

    if (filter?.image_car_id) {
        filters.push(eb('image_car_id', '=', filter?.image_car_id))
    }

    return eb.and(filters)
}

export async function getCount(ids: Array<number>, filter?: Partial<Image>): Promise<number> {
    const db = await connect();

    let query = db.selectFrom('image')
        .select(
            (eb) => eb.fn.count<number>('image_id').as('image_count')
        )
        .where(withFilter(ids, filter));

    const result = await query.executeTakeFirstOrThrow();
    return result.image_count;
}

export async function getAll(ids: Array<number>, range?: Range, filter?: Partial<Image>): Promise<Image[]> {
    const db = await connect();
    let query = db.selectFrom('image')
        .select([
            'image_id',
            'image_file',
            'image_car_id'
        ])
        .where(withFilter(ids, filter));

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('image_id asc').execute();
}

export async function getById(id: number): Promise<Image | undefined> {
    const db = await connect();
    return await db.selectFrom('image')
        .select([
            'image_id',
            'image_file',
            'image_car_id'
        ])
        .where('image_id', '=', id)
        .executeTakeFirst();
}

export async function insert(e: Image): Promise<number> {
    const db = await connect();
    const result = await db.insertInto('image')
        .values({
            image_file: e.image_file,
            image_car_id: e.image_car_id
        })
        .returning(['image_id'])
        .executeTakeFirstOrThrow()
    return result.image_id
}

export async function deleteById(id: number): Promise<void> {
    const db = await connect();
    await db.deleteFrom('image')
        .where('image_id', '=', id)
        .executeTakeFirst()
}

export default {
    getCount,
    getAll,
    getById,
    insert,
    deleteById
}