import {
    Datagrid,
    DateField,
    ExportButton,
    List,
    NumberField,
    TextField,
    TopToolbar,
    useListContext,
} from 'react-admin';
import {NUMBER_FIELD_OPTIONS} from "@/components/statistics/utils";
import React from "react";
import {pdf} from "@react-pdf/renderer";
import {saveAs} from "file-saver";
import OrdersReport from "./pdf/pdf_report";
import Button from "@mui/material/Button";
import PictureAsPdfIcon from "@mui/icons-material/PictureAsPdf";


const ListActions = () => {

    const {data, isPending} = useListContext();

    const savePDF = async (doc) => {
        try {
            const pdfRender = pdf(doc);
            const pdfBlob = await pdfRender.toBlob()

            saveAs(pdfBlob, 'orders.pdf');
        } catch (error) {
            console.error(error);
            alert('Error generating PDF');
        }
    }

    const exportToPdf = async () => {
        const doc = (<OrdersReport orders={data}/>);
        await savePDF(doc)
    }

    return (
        <TopToolbar>
            <Button style={{margin: 0, padding: 0}}
                    startIcon={<PictureAsPdfIcon/>}
                    onClick={() => exportToPdf()}
            >
                PDF
            </Button>
            <ExportButton/>
        </TopToolbar>
    );
}

export const OrderList = () => (
    <List actions={<ListActions/>}>
        <Datagrid>
            <TextField source="id" label="ID"/>
            <NumberField source="price" label="Ціна" options={NUMBER_FIELD_OPTIONS}/>
            <DateField source="createdAt" label="Дата створення"/>
            <TextField source="car.brandName" label="Марка"/>
            <TextField source="car.modelName" label="Модель"/>
            <TextField source="car.year" label="Рік"/>
            <NumberField source="car.mileage" label="Пробіг"/>
            <TextField source="car.user.firstName" label="Ім'я власника"/>
            <TextField source="car.user.lastName" label="Прізвище власника"/>
            <TextField source="car.user.phone" label="Телефон"/>
        </Datagrid>
    </List>
);