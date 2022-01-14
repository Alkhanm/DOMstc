import React, { useEffect, useState } from "react";
import {
  Modal, StyleSheet, ViewStyle
} from "react-native";
import { default as Colors, default as ColorsCss } from "../../constants/Colors.css";
import LayoutCss from "../../constants/Layout.css";
import { AlkButton } from "../widgets/AlkButton";
import { ViewProps } from "../widgets/Themed";
import { Text, View } from "./Themed";

interface styleProps extends ViewStyle {
  childrenStyle?: ViewStyle;
}

interface AlkModalProps extends ViewProps {
  buttonCloseText?: string;
  children: React.ReactNode;
  visibleProp?: boolean;
  VisibleElement?: React.FC<ViewProps>;
  viewStyle?: styleProps;
}

export const AlkModal: React.FC<AlkModalProps> = ({ children, VisibleElement, buttonCloseText, viewStyle, visibleProp = null, ...rest }) => {
  const [visible, setVisible] = useState(false);

  const handleClickToOPen = () => {
    setVisible(true);
  }

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
        onTouchStart={handleClickToOPen}
      >
        <View style={styles.view} {...viewStyle}>
          <View style={styles.children} {...viewStyle?.childrenStyle}>
            {children}
          </View>
          <AlkButton propStyle={styles.buttonClose} onPress={() => setVisible(!visible)}>
            <Text style={styles.buttonCloseText}>{buttonCloseText || "pronto"}</Text>
          </AlkButton>
        </View>
      </Modal>
      {VisibleElement &&
        <View onTouchStart={handleClickToOPen} style={rest.style}>
          <VisibleElement />
        </View>
      }
    </>
  );
};
const isDarkTheme = LayoutCss.isDarkTheme

const styles = StyleSheet.create({
  view: {
    flex: 1,
    width: "100%",
    alignSelf: "flex-end",
    backgroundColor: isDarkTheme ? "#000000" : Colors.grey.lighten4,
    borderRadius: 10,
    padding: 5,
  },
  children: {
    flexGrow: 1,
  },
  modalLoading: {
    color: ColorsCss.blue.c,
    backgroundColor: ColorsCss.blue.c,
    borderBottomWidth: 5,
  },
  buttonClose: {
    width: "80%",
    height: "6%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
  buttonCloseText: {
    textTransform: "uppercase",
    fontWeight: "bold",
    color: Colors.grey.lighten,
    fontSize: 16,
  },
  modalText: {
    color: "black",
    fontSize: 17,
    opacity: 0.6,
    textAlign: "center",
  },
});