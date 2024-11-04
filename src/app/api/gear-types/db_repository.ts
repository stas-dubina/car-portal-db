import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {GearType} from "@/lib/db/types";

export async function getCount(ids:Array<number>, filter?: Partial<GearType>): Promise<number> {
    const db = await connect();

    let query = db.selectFrom('gear_type')
        .select(
            (eb) => eb.fn.count<number>('gear_type_id').as('gear_type_count')
        );

    if (ids.length > 0) {
        query = query.where('gear_type_id', 'in', ids.map(Number));
    }

    if (filter?.gear_type_name) {
        query = query.where('gear_type_name', 'like', `%${filter?.gear_type_name}%`)
    }
    const result = await query.executeTakeFirstOrThrow();
    return result.gear_type_count;
}

export async function getAll(ids:Array<number>, range?:Range, filter?: Partial<GearType>): Promise<GearType[]> {
    const db = await connect();
    let query = db.selectFrom('gear_type')
        .select([
            'gear_type_id',
            'gear_type_name'
        ]);

    if (ids.length > 0) {
        query = query.where('gear_type_id', 'in', ids.map(Number));
    }

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    if (filter?.gear_type_name) {
        query = query.where('gear_type_name', 'like', `%${filter?.gear_type_name}%`)
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

export default {
    getById,
    getAll,
    getCount
}