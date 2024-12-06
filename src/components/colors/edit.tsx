import {Edit, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const ColorEdit = () => (
    <Edit mutationMode="pessimistic">
        <SimpleForm>
            <TextInput source="name" label="Назва кольору" required={true} />
            <TextInput source="value" label="HTML значення" required={true} />
        </SimpleForm>
    </Edit>
);
