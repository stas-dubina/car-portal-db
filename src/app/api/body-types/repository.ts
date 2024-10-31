import {BodyTypeView} from "@/lib/db/types";
import CrudRepository, {Mapper} from "@/lib/crud_repository";
import dbRepository from "@/app/api/body-types/db_repository";

export type CarTypeDto = {
    id: number;
    name: string;
}

export type BodyTypeDto = {
    id: number;
    name: string;
    carType: CarTypeDto;
}

class BodyTypeMapper implements Mapper<BodyTypeView, BodyTypeDto> {
    toDto(e: BodyTypeView): BodyTypeDto {
        return {
            id: e.body_type_id,
            name: e.body_type_name,
            carType: {
                id: e.car_type_id,
                name: e.car_type_name
            },
        }
    }

    toEntity(t: BodyTypeDto): BodyTypeView {
        return {
            body_type_id: t.id,
            body_type_name: t.name,
            car_type_id: t.carType.id,
            car_type_name: t.carType.name
        }
    }

    toEntityPartial(t: Partial<BodyTypeDto>): Partial<BodyTypeView> {
        return {
            body_type_id: t.id,
            body_type_name: t.name,
            car_type_id: t.carType?.id,
            car_type_name: t.carType?.name
        }
    }

}

export default new CrudRepository<BodyTypeView, BodyTypeDto>(dbRepository, new BodyTypeMapper());
