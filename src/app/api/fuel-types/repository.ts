import {FuelType} from "@/lib/db/types";
import {ListResult, Repository} from "@/lib/repository";
import {getAll, getById, getCount} from "@/app/api/fuel-types/db_repository";
import {SimpleSearchFilter} from "@/lib/params/simple_search_filter";
import {Range} from "@/lib/range";

export type FuelTypeDto = {
    id: number;
    name: string;
}

function mapToDto(f: FuelType): FuelTypeDto {
    return {
        id: f.fuel_type_id,
        name: f.fuel_type_name,
    }
}

class FuelRepository implements Repository<FuelTypeDto> {

    async findById(id: number): Promise<FuelTypeDto | undefined> {
        const fuelType = await getById(id);

        if (!fuelType) {
            return undefined;
        }

        return mapToDto(fuelType);
    }

    async findAll(ids: Array<number>, range?: Range, filter?: SimpleSearchFilter): Promise<ListResult<FuelTypeDto>> {
        const totalCount = await getCount(ids, filter?.name);
        const fuelTypes = await getAll(ids, range, filter?.name);

        return {
            total: totalCount,
            list: fuelTypes.map(f => mapToDto(f))
        }
    }
}

export default new FuelRepository();