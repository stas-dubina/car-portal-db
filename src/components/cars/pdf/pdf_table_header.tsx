import React from 'react';
import {Text, View, StyleSheet } from '@react-pdf/renderer';

const borderColor = '#90e5fc'
const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        borderBottomColor: '#bff0fd',
        backgroundColor: '#bff0fd',
        borderBottomWidth: 1,
        alignItems: 'center',
        height: 24,
        textAlign: 'center',
        fontWeight: 600,
        flexGrow: 1,
    },
    brand: {
        width: '25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    model: {
        width: '25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    year: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    mileage: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
    price: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
    },
});

const TableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.brand}>Марка</Text>
        <Text style={styles.model}>Модель</Text>
        <Text style={styles.year}>Рiк</Text>
        <Text style={styles.mileage}>Пробiг</Text>
        <Text style={styles.price}>Цiна</Text>
    </View>
);

export default TableHeader