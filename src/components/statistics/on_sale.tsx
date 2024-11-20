import React, {useEffect, useState} from "react";
import {fetchUtils, Loading, RecordContextProvider, SimpleShowLayout, TextField, Title} from "react-admin";
import {Card} from "@mui/material";

export const OnSaleStatistics = () => {

    const [data, setData] = useState(undefined)

    useEffect(() => {
        fetchUtils.fetchJson(`http://localhost:3000/api/statistics/on-sale`)
            .then(({json}) => setData(json))
            .catch(console.error);
    }, [])

    if (!data) {
        return (<Card sx={{m: 2}}><Loading/></Card>)
    }
    return (
        <RecordContextProvider value={data}>
            <Title title="Кількість активних угод і сума вартості автомобілів"/>
            <Card sx={{m: 2}}>
                <SimpleShowLayout>
                    <TextField source="car_count" label="Кількість активних угод"/>
                    <TextField source="car_price_sum" label="Сума вартості автомобілів"/>
                </SimpleShowLayout>
            </Card>
        </RecordContextProvider>
    )
}