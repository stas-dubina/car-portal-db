import {Edit, ReferenceInput, SelectInput, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const BodyTypeEdit = () => {
    const transform = data => ({
        id: data.id,
        name: data.name,
        carTypeId: data.carType.id
    });

    return (
        <Edit transform={transform} mutationMode="pessimistic">
            <SimpleForm>
                <TextInput source="name" label="Тип кузова" required={true}/>

                <ReferenceInput
                    source="carType.id"
                    reference="car-types"
                    required={true}>
                    <SelectInput label="Тип авто"/>
                </ReferenceInput>

            </SimpleForm>
        </Edit>
    );
}
