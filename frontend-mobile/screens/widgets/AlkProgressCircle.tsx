import React from 'react';
import { StyleSheet, View } from 'react-native';
import { appCss } from "../../constants/App.css";
import ColorsCss from "../../constants/Colors.css";
import { Text } from "./Themed";

const propStyle = (percent: number, base_degrees: number) => {
    const rotateBy = base_degrees + (percent * 3.6);
    return { transform: [{ rotateZ: `${rotateBy}deg` }] }
}

const renderThirdLayer = (percent: number) => {
    if (percent > 50) return <View style={[styles.secondProgressLayer, propStyle((percent - 50), 45)]}></View>
    else return <View style={styles.offsetLayer}></View>
}

export const AlkCircularProgress = ({ percent, label }: { percent: number, label: string }) => {
    let firstProgressLayerStyle;
    if (percent > 50) firstProgressLayerStyle = propStyle(50, -135);
    else firstProgressLayerStyle = propStyle(percent, -135);

    return (
        <View style={styles.container}>
            <View style={[styles.firstProgressLayer, firstProgressLayerStyle]}></View>
            {renderThirdLayer(percent)}
            <View style={styles.display}>
                <Text style={appCss.infoText}>{label}</Text>
                <Text style={{ fontSize: 40, fontWeight: "bold" }}>{percent}%</Text>
            </View>
        </View>
    );
}

const styles = StyleSheet.create({
    container: {
        width: 200,
        height: 200,
        borderWidth: 15,
        borderRadius: 100,
        borderColor: ColorsCss.red.accent2,
        justifyContent: 'center',
        alignItems: 'center'
    },
    firstProgressLayer: {
        width: 200,
        height: 200,
        borderWidth: 15,
        borderRadius: 100,
        position: 'absolute',
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: ColorsCss.blue.darken2,
        borderTopColor: ColorsCss.blue.darken2,
        transform: [{ rotateZ: '-135deg' }]
    },
    secondProgressLayer: {
        width: 200,
        height: 200,
        position: 'absolute',
        borderWidth: 15,
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: ColorsCss.blue.darken2,
        borderTopColor: ColorsCss.blue.darken2,
        transform: [{ rotateZ: '45deg' }]
    },
    offsetLayer: {
        width: 200,
        height: 200,
        position: 'absolute',
        borderWidth: 15,
        borderRadius: 100,
        borderLeftColor: 'transparent',
        borderBottomColor: 'transparent',
        borderRightColor: ColorsCss.red.accent2,
        borderTopColor: ColorsCss.red.accent2,
        transform: [{ rotateZ: '-135deg' }]
    },
    display: {
        alignItems: "center",
        position: "absolute",

    }
});