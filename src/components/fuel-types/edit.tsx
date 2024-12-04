import {Edit, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const FuelTypeEdit = () => (
    <Edit>
        <SimpleForm>
            <TextInput source="name" label="Назва типу палива" required={true} />
        </SimpleForm>
    </Edit>
);
