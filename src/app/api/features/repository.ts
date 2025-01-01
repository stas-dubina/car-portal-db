import dbRepository from "./db_repository"
import {Feature} from "@/lib/db/types";
import CrudRepository, {Mapper} from "@/lib/crud_repository";

export type FeatureDto = {
    id: number;
    name: string;
}

class FeatureMapper implements Mapper<Feature, FeatureDto> {
    toDto(e: Feature): FeatureDto {
        return {
            id: e.feature_id,
            name: e.feature_name
        }
    }

    toEntity(t: FeatureDto): Feature {
        return {
            feature_id: t.id,
            feature_name: t.name,
        }
    }

    toEntityPartial(t: Partial<FeatureDto>): Partial<Feature> {
        return {
            feature_id: t.id,
            feature_name: t.name,
        }
    }
}

export default new CrudRepository<Feature, FeatureDto>(dbRepository, new FeatureMapper());