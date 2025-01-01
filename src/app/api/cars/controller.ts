import CrudController from "@/lib/crud_controller";
import carRepository from "@/app/api/cars/repository";

export const crudController = new CrudController('users', carRepository)