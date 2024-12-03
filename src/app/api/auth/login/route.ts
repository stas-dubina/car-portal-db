import {getUser} from "@/app/api/auth/login/db_repository";
import bcrypt from 'bcrypt'
import {sign} from "jsonwebtoken";
import {NextResponse} from "next/server";
import {UserDto} from "@/app/api/users/repository";

type LoginRequest = {
    login: string;
    password: string
}

export type LoginResponse = {
    user: UserDto,
    token: string;
}

export async function POST(request: Request) {
    const {login, password}: LoginRequest = await request.json();
    const hashedPassword = await bcrypt.hash(password, 10)
    console.log(login, password)
    const user = await getUser(login)

    const passwordMatches = await bcrypt.compare(password, user.user_password_hash)

    if (passwordMatches) {
        return NextResponse.json({
                user: {
                    id: user.user_id,
                    createdAt: user.user_created_at,
                    login: user.user_login,
                    firstName: user.user_first_name,
                    lastName: user.user_last_name,
                    phone: user.user_phone,
                    email: user.user_email,
                    cityId: user.user_city_id,
                    cityName: user.user_city_name
                },
                token: sign(
                    {sub: user.user_id.toString(), email: user.user_email},
                    process.env.JWT_SECRET!,
                ),
            },
            {
                status: 200,
            });
    } else {
        return NextResponse.json({error: 'Користувача не знайдено'}, {status: 403})
    }
}