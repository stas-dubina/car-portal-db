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
    createdAt: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },

    price: {
        width: '15%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    userName: {
        width: '25%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    phone: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
    cityName: {
        width: '20%',
        borderRightColor: borderColor,
        borderRightWidth: 1,
        paddingLeft: 5,
        paddingRight: 5,
    },
});

const TableHeader = () => (
    <View style={styles.container}>
        <Text style={styles.createdAt}>Дата</Text>
        <Text style={styles.price}>Цiна</Text>
        <Text style={styles.userName}>Продавець</Text>
        <Text style={styles.phone}>Телефон</Text>
        <Text style={styles.cityName}>Мiсто</Text>
    </View>
);

export default TableHeader