import React, { Component } from "react";
import { Text, View, StyleSheet, ActivityIndicator } from "react-native";

class Loading extends Component {
    render() {
        return (
            <View style={styles.container}>
                <ActivityIndicator size="large" color="#0000ff" />
            </View>
        );
    }
}

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: "gray",
        justifyContent: "center",
        alignItems:"center"
    },
});

export default Loading;
