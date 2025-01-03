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


const TableBody = ({orders}) => {
    const rows = orders.map(order =>
        <View style={styles.row} key={order.id.toString()}>
            <Text style={styles.createdAt}>{order.createdAt}</Text>
            <Text style={styles.price}>${order.price}</Text>
            <Text style={styles.userName}>{`${order.car.user.firstName} ${order.car.user.lastName}`}</Text>
            <Text style={styles.phone}>{order.car.user.phone}</Text>
            <Text style={styles.cityName}>{order.car.user.cityName}</Text>
        </View>
    )
    return (<Fragment>{rows}</Fragment>)
};

export default TableBody