import React from 'react';
import {Document, Font, Page, StyleSheet, Text, View} from '@react-pdf/renderer';
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
    titleContainer: {

    },
    title: {
        fontWeight: 600,
        textAlign: 'center',
        paddingLeft: 5,
        paddingRight: 5,
    },
    createdAt: {
        textAlign: 'right',
        paddingLeft: 5,
        paddingRight: 5,
    }
});

const OrdersReport = ({orders}) => (
    <Document>
        <Page size="A4" style={styles.page}>
            <View style={styles.titleContainer}>
                <Text style={styles.title}>Список продажів</Text>
                <Text style={styles.createdAt}>Створено: {new Date().toLocaleString()}</Text>
            </View>
            <OrdersTable orders={orders}/>
        </Page>
    </Document>
);

export default OrdersReport