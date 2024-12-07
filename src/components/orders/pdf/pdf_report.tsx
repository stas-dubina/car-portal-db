import React from 'react';
import {Document, Font, Page, StyleSheet} from '@react-pdf/renderer';
import OrdersTable from "./pdf_table";

Font.register({
    family: "Roboto",
    format: 'truetype',
    fontWeight: 400,
    src: '/fonts/roboto-regular-webfont.ttf',
    fonts: [
        {
            src: '/fonts/roboto-light-webfont.ttf',
            fontWeight: 300
        },
        {
            src: '/fonts/roboto-medium-webfont.ttf',
            fontWeight: 500
        },
        {
            src: '/fonts/roboto-bold-webfont.ttf',
            fontWeight: 600
        },
    ],
})

const styles = StyleSheet.create({
    page: {
        fontFamily: 'Roboto',
        fontStyle: 'normal',
        fontWeight: 400,
        fontSize: 11,
        paddingTop: 30,
        paddingLeft: 60,
        paddingRight: 60,
        lineHeight: 1.5,
        flexDirection: 'column',
    },
    logo: {
        width: 74,
        height: 66,
        marginLeft: 'auto',
        marginRight: 'auto'
    }
});

const OrdersReport = ({orders}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <OrdersTable orders={orders}/>
        </Page>
    </Document>
);

export default OrdersReport