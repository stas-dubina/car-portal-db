import {getSalesByDate} from "@/app/api/statistics/db_repository";
import {NextResponse} from "next/server";


export async function GET(request: Request) {
    // @ts-ignore
    const {searchParams} = request.nextUrl;
    const from = new Date(searchParams.get('from'));
    const to = new Date(searchParams.get('to'));

    const result = await getSalesByDate(from, to);
    return NextResponse.json(result, {status: 200});
}