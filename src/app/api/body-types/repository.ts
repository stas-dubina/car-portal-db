import {NewBodyType} from "@/lib/db/types";
import CrudRepository, {CrudDbRepository, Mapper} from "@/lib/crud_repository";
import dbRepository from "@/app/api/body-types/db_repository";
import { Range } from "@/lib/range";

export type BodyTypeDto = {
    id?: number;
    name: string;
    carTypeId: number;
}

class BodyTypeMapper implements Mapper<NewBodyType, BodyTypeDto> {
    toDto(e: NewBodyType): BodyTypeDto {
        return {
            id: e.body_type_id,
            name: e.body_type_name,
            carTypeId: e.body_car_type_id
        }
    }

    toEntity(t: BodyTypeDto): NewBodyType {
        return {
            body_type_id: t.id,
            body_type_name: t.name,
            body_car_type_id: t.carTypeId
        }
    }

    toEntityPartial(t: Partial<BodyTypeDto>): Partial<NewBodyType> {
        throw new Error("Method not implemented.");
    }
}

class BodyTypeDbRepository implements CrudDbRepository<NewBodyType> {
    async getById(id: number): Promise<NewBodyType | undefined> {
        const bodyType = await dbRepository.getById(id)

        if (!bodyType) {
            return undefined
        }

        return {
            body_type_id: bodyType.body_type_id,
            body_type_name: bodyType.body_type_name,
            body_car_type_id: bodyType.car_type_id
        }
    }
    getCount(ids: Array<number>, filter?: Partial<NewBodyType> | undefined): Promise<number> {
        throw new Error("Method not implemented.");
    }
    getAll(ids: Array<number>, range?: Range, filter?: Partial<NewBodyType> | undefined): Promise<NewBodyType[]> {
        throw new Error("Method not implemented.");
    }

    insert(e: NewBodyType): Promise<number> {
        return dbRepository.insert(e)
    }

    async deleteById(id: number): Promise<void> {
        await dbRepository.deleteById(id)
    }
}

export default new CrudRepository<NewBodyType, BodyTypeDto>(new BodyTypeDbRepository(), new BodyTypeMapper());
