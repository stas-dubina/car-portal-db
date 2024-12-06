import {Edit, SimpleForm, TextInput} from "react-admin";
import React from "react";

export const CarTypeEdit = () => (
    <Edit mutationMode="pessimistic">
        <SimpleForm>
            <TextInput source="name" label="Назва типу автомобіля" required={true} />
        </SimpleForm>
    </Edit>
);
