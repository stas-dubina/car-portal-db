import {getAll, getBrandById, getCount} from "@/app/api/brands/db_repository";
import {SimpleSearchFilter} from "@/lib/params/simple_search_filter";
import {Range} from "@/lib/range";
import {ListResult, Repository} from "@/lib/repository";
import {Brand} from "@/lib/db/types";

export type BrandDto = {
    id: number;
    name: string;
}

function mapToDto(b: Brand): BrandDto {
    return {
        id: b.brand_id,
        name: b.brand_name,
    }
}

class BrandRepository implements Repository<BrandDto> {

    async findById(id: number): Promise<BrandDto | undefined> {
        const brand = await getBrandById(id)

        if (!brand) {
            return undefined;
        }

        return mapToDto(brand)
    }

    async findAll(ids: Array<number>, range?: Range, filter?: SimpleSearchFilter): Promise<ListResult<BrandDto>> {
        const totalCount = await getCount(ids, filter?.name);
        const brands = await getAll(ids, range, filter?.name);

        return {
            total: totalCount,
            list: brands.map(b => mapToDto(b))
        }
    }
}

export default new BrandRepository();

