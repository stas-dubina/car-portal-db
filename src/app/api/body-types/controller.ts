import CrudController from "@/lib/crud_controller";
import bodyTypeRepository from "@/app/api/body-types/repository";

export const crudController = new CrudController('gear-types', bodyTypeRepository)