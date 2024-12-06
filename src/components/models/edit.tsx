import {Edit, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const ModelEdit = () => (
    <Edit mutationMode="pessimistic">
        <SimpleForm>
            <TextInput source="name" label="Назва моделі" required={true} />
        </SimpleForm>
    </Edit>
);
