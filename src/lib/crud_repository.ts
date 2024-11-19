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

    insert(e: E): Promise<number>;

    deleteById(id: number): Promise<void>;
}

export default class CrudRepository<E, T> implements Repository<T> {

    private readonly dbRepository: CrudDbRepository<E>;
    private readonly mapper: Mapper<E, T>;

    constructor(crudRepository: CrudDbRepository<E>,
                mapper: Mapper<E, T>) {
        this.dbRepository = crudRepository;
        this.mapper = mapper;
    }

    async findById(id: number): Promise<T | undefined> {
        const entity = await this.dbRepository.getById(id)

        if (!entity) {
            return undefined;
        }

        return this.mapper.toDto(entity)
    }

    async findAll(ids: Array<number>, range?: Range, filter?: Partial<T>): Promise<ListResult<T>> {
        const dbFilter = filter && this.mapper.toEntityPartial(filter);

        const totalCount = await this.dbRepository.getCount(ids, dbFilter);
        const entities = await this.dbRepository.getAll(ids, range, dbFilter);

        return {
            total: totalCount,
            list: entities.map(b => this.mapper.toDto(b))
        }
    }

    async create(obj: T): Promise<T> {
        const eCreate = this.mapper.toEntity(obj);
        const id = await this.dbRepository.insert(eCreate);
        const entity = await this.dbRepository.getById(id);
        return this.mapper.toDto(entity!);
    }

    async deleteById(id: number): Promise<void> {
        await this.dbRepository.deleteById(id);
    }
}