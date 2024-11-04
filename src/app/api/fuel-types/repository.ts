import {FuelType} from "@/lib/db/types";
import CrudRepository, {Mapper} from "@/lib/crud_repository";
import dbRepository from "@/app/api/fuel-types/db_repository";

export type FuelTypeDto = {
    id: number;
    name: string;
}

class FuelMapper implements Mapper<FuelType, FuelTypeDto> {

    toDto(e: FuelType): FuelTypeDto {
        return {
            id: e.fuel_type_id,
            name: e.fuel_type_name
        }
    }

    toEntity(t: FuelTypeDto): FuelType {
        return {
            fuel_type_id: t.id,
            fuel_type_name: t.name
        }
    }

    toEntityPartial(t: Partial<FuelTypeDto>): Partial<FuelType> {
        return {
            fuel_type_id: t.id,
            fuel_type_name: t.name,
        }
    }
}

export default new CrudRepository<FuelType, FuelTypeDto>(dbRepository, new FuelMapper());