import CrudController from "@/lib/crud_controller";
import orderRepository from "./repository"

export const crudController = new CrudController('models', orderRepository)