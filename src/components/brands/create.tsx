import {Create, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const BrandCreate = () => (
    <Create>
        <SimpleForm>
            <TextInput source="name" label="Назва бренду" required={true} />
        </SimpleForm>
    </Create>
);
