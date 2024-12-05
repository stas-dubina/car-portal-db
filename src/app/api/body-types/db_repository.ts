import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {BodyType, BodyTypeView, Database, NewBodyType} from "@/lib/db/types";
import {Expression, expressionBuilder, Kysely, SqlBool} from "kysely";

function withFilter(ids: Array<number>, filter?: Partial<BodyTypeView>) {
    const eb = expressionBuilder<Database, 'body_type'>()
    const filters: Expression<SqlBool>[] = []

    if (ids.length > 0) {
        filters.push(eb('body_type_id', 'in', ids.map(Number)))
    }

    if (filter?.body_type_name) {
        filters.push(eb('body_type_name', 'like', `%${filter?.body_type_name}%`))
    }

    if (filter?.car_type_id) {
        filters.push(eb('body_car_type_id', '=', filter?.car_type_id))
    }

    return eb.and(filters)
}

export async function getCount(ids: Array<number>, filter?: Partial<BodyTypeView>) {
    const db = await connect();

    let query = db.selectFrom('body_type')
        .select(
            (eb) => eb.fn.count<number>('body_type_id').as('body_type_count')
        )
        .where(withFilter(ids, filter));

    const result = await query.executeTakeFirstOrThrow();
    return result.body_type_count;
}

function selectBodyTypeView(db: Kysely<Database>) {
    return db.selectFrom('body_type as bt')
        .innerJoin('car_type as ct', 'ct.car_type_id', 'bt.body_car_type_id')
        .select([
            'body_type_id',
            'body_type_name',
            'car_type_id',
            'car_type_name'
        ]);
}

export async function getAll(ids: Array<number>, range?: Range, filter?: Partial<BodyTypeView>) {
    const db = await connect();
    let query = selectBodyTypeView(db)
        .where(withFilter(ids, filter));

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('body_type_id asc').execute();
}

export async function getById(id: number): Promise<BodyTypeView | undefined> {
    const db = await connect();
    return await selectBodyTypeView(db)
        .where('body_type_id', '=', id)
        .executeTakeFirst()
}

export async function insert(e: NewBodyType): Promise<number> {
    const db = await connect();
    const result = await db.insertInto('body_type')
        .values({
            body_type_name: e.body_type_name,
            body_car_type_id: e.body_car_type_id
        })
        .returning(['body_type_id'])
        .executeTakeFirstOrThrow()
    return result.body_type_id;
}

export async function deleteById(id: number): Promise<void> {
    const db = await connect();
    await db.deleteFrom('body_type')
        .where('body_type_id', '=', id)
        .executeTakeFirst()
}

export async function update(e: BodyType): Promise<boolean> {
    const db = await connect();
    const result = await db.updateTable('body_type')
        .set({
            body_type_name: e.body_type_name
        })
        .where("body_type_id", "=", e.body_type_id)
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