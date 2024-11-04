import {GearType} from "@/lib/db/types";
import dbRepository from "@/app/api/gear-types/db_repository";
import crudRepository, {Mapper} from "@/lib/crud_repository";

export type GearTypeDto = {
    id: number;
    name: string;
}

class GearMapper implements Mapper<GearType, GearTypeDto> {
    toDto(e: GearType): GearTypeDto {
        return {
            id: e.gear_type_id,
            name: e.gear_type_name
        }
    }

    toEntity(t: GearTypeDto): GearType {
        return {
            gear_type_id: t.id,
            gear_type_name: t.name
        }
    }

    toEntityPartial(t: Partial<GearTypeDto>): Partial<GearType> {
        return {
            gear_type_id: t.id,
            gear_type_name: t.name
        }
    }
}

export default new crudRepository<GearType, GearTypeDto>(dbRepository, new GearMapper());