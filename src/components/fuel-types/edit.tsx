import {Edit, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const FuelTypeEdit = () => (
    <Edit mutationMode="pessimistic">
        <SimpleForm>
            <TextInput source="name" label="Назва типу палива" required={true} />
        </SimpleForm>
    </Edit>
);
