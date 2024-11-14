import CrudController from "@/lib/crud_controller";
import carTypeRepository from "@/app/api/car-types/repository";

export const crudController = new CrudController('car-types', carTypeRepository)