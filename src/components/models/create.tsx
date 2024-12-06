import {Create, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const ModelCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Назва моделі" required={true} />
        </SimpleForm>
    </Create>
);
