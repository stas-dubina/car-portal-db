import React, {Fragment} from 'react';
import {StyleSheet, Text, View} from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    row: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        fontWeight: 400,
        flexGrow: 1,
    },
    brand: {
        width: '25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    model: {
        width: '25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    year: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    mileage: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    price: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
});


const TableBody = ({cars}) => {
    const rows = cars.map(car =>
        <View style={styles.row} key={car.id.toString()}>
            <Text style={styles.brand}>{car.brandName}</Text>
            <Text style={styles.model}>{car.modelName}</Text>
            <Text style={styles.year}>{car.year}</Text>
            <Text style={styles.mileage}>{car.mileage}</Text>
            <Text style={styles.price}>${car.price}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};

export default TableBody