import dbRepository from "./db_repository"
import {CarType} from "@/lib/db/types";
import CrudRepository, {Mapper} from "@/lib/crud_repository";

export type CarTypeDto = {
    id: number;
    name: string;
}

class ColorMapper implements Mapper<CarType, CarTypeDto> {
    toDto(e: CarType): CarTypeDto {
        return {
            id: e.car_type_id,
            name: e.car_type_name
        }
    }

    toEntity(t: CarTypeDto): CarType {
        return {
            car_type_id: t.id,
            car_type_name: t.name,
        }
    }

    toEntityPartial(t: Partial<CarTypeDto>): Partial<CarType> {
        return {
            car_type_id: t.id,
            car_type_name: t.name,
        }
    }
}

export default new CrudRepository<CarType, CarTypeDto>(dbRepository, new ColorMapper());