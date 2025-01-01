import {useWatch} from "react-hook-form";
import {ReferenceInput, SelectInput} from "react-admin";
import React from "react";

export const BodyTypeInput = () => {
    const carTypeId = useWatch({name: 'carTypeId'});

    return <ReferenceInput source="bodyTypeId" reference="body-types" filter={{carType: {id: Number(carTypeId)}}}>
        <SelectInput name="bodyTypeId" source="bodyTypeId" label="Тип кузова" required={true} disabled={!carTypeId}/>
    </ReferenceInput>
}
