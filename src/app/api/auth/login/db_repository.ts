import {connect} from "@/lib/db/connection";

export async function getUser(login: string) {
    const db = await connect();
    return await db.selectFrom('user as u')
        .innerJoin('account as a', 'a.user_id', 'u.user_id')
        .innerJoin('city as c', 'city_id', 'u.user_city_id')
        .select([
            'u.user_id',
            'a.user_login',
            'a.user_password_hash',
            'user_first_name',
            'user_last_name',
            'a.user_created_at',
            'user_phone',
            'user_email',
            'user_city_id',
            'city_name as user_city_name'
        ])
        .where('user_login', '=', login)
        .executeTakeFirstOrThrow()
}