import {connect} from "@/lib/db/connection";
import {Range} from "@/lib/range";
import {Database, UserView} from "@/lib/db/types";
import {Expression, expressionBuilder, Kysely, SqlBool} from "kysely";

function withFilter(ids: Array<number>, filter?:Partial<UserView>) {
    const eb = expressionBuilder<Database, 'user'>()
    const filters: Expression<SqlBool>[] = []

    if (ids.length > 0) {
        filters.push(eb('user_id', 'in', ids.map(Number)))
    }

    if (filter?.user_id) {
        filters.push(eb('user_first_name', 'like', `%${filter?.user_first_name}%`))
        filters.push(eb('user_last_name', 'like', `%${filter?.user_last_name}%`))
    }

    return eb.and(filters)
}

export async function getCount(ids: Array<number>, filter?:Partial<UserView>): Promise<number> {
    const db = await connect();

    let query = db.selectFrom('user')
        .select(
            (eb) => eb.fn.count<number>('user_id').as('user_count')
        )
        .where(withFilter(ids, filter))

    const result = await query.executeTakeFirstOrThrow();
    return result.user_count;
}

function selectUserView(db: Kysely<Database>) {
    return db.selectFrom('user as u')
        .innerJoin('account as a', 'a.user_id', 'u.user_id')
        .innerJoin('city as c', 'city_id', 'u.user_city_id')
        .select([
            'u.user_id',
            'a.user_login',
            'user_first_name',
            'user_last_name',
            'a.user_created_at',
            'user_phone',
            'user_email',
            'user_city_id',
            'city_name as user_city_name'
        ]);
}

export async function getAll(ids: Array<number>, range?: Range, filter?: Partial<UserView>): Promise<UserView[]> {
    const db = await connect();
    let query = selectUserView(db).where(withFilter(ids, filter))

    if (range) {
        const rowCount = range.end - range.start + 1;
        query = query.limit(rowCount).offset(range.start)
    }

    return await query.orderBy('user_id asc').execute();
}

export async function getById(id: number): Promise<UserView | undefined> {
    const db = await connect();
    return await selectUserView(db)
        .where('user_id', '=', id)
        .executeTakeFirst()
}

export default {
    getById,
    getCount,
    getAll
}