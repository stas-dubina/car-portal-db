import {
    FilterList, FilterListItem, ReferenceInput, SelectInput, useGetMany, useGetOne,
    FilterContext,

    FilterForm, SearchInput, TextField, TextInput, Labeled
} from 'react-admin';
import {Card, CardContent} from '@mui/material';
import CategoryIcon from '@mui/icons-material/LocalOffer';

export const CarFilter = () => {

    /*const {data, isPending} = useGetMany(
        'brands',
        {}
    );*/

    const searchFilters = [
        <ReferenceInput name="test" source="brandId" reference="brands" alwaysOn>
            <SelectInput label="Марка"/>
        </ReferenceInput>,
        <TextInput name="priceMin" source="priceMin" alwaysOn/>,
        <TextInput name="priceMax" source="priceMax" alwaysOn/>
    ];

    return (
        <Card sx={{order: -1, mr: 2, width: 300}}>
            <CardContent>
                <FilterContext.Provider value={searchFilters}>
                    <FilterForm filters={searchFilters}/>
                </FilterContext.Provider>

                {/*<SelectInput name="name" source="category" choices={[]} />*/}
                {/* <ReferenceInput label="Бренд" source="brandId" reference="brands">
                    <SelectInput optionText="name" />
                </ReferenceInput> */}
                <FilterList label="Статус" icon={<CategoryIcon/>}>
                    <FilterListItem label="На продажу" value={{status: 'ON_SALE'}}/>
                    <FilterListItem label="Продано" value={{status: 'SOLD'}}/>
                    <FilterListItem label="Знято з продажу" value={{status: 'CANCELLED'}}/>
                </FilterList>
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