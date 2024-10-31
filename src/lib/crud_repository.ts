import {ListResult, Repository} from "@/lib/repository";
import {Range} from "./range";

export interface Mapper<E, T>{
    toDto (e: E): T;
    toEntity (t: T): E;
    toEntityPartial (t: Partial<T>): Partial<E>;
}

export interface CrudDbRepository<E> {

    getById(id: number): Promise<E | undefined>;

    getCount(ids: Array<number>, filter?: Partial<E>): Promise<number>;

    getAll(ids: Array<number>, range?: Range, filter?: Partial<E>): Promise<E[]>
}

export default class CrudRepository<E, T> implements Repository<T> {

    private readonly crudRepository: CrudDbRepository<E>;
    private readonly mapper: Mapper<E, T>;

    constructor(crudRepository: CrudDbRepository<E>,
                mapper: Mapper<E, T>) {
        this.crudRepository = crudRepository;
        this.mapper = mapper;
    }

    async findById(id: number): Promise<T | undefined> {
        const entity = await this.crudRepository.getById(id)

        if (!entity) {
            return undefined;
        }

        return this.mapper.toDto(entity)
    }

    async findAll(ids: Array<number>, range?: Range, filter?: Partial<T>): Promise<ListResult<T>> {
        const dbFilter = filter && this.mapper.toEntityPartial(filter);

        const totalCount = await this.crudRepository.getCount(ids, dbFilter);
        const entities = await this.crudRepository.getAll(ids, range, dbFilter);

        return {
            total: totalCount,
            list: entities.map(b => this.mapper.toDto(b))
        }
    }

}