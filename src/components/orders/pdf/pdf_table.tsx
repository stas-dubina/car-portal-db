import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import TableHeader from "./pdf_table_header";
import TableBody from "./pdf_table_body";

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

const OrdersTable = ({orders}) => (
    <View style={styles.tableContainer}>
        <TableHeader />
        <TableBody orders={orders} />
    </View>
);

export default OrdersTable