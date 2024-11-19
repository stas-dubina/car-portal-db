import {BodyTypeView} from "@/lib/db/types";
import CrudRepository, {CrudDbRepository, Mapper} from "@/lib/crud_repository";
import dbRepository from "@/app/api/body-types/db_repository";
import { Range } from "@/lib/range";

export type CarTypeDto = {
    id: number;
    name: string;
}

export type BodyTypeViewDto = {
    id: number;
    name: string;
    carType: CarTypeDto;
}

class BodyTypeMapper implements Mapper<BodyTypeView, BodyTypeViewDto> {
    toDto(e: BodyTypeView): BodyTypeViewDto {
        return {
            id: e.body_type_id,
            name: e.body_type_name,
            carType: {
                id: e.car_type_id,
                name: e.car_type_name
            },
        }
    }

    toEntity(t: BodyTypeViewDto): BodyTypeView {
        return {
            body_type_id: t.id,
            body_type_name: t.name,
            car_type_id: t.carType.id,
            car_type_name: t.carType.name
        }
    }

    toEntityPartial(t: Partial<BodyTypeViewDto>): Partial<BodyTypeView> {
        return {
            body_type_id: t.id,
            body_type_name: t.name,
            car_type_id: t.carType?.id,
            car_type_name: t.carType?.name
        }
    }

}

class BodyTypeViewDbRepository implements CrudDbRepository<BodyTypeView> {

    getById(id: number): Promise<BodyTypeView | undefined> {
        return dbRepository.getById(id)
    }

    getCount(ids: Array<number>, filter?: Partial<BodyTypeView> | undefined): Promise<number> {
        return dbRepository.getCount(ids, filter)
    }

    getAll(ids: Array<number>, range?: Range, filter?: Partial<BodyTypeView> | undefined): Promise<BodyTypeView[]> {
        return dbRepository.getAll(ids, range, filter)
    }

    insert(e: BodyTypeView): Promise<number> {
        throw new Error("Method not implemented.");
    }
    deleteById(id: number): Promise<void> {
        throw new Error("Method not implemented.");
    }
}

export default new CrudRepository<BodyTypeView, BodyTypeViewDto>(new BodyTypeViewDbRepository(), new BodyTypeMapper());
