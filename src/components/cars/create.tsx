import {
    Create,
    Form, ImageField, ImageInput,
    NumberInput,
    RadioButtonGroupInput,
    ReferenceInput,
    SaveButton,
    SelectInput,
    TextInput
} from "react-admin";
import React from "react";
import {Grid} from "@mui/material";
import {DRIVE_TYPES} from "@/components/cars/types";
import {useWatch} from "react-hook-form";

const BOOLEAN_RADIO_VALUES = [
    {id: 'true', name: 'Так'},
    {id: 'false', name: 'Нi'},
]

const ModelInput = () => {
    const brandId = useWatch({ name: 'brandId' });

    return <ReferenceInput source="modelId" reference="models" filter={{ brandId: Number(brandId) }}>
        <SelectInput name="modelId" source="modelId" required={true} disabled={!brandId}/>
    </ReferenceInput>
}

export const CarCreate = () => (
    <Create>
        <Form>
            <Grid container sx={{m: 2}}>
                <Grid item xs={3}>
                    <ReferenceInput
                        source="brandId"
                        reference="brands"
                        required={true}
                    />
                    <ModelInput/>
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={3}>
                    <NumberInput source="year" label="Рік" required={true}/>
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={3}>
                    <ReferenceInput source="fuelTypeName" reference="fuel-types">
                        <SelectInput label="Тип палива" required={true}/>
                    </ReferenceInput>
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={3}>
                    <ReferenceInput source="gearTypeName" reference="gear-types">
                        <SelectInput label="Коробка передач" required={true}/>
                    </ReferenceInput>
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={3}>
                    <NumberInput source="mileage" label="Пробіг" required={true}/>
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={3}>
                    <NumberInput source="price" label="Ціна" required={true}/>
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={3}>
                    <ReferenceInput source="colorId" reference="colors">
                        <SelectInput label="Колір" required={true}/>
                    </ReferenceInput>
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={3}>
                    <TextInput source="vin" label="VIN-код" required={true}/>
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={3}>
                    <ReferenceInput source="bodyTypeId" reference="body-types">
                        <SelectInput label="Тип кузова" required={true}/>
                    </ReferenceInput>
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={3}>
                    <RadioButtonGroupInput source="accident" label="Був у ДТП" required={true}
                                           choices={BOOLEAN_RADIO_VALUES}/>
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={3}>
                    <RadioButtonGroupInput source="abroad" label="Був за кордоном" required={true}
                                           choices={BOOLEAN_RADIO_VALUES}/>
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={3}>
                    <RadioButtonGroupInput source="inCredit" label="В кредиті" required={true}
                                           choices={BOOLEAN_RADIO_VALUES}/>
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={3}>
                    <NumberInput source="ownerNumber" label="Кількість власників" required={true}/>
                </Grid>
                <Grid item xs={9}>
                </Grid>

                <Grid item xs={3}>
                    <NumberInput source="power" label="Потужність" required={true}/>
                </Grid>
                <Grid item xs={9}>
                </Grid>

                <Grid item xs={3}>
                    <NumberInput source="seat" label="Кількість місць" required={true}/>
                </Grid>
                <Grid item xs={9}>
                </Grid>

                <Grid item xs={3}>
                    <SelectInput source="driveType" choices={DRIVE_TYPES} label="Тип приводу" required={true}/>
                </Grid>
                <Grid item xs={9}>
                </Grid>

                <Grid item xs={3}>
                    <TextInput source="description" label="Опис"/>
                </Grid>
                <Grid item xs={9}>
                </Grid>
                <Grid item xs={12}>
                    <SaveButton />
                </Grid>
            </Grid>
        </Form>
    </Create>
);
