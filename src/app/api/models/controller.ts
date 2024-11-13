import CrudController from "@/lib/crud_controller";
import modelTypeRepository from "@/app/api/models/repository"

export const crudController = new CrudController('models', modelTypeRepository)