import React from "react";
import {
  Modal,
  ModalProps, StyleSheet,
  Text, View
} from "react-native";
import Colors from "../../constants/Colors.css";
import LayoutCss from "../../constants/Layout.css";
import { AlkButton } from "../widgets/AlkButton";

interface AlkModalProps extends ModalProps {
  VisibleElement?: React.FC;
  visible: boolean;
  children: React.ReactNode;
}

export const AlkModal: React.FC<AlkModalProps> = ({ VisibleElement, visible, children }) => {

  return (
    <>
      <Modal
        animationType="slide"
        transparent={true}
        visible={visible}
        collapsable={true}
      >
        <View style={[styles.view, styles.viewBottom]}>
          <View style={styles.children}>{children}</View>
          <AlkButton propStyle={styles.buttonClose} onPress={() => {}}>
            <Text style={styles.buttonCloseText}>PRONTO</Text>
          </AlkButton>
        </View>
      </Modal>
      <View style={styles.buttonOpen} onTouchStart={() => {}}>
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
  },
  viewBottom: {
    alignSelf: "flex-end",
    backgroundColor: isDarkTheme ? "black" : Colors.grey.lighten4,
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
    height: "6%",
    justifyContent: "center",
    alignItems: "center",
    padding: 5,
    borderRadius: 10,
  },
  buttonCloseText: {
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
