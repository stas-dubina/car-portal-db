import CrudController from "@/lib/crud_controller";
import featureRepository from "./repository";

export const crudController = new CrudController('features', featureRepository)