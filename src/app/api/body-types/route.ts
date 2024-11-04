import bodyTypeRepository, {BodyTypeDto} from "@/app/api/body-types/repository";
import CrudController from "@/lib/crud_controller";
import {BodyTypeView} from "@/lib/db/types";

const controller = new CrudController<BodyTypeView, BodyTypeDto>('body-types', bodyTypeRepository)

export async function GET(request: Request) {
    return controller.getAll(request);
}
