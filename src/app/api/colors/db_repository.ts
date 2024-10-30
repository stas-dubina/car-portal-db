import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {Color} from "@/lib/db/types";

export async function getCount(ids:Array<number>, searchName?: string) {
    const db = await connect();

    let query = db.selectFrom('color')
        .select(
            (eb) => eb.fn.count<number>('color_id').as('color_count')
        );

    if (ids.length > 0) {
        query = query.where('color_id', 'in', ids.map(Number));
    }

    if (searchName) {
        query = query.where('color_name', 'like', `%${searchName}%`)
        query = query.where('color_value', 'like', `%${searchName}%`)
    }
    const result = await query.executeTakeFirstOrThrow();
    return result.color_count;
}

export async function getAll(ids:Array<number>, range?:Range, searchName?: string): Promise<Color[]> {
    const db = await connect();
    let query = db.selectFrom('color')
        .select([
            'color_id',
            'color_name',
            'color_value'
        ]);

    if (ids.length > 0) {
        query = query.where('color_id', 'in', ids.map(Number));
    }

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    if (searchName) {
        query = query.where('color_name', 'like', `%${searchName}%`)
        query = query.where('color_value', 'like', `%${searchName}%`)
    }

    return await query.orderBy('color_id asc').execute();
}

export async function getById(id:number): Promise<Color | undefined> {
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