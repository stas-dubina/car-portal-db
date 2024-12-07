import {connect} from "@/lib/db/connection";
import {SignUpRequest} from "@/app/api/auth/signup/route";

export async function singUp(userData: SignUpRequest, passwordHash: string): number {
    const db = await connect();

    const account = await db.insertInto('account')
        .values({
            user_login: userData.login,
            user_password_hash: passwordHash,
            user_created_at: new Date()
        })
        .returning('user_id')
        .executeTakeFirstOrThrow()

    await db.insertInto('user')
        .values({
            user_id: account.user_id,
            user_first_name: userData.firstName,
            user_last_name: userData.lastName,
            user_phone: userData.phone,
            user_city_id: userData.cityId,
            user_email: userData.email
        })
        .executeTakeFirstOrThrow();

    return account.user_id;
}