import {Model} from "@/lib/db/types";
import CrudRepository, {Mapper} from "@/lib/crud_repository";
import dbRepository from "@/app/api/models/db_repository";

export type ModelDto = {
    id: number;
    name: string;
    brandId: number;
}

class ModelMapper implements Mapper<Model, ModelDto> {

    toDto(e: Model): ModelDto {
        return {
            id: e.model_id,
            name: e.model_name,
            brandId: e.model_brand_id
        }
    }

    toEntity(t: ModelDto): Model {
        return {
            model_id: t.id,
            model_name: t.name,
            model_brand_id: t.brandId
        }
    }

    toEntityPartial(t: Partial<ModelDto>): Partial<Model> {
        return {
            model_id: t.id,
            model_name: t.name,
            model_brand_id: t.brandId
        }
    }
}

export default new CrudRepository<Model, ModelDto>(dbRepository, new ModelMapper());
