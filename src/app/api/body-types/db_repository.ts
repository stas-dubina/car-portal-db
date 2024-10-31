import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {BodyType, BodyTypeView} from "@/lib/db/types";

export async function getCount(ids:Array<number>, filter?: Partial<BodyTypeView>) {
    const db = await connect();

    let query = db.selectFrom('body_type')
        .select(
            (eb) => eb.fn.count<number>('body_type_id').as('body_type_count')
        );

    if (ids.length > 0) {
        query = query.where('body_type_id', 'in', ids.map(Number));
    }

    if (filter?.body_type_name) {
        query = query.where('body_type_name', 'like', `%${filter?.body_type_name}%`)
    }
    if (filter?.car_type_id) {
        query = query.where('body_car_type_id', '=', filter?.car_type_id)
    }
    const result = await query.executeTakeFirstOrThrow();
    return result.body_type_count;
}

export async function getAll(ids:Array<number>, range?:Range, filter?: Partial<BodyTypeView>) {
    const db = await connect();
    let query = db.selectFrom('body_type')
        .innerJoin("car_type", 'car_type_id', 'body_car_type_id')
        .select([
            'body_type_id',
            'body_type_name',
            'car_type_id',
            'car_type_name'
        ]);

    if (ids.length > 0) {
        query = query.where('body_type_id', 'in', ids.map(Number));
    }

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    if (filter?.body_type_name) {
        query = query.where('body_type_name', 'like', `%${filter?.body_type_name}%`)
    }
    if (filter?.car_type_id) {
        query = query.where('body_car_type_id', '=', filter?.car_type_id)
    }
    return await query.orderBy('body_type_id asc').execute();
}

export async function getById(id:number): Promise<BodyTypeView | undefined> {
    const db = await connect();
    return await db.selectFrom('body_type')
        .innerJoin("car_type", 'car_type_id', 'body_car_type_id')
        .select([
            'body_type_id',
            'body_type_name',
            'car_type_id',
            'car_type_name'
        ])
        .where('body_type_id', '=', id)
        .executeTakeFirst()
}

export default {
    getById,
    getAll,
    getCount
}