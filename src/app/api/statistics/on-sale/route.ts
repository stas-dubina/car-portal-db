import {getOnSaleStatistic} from "@/app/api/statistics/db_repository";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const result = await getOnSaleStatistic();
    return NextResponse.json(result, {status: 200});
}