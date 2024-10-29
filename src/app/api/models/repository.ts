import {Range} from "@/lib/range";
import {SimpleSearchFilter} from "@/lib/params/simple_search_filter";
import {getAll, getById, getCount} from "@/app/api/models/db_repository";
import {ListResult, Repository} from "@/lib/repository";
import {Model} from "@/lib/db/types";

export type ModelDto = {
    id: number;
    name: string;
    brandId: number;
}

function mapToDto(m: Model) {
    return {
        id: m.model_id,
        name: m.model_name,
        brandId: m.model_brand_id,
    }
}

class ModelRepository implements Repository<ModelDto> {

    async findById(id: number): Promise<ModelDto | undefined> {
        const model = await getById(id);
        if(!model) {
            return undefined;
        }
        return mapToDto(model);
    }

    async findAll(ids: Array<number>, range?: Range, filter?: SimpleSearchFilter): Promise<ListResult<ModelDto>> {
        const totalCount = await getCount(ids, filter?.name);
        const models = await getAll(ids, range, filter?.name);

        return {
            total: totalCount,
            list: models.map(m => mapToDto(m))
        }
    }
}

export default new ModelRepository();
