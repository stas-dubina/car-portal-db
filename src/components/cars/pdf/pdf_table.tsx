import React from 'react';
import {View, StyleSheet } from '@react-pdf/renderer';
import TableHeader from "@/components/cars/pdf/pdf_table_header";
import TableBody from "@/components/cars/pdf/prd_table_body";

const styles = StyleSheet.create({
    tableContainer: {
        flexDirection: 'row',
        flexWrap: 'wrap',
        marginTop: 24,
        borderWidth: 1,
        borderColor: '#bff0fd',
    },
});

const CarsTable = ({cars}) => (
    <View style={styles.tableContainer}>
        <TableHeader />
        <TableBody cars={cars} />
    </View>
);

export default CarsTable