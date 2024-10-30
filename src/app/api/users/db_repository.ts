import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {User} from "@/lib/db/types";

export async function getCount(ids:Array<number>, searchName?: string) {
    const db = await connect();

    let query = db.selectFrom('user')
        .select(
            (eb) => eb.fn.count<number>('user_id').as('user_count')
        );

    if (ids.length > 0) {
        query = query.where('user_id', 'in', ids.map(Number));
    }

    if (searchName) {
        query = query.where('user_first_name', 'like', `%${searchName}%`)
        query = query.where('user_last_name', 'like', `%${searchName}%`)
    }
    const result = await query.executeTakeFirstOrThrow();
    return result.user_count;
}

export async function getAll(ids:Array<number>, range?:Range, searchName?: string): Promise<User[]> {
    const db = await connect();
    let query = db.selectFrom('user')
        .select([
            'user_id',
            'user_first_name',
            'user_last_name',
            'user_phone',
            'user_city_id',
            'user_email'
        ]);

    if (ids.length > 0) {
        query = query.where('user_id', 'in', ids.map(Number));
    }

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    if (searchName) {
        query = query.where('user_first_name', 'like', `%${searchName}%`)
        query = query.where('user_last_name', 'like', `%${searchName}%`)
    }

    return await query.orderBy('user_id asc').execute();
}

export async function getById(id:number): Promise<User | undefined> {
    const db = await connect();
    return await db.selectFrom('user')
        .select([
            'user_id',
            'user_first_name',
            'user_last_name',
            'user_phone',
            'user_city_id',
            'user_email'
        ])
        .where('user_id', '=', id)
        .executeTakeFirst()
}