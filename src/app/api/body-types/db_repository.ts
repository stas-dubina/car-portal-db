import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {BodyType} from "@/lib/db/types";

export async function getCount(ids:Array<number>, searchName?: string) {
    const db = await connect();

    let query = db.selectFrom('body_type')
        .select(
            (eb) => eb.fn.count<number>('body_type_id').as('body_type_count')
        );

    if (ids.length > 0) {
        query = query.where('body_type_id', 'in', ids.map(Number));
    }

    if (searchName) {
        query = query.where('body_type_name', 'like', `%${searchName}%`)
    }
    const result = await query.executeTakeFirstOrThrow();
    return result.body_type_count;
}

export async function getAll(ids:Array<number>, range?:Range, searchName?: string) {
    const db = await connect();
    let query = db.selectFrom('body_type')
        .select([
            'body_type_id',
            'body_type_name',
            'body_car_type_id'
        ]);

    if (ids.length > 0) {
        query = query.where('body_type_id', 'in', ids.map(Number));
    }

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    if (searchName) {
        query = query.where('body_type_name', 'like', `%${searchName}%`)
    }

    return await query.orderBy('body_type_id asc').execute();
}

export async function getById(id:number): Promise<BodyType | undefined> {
    const db = await connect();
    return await db.selectFrom('body_type')
        .select([
            "body_type_id",
            "body_type_name",
            "body_car_type_id"
        ])
        .where('body_type_id', '=', id)
        .executeTakeFirst()
}