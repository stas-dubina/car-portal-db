import CrudController from "@/lib/crud_controller";
import bodyTypeViewRepository from "./get_repository";
import bodyTypeRepository from "./repository"

export const crudControllerView = new CrudController('body-types', bodyTypeViewRepository)
export const crudControllerModify = new CrudController('body-types', bodyTypeRepository)