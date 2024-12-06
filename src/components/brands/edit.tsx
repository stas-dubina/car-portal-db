import {Edit, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const BrandEdit = () => (
    <Edit mutationMode="pessimistic">
        <SimpleForm>
            <TextInput source="name" label="Назва бренду" required={true} />
        </SimpleForm>
    </Edit>
);
