import React, { useEffect, useState } from 'react';
import ReactNative, { Dimensions, GestureResponderEvent, LayoutAnimation, StyleSheet, UIManager, View } from "react-native";
import ColorsCss from "../../constants/Colors.css";
import { ViewProps } from "./Themed";


interface AlkSwipperCardProps {
    defaultHeight: number;
    expanded?: boolean;
    children?: React.ReactNode;
    HeaderComp?: React.FC<ViewProps>;
    MiddleComp?: React.FC<ViewProps>;
    BottomComp?: React.FC<ViewProps>;
}

UIManager.setLayoutAnimationEnabledExperimental(true);

export const AlkSwipperCard: React.FC<AlkSwipperCardProps> = ({
    defaultHeight,
    HeaderComp,
    MiddleComp,
    BottomComp,
    children,
    expanded,
}) => {
    const heightScrenn = Dimensions.get("window").height;
    const expandedHeight = heightScrenn * 0.92;

    const [height, setHeight] = useState(expanded ? expandedHeight : defaultHeight);
    const [showMiddleComp, setShowMidlerComp] = useState<boolean>()

    const handlerTouchMove = (e: GestureResponderEvent) => {
        const heightTouch = e.nativeEvent.pageY;
        const actualHeight = (heightScrenn - heightTouch)
        if (actualHeight > defaultHeight) setHeight(actualHeight);
    };

    const handlerTouchOut = () => {
        if (height > (heightScrenn / 2.5)) setHeight(expandedHeight);
        else setHeight(defaultHeight)
    }

    useEffect(() => {
        if (height > defaultHeight) setShowMidlerComp(true)
        else setShowMidlerComp(false)
    }, [height])

    useEffect(() => {
        LayoutAnimation.configureNext(LayoutAnimation.Presets.linear);
        if (expanded) setHeight(expandedHeight);
        else setHeight(defaultHeight)
    }, [expanded])

    return (
        <View
            style={[
                styles.container,
                { height },
            ]}
        >
            <ReactNative.View onTouchMove={handlerTouchMove}
                onTouchEnd={handlerTouchOut} style={styles.slideView} >
                <View style={styles.slide} >
                </View>
            </ReactNative.View>
            {children}
            {HeaderComp &&
                <View style={styles.headerComp}>
                    <HeaderComp />
                </View>
            }
            {MiddleComp && showMiddleComp &&
                <View style={styles.middleComp}>
                    <MiddleComp />
                </View>
            }
            {BottomComp &&
                <View style={styles.bottomComp}>
                    <BottomComp />
                </View>
            }
        </View>
    );
}
const styles = StyleSheet.create({
    container: {
        flex: 1,
        position: "absolute",
        justifyContent: "space-between",
        width: "100%",
        paddingTop: 15,
        bottom: 0,
        elevation: 10,
        flexWrap: "wrap",
        backgroundColor: "#000000"
    },
    slideView: {
        top: 0,
        width: "100%",
        height: 15,
        position: "absolute",
        alignSelf: "center",
        fontSize: 20,
        marginBottom: 10,
        justifyContent: "center",
        alignItems: "center"
    },
    slide: {
        backgroundColor: ColorsCss.grey.lighten,
        borderRadius: 10,
        height: 10,
        width: 105,
        padding: 5
    },
    headerComp: {
        justifyContent: "flex-start",
        opacity: 1
    },
    middleComp: {
        flex: 1,
        backgroundColor: ColorsCss.grey.darken3,
    },
    bottomComp: {
        justifyContent: "flex-end",
    },
})