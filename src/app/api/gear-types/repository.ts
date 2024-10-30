import {GearType} from "@/lib/db/types";
import {ListResult, Repository} from "@/lib/repository";
import {getAll, getCount, getById} from "@/app/api/gear-types/db_repository";
import {SimpleSearchFilter} from "@/lib/params/simple_search_filter";
import {Range} from "@/lib/range";

export type GearTypeDto = {
    id: number;
    name: string;
}

function mapToDto(g: GearType): GearTypeDto {
    return {
        id: g.gear_type_id,
        name: g.gear_type_name,
    }
}

class GearRepository implements Repository<GearTypeDto> {

    async findById(id: number): Promise<GearTypeDto | undefined> {
        const gearType = await getById(id);

        if (!gearType) {
            return undefined;
        }

        return mapToDto(gearType);
    }

    async findAll(ids: Array<number>, range?: Range, filter?: SimpleSearchFilter): Promise<ListResult<GearTypeDto>> {
        const totalCount = await getCount(ids, filter?.name);
        const fuelTypes = await getAll(ids, range, filter?.name);

        return {
            total: totalCount,
            list: fuelTypes.map(g => mapToDto(g))
        }
    }
}

export default new GearRepository();