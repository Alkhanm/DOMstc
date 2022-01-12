import { useEffect, useRef, useState } from "react";
import { Animated, StyleSheet } from "react-native";
import ColorsCss from "../../constants/Colors.css";
import { View } from "./Themed";

export const AlkLoadingBar: React.FC = () => {
    const counter = useRef(new Animated.Value(0)).current;
    const countInterval = useRef(0);
    const [count, setCount] = useState(0);


    const load = (count: number) => {
        Animated.timing(counter, {
            toValue: count,
            duration: 100,
            useNativeDriver: true,
        }).start();
    };

    useEffect(() => {
        load(count)
        if (count > 100) {
            setCount(0);
            clearInterval(countInterval);
        }
        return () => clearInterval(countInterval);
    }, [count]);

    useEffect(() => {
        countInterval.current = setInterval(() => setCount((old) => old + 1), 10);
        return () => clearInterval(countInterval);
    }, []);
    return (
        <View style={styles.loadingView} >
            <Animated.View style={[StyleSheet.absoluteFill, { backgroundColor: ColorsCss.blue.c, width: `${count}%` }]} />
        </View>
    );
}

const styles = StyleSheet.create({
    loadingView: {
        height: 10,
        flexDirection: "row",
        width: '100%',
        backgroundColor: 'white',
        borderColor: '#000',
        borderWidth: 2,
        borderRadius: 5
    }
})