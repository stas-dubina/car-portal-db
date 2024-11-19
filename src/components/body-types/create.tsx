import {Create, ReferenceInput, SimpleForm, TextField, TextInput} from "react-admin";
import React from "react";

export const BodyTypeCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Тип кузова" required={true} />

            <ReferenceInput
                source="carTypeId"
                reference="car-types"
                required={true}
            />

        </SimpleForm>
    </Create>
);
