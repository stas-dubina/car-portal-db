import CrudController from "@/lib/crud_controller";
import gearTypeRepository from "@/app/api/gear-types/repository";

export const crudController = new CrudController('gear-types', gearTypeRepository)