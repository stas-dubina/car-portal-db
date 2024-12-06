import {
    FilterList, FilterListItem, ReferenceInput, SelectInput, useGetMany, useGetOne,
    FilterContext,

    FilterForm, SearchInput, TextField, TextInput, Labeled
} from 'react-admin';
import {Box, Card, CardContent} from '@mui/material';
import CategoryIcon from '@mui/icons-material/LocalOffer';

export const CarSearch = () => {

    const searchFieldWidth = 220;
    const searchFilters = [
        <ReferenceInput name="test" source="brandId" reference="brands" alwaysOn>
            <SelectInput label="Марка" sx={{minWidth: searchFieldWidth, width: searchFieldWidth}}/>
        </ReferenceInput>,
        <TextInput name="priceMin" source="priceMin" label="Ціна від" alwaysOn sx={{minWidth: searchFieldWidth, width: searchFieldWidth}}/>,
        <TextInput name="priceMax" source="priceMax" label="Ціна до" alwaysOn sx={{minWidth: searchFieldWidth, width: searchFieldWidth}}/>,
        <TextInput name="yearMin" source="yearMin" label="Рік від" alwaysOn sx={{minWidth: searchFieldWidth, width: searchFieldWidth}}/>,
        <TextInput name="yearMax" source="yearMax" label="Рік до" alwaysOn sx={{minWidth: searchFieldWidth, width: searchFieldWidth}}/>,
        <TextInput name="mileageMin" source="mileageMin" label="Пробіг від" alwaysOn sx={{minWidth: searchFieldWidth, width: searchFieldWidth}}/>,
        <TextInput name="mileageMax" source="mileageMax" label="Пробіг до" alwaysOn sx={{minWidth: searchFieldWidth, width: searchFieldWidth}}/>

    ];

    return (
        <Card sx={{order: -1, mr: 2, width: 260,}}>
            <CardContent>
                <FilterContext.Provider value={searchFilters}>
                    <FilterForm filters={searchFilters}/>
                </FilterContext.Provider>
                <FilterList label="ДТП" icon={<CategoryIcon/>}>
                    <FilterListItem label="Був у ДТП" value={{accident: true}}/>
                    <FilterListItem label="Не був у ДТП" value={{accident: false}}/>
                </FilterList>
                <FilterList label="Походження" icon={<CategoryIcon/>}>
                    <FilterListItem label="З України" value={{abroad: false}}/>
                    <FilterListItem label="З-за кордону" value={{abroad: true}}/>
                </FilterList>
                <FilterList label="Кредит" icon={<CategoryIcon/>}>
                    <FilterListItem label="Не в кредиті" value={{inCredit: false}}/>
                    <FilterListItem label="В кредиті" value={{inCredit: true}}/>
                </FilterList>
                <FilterList label="Тип приводу" icon={<CategoryIcon/>}>
                    <FilterListItem label="Передній" value={{driveType: 'FWD'}}/>
                    <FilterListItem label="Задній" value={{driveType: 'RWD'}}/>
                    <FilterListItem label="Повний" value={{driveType: 'AWD'}}/>
                </FilterList>
            </CardContent>
        </Card>
    );
}