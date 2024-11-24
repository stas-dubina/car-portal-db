import {Edit, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const BrandEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" label="Назва бренду" required={true} />
        </SimpleForm>
    </Edit>
);
