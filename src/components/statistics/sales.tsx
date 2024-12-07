import {
    DateInput,
    fetchUtils,
    Form,
    Loading, NumberField,
    RecordContextProvider,
    SaveButton,
    SimpleShowLayout,
    TextField,
    Title
} from 'react-admin';
import {Card, Stack} from "@mui/material";
import SearchIcon from '@mui/icons-material/Search';
import React, {useEffect, useState} from "react";
import {NUMBER_FIELD_OPTIONS} from "@/components/statistics/utils";

export const SalesStatistics = () => {

    const [data, setData] = useState(undefined)
    const [filter, setFilter] = useState({from: '2024-11-01', to: '2024-11-30'})

    useEffect(() => {
        const params = new URLSearchParams(filter);
        fetchUtils.fetchJson(`http://localhost:3000/api/statistics/sales?${params}`)
            .then(({json}) => setData(json))
            .catch(console.error);
    }, [filter])

    const onFilter = (data) => {
        setFilter(data)
    };

    if (!data) {
        return (<Card sx={{m: 2}}><Loading/></Card>)
    }
    return (
        <Stack spacing={2}>
            <Form onSubmit={onFilter}>
                <Stack direction="row" sx={{mt: 4, maxWidth: 600}} spacing={2}>
                    <DateInput source="from" name="from" required={true} defaultValue={'2024-11-01'}/>
                    <DateInput source="to" name="to" required={true} defaultValue={'2024-11-30'}/>
                    <SaveButton icon={<SearchIcon/>} label="Пошук" sx={{pl: 4, pr: 4, height: 40}}/>
                </Stack>
            </Form>
            <RecordContextProvider value={data}>
                <Title title="Кількість проданих автомобілів за період"/>
                <Card sx={{m: 2}}>
                    <SimpleShowLayout>
                        <TextField source="order_count" label="Кількість проданих автомобілів"/>
                        <NumberField source="order_price_sum" label="Загальна вартiсть проданих автомобілів" options={NUMBER_FIELD_OPTIONS} />
                        <NumberField source="order_price_avg" label="Середня вартiсть проданих автомобілів" options={NUMBER_FIELD_OPTIONS} />
                    </SimpleShowLayout>
                </Card>
            </RecordContextProvider>
        </Stack>
    )
}