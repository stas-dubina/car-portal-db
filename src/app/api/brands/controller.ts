import CrudController from "@/lib/crud_controller";
import brandRepository from "@/app/api/brands/repository";

export const crudController = new CrudController('brands', brandRepository)