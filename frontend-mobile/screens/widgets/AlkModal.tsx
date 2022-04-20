import React, { useEffect, useState } from "react";
import {
    Dimensions, Modal,
    ModalProps, Pressable, StyleSheet, View, ViewProps
} from "react-native";
import { appCss } from "../../constants/App.css";
import ColorsCss from "../../constants/Colors.css";
import { NumericRange } from "../../domain/interfaces/Utils";
import * as Themed from "./Themed";

interface AlkModalShortProps extends ModalProps {
    children: React.ReactNode;
    VisibleElement?: React.FC<ViewProps>;
    isVisible?: boolean;
    width?: NumericRange<101>;
    height?: NumericRange<101>;
}

export const AlkModal: React.FC<AlkModalShortProps> = ({ children, VisibleElement, width, height, isVisible = false }) => {
    const [visible, setVisible] = useState(isVisible);

    useEffect(() => {
        setVisible(isVisible);
    }, [isVisible])

    return (
        <>
            <Modal
                animationType="slide"
                transparent={true}
                visible={visible}
                collapsable={true}
                statusBarTranslucent
            >
                <View onTouchStart={_ => setVisible(false)} style={styles.view} >
                    <Themed.View
                        onTouchStart={e => e.stopPropagation()}
                        style={[
                            styles.children,
                            Boolean(width) && Boolean(height) &&
                            {
                                width: `${width}%`,
                                height: `${height}%`
                            }]}
                    >
                        {children}
                        <Pressable style={styles.buttonClose} onPress={() => setVisible(!visible)}>
                            <Themed.Text style={appCss.subtitle} selectionColor={"black"} selectable >Pronto</Themed.Text>
                        </Pressable>
                    </Themed.View>
                </View>
            </Modal>
            {VisibleElement &&
                <View style={styles.visibleElement} onTouchEnd={() => setVisible(true)}>
                    <VisibleElement />
                </View>
            }
        </>
    );
};
const { height, width } = Dimensions.get("window")
const styles = StyleSheet.create({
    view: {
        flex: 1,
        width: "100%",
        height: height,
        position: "absolute",
        bottom: 0,
        justifyContent: "center",
        alignItems: "center",
        backgroundColor: "#00000085",
        alignSelf: "flex-end",
        borderRadius: 10,
        padding: 5,
    },
    children: {
        width: 300,
        justifyContent: "space-between",
        paddingTop: 10,
        alignItems: "center",
    },
    buttonClose: {
        width: "100%",
        justifyContent: "center",
        alignItems: "center",
        height: "10%",
        minHeight: 50,
        borderTopWidth: 2,
        borderColor: ColorsCss.grey.darken4,
        backgroundColor: "#000000"
    },
    visibleElement: {
        justifyContent: "center",
        alignItems: "center"
    }
});