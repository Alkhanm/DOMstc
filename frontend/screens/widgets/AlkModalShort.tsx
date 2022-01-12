import React, { useEffect, useState } from "react";
import {
    Modal,
    ModalProps, StyleSheet,
    TouchableOpacity
} from "react-native";
import ColorsCss from "../../constants/Colors.css";
import LayoutCss from "../../constants/Layout.css";
import { AlkButton } from "./AlkButton";
import { Text, View } from "./Themed";

interface AlkModalShortProps extends ModalProps {
    VisibleElement?: React.FC;
    children: React.ReactNode;
    visibleProp?: boolean;
}

export const AlkModalShort: React.FC<AlkModalShortProps> = ({ VisibleElement, visibleProp, children }) => {
    const [visible, setVisible] = useState(false);

    useEffect(() => {
        if (visibleProp != null) setVisible(visibleProp)
    }, [visibleProp])

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                collapsable={true}
            >
                <TouchableOpacity style={styles.view} onPressIn={() => setVisible(false)} />
                <View style={styles.viewBottom}>
                    <View style={styles.children}>{children}</View>
                    <AlkButton propStyle={styles.buttonClose} onPress={() => setVisible(!visible)}>
                        <Text style={styles.buttonCloseText}>pronto</Text>
                    </AlkButton>
                </View>
            </Modal>
            <View style={styles.buttonOpen} onTouchStart={() => setVisible(true)}>
                {VisibleElement && <VisibleElement />}
            </View>
        </>
    );
};
const isDarkTheme = LayoutCss.isDarkTheme

const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: "100%",
        backgroundColor: "#ffffff20"
    },
    viewBottom: {
        flex: 1,
        width: "100%",
        maxHeight: "40%",
        alignSelf: "flex-end",
        borderRadius: 10,
        padding: 5,
    },
    children: {
        flexGrow: 1,
    },
    buttonOpen: {
        alignItems: "center",
        flexDirection: "row",
        width: "100%",
    },
    buttonClose: {
        width: "80%",
        height: 40,
        justifyContent: "center",
        alignItems: "center",
        padding: 5,
        borderRadius: 10,
    },
    buttonCloseText: {
        textTransform: "uppercase",
        fontWeight: "bold",
        color: ColorsCss.grey.lighten,
        fontSize: 16,
    },
    modalText: {
        color: "black",
        fontSize: 17,
        opacity: 0.6,
        textAlign: "center",
    },
});