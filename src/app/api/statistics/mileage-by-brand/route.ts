import {getMileageGroup, getOnSaleStatistic, getSalesAndDiscountByBrand} from "@/app/api/statistics/db_repository";
import {NextResponse} from "next/server";

export async function GET(request: Request) {
    const result = await getMileageGroup();

    return NextResponse.json(result, {
        status: 200,
        headers: {
            'Access-Control-Expose-Headers': 'Content-Range',
            'Content-Range': `sales 0-100/${result.length}`
        }
    });
}