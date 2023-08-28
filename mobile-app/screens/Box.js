
import React, { useEffect, useState } from 'react';
import { View, Text, StyleSheet, TouchableOpacity, ScrollView } from 'react-native';
function Box({ isBooked, isSelected, toggleSeatSelection, seatNumber }) {
    return (
        <TouchableOpacity

            style={[
                styles.seat,
                isBooked ? styles.bookedSeat : null,
                isSelected ? styles.green : null,
            ]}
            disabled={isBooked}
            onPress={() => toggleSeatSelection(seatNumber)}
        >
            <Text style={[styles.seatNumber, isBooked ? styles.white : null, isSelected ? styles.white : null]}>{seatNumber}</Text>
        </TouchableOpacity>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        padding: 16,
        justifyContent: 'center',
        alignItems: 'center',
    },
    seatRow: {
        flexDirection: 'row',
        marginBottom: 16,
    },
    seat: {
        width: 60,
        height: 60,
        marginRight: 16,
        justifyContent: 'center',
        alignItems: 'center',
        borderWidth: 1,
        borderColor: '#000',
    },
    bookedSeat: {
        backgroundColor: 'red',

    },
    seatNumber: {
        fontSize: 16,
    },
    white: {
        color: 'white'
    },
    green: {
        backgroundColor: 'green'
    }

});

export default Box;