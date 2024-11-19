import {crudControllerView, crudControllerModify} from "../controller";
import {PathParams} from "@/lib/crud_controller";

export async function GET(request: Request, context: { params: PathParams }) {
    return crudControllerView.getOne(request, context)
}

export async function DELETE(request: Request, context: { params: PathParams }) {
    return crudControllerModify.deleteOne(request, context)
}