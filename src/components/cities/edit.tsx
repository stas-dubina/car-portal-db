import {Edit, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const CityEdit = () => (
    <Edit mutationMode="pessimistic">
        <SimpleForm>
            <TextInput source="name" label="Назва кольору" required={true} />
        </SimpleForm>
    </Edit>
);
