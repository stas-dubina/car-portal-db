import {crudController} from "@/app/api/models/controller";

export async function GET(request: Request) {
    return crudController.getAll(request)
}