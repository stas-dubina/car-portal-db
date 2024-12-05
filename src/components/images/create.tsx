import {Create, ImageField, ImageInput, SimpleForm} from "react-admin";
import {useParams} from "react-router-dom";

export const CreateImage = () => {
    const {carId} = useParams();
    return (
        <Create resource={`cars/${carId}/images`} redirect={`/cars/${carId}/show`}>
            <SimpleForm>
                <ImageInput source="image" label="Зображення">
                    <ImageField source="src" title="title" />
                </ImageInput>
            </SimpleForm>
        </Create>
    )
}