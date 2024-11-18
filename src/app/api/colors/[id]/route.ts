import {crudController} from "../controller";
import {PathParams} from "@/lib/crud_controller";

export async function GET(request: Request, context: { params: PathParams }) {
    return crudController.getOne(request, context)
}

export async function DELETE(request: Request, context: { params: PathParams }) {
    return crudController.deleteOne(request, context)
}