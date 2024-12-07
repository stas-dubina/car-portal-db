import bcrypt from 'bcrypt'
import {singUp} from "@/app/api/auth/signup/db_repository";
import {singIn} from "@/app/api/auth/login/route";

export type SignUpRequest = {
    login: string;
    password: string
    firstName: string
    lastName: string
    phone: string
    email: string
    cityId: number
}

export async function POST(request: Request) {
    const req: SignUpRequest = await request.json();
    const hashedPassword = await bcrypt.hash(req.password, 10)

    const userId = await singUp(req, hashedPassword)

    return await singIn(req.login, req.password)
}