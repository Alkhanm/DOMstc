import React from "react";
import { Appearance, StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
import Colors from "../../constants/Colors.css";

interface MvButtonProps extends TouchableOpacityProps {
  isTouchable?: boolean;
  children: React.ReactNode;
  propStyle?: ViewStyle | ViewStyle[];
}

export const AlkButton = ({ children, isTouchable = true, propStyle, ...rest }: MvButtonProps) => {
  return (
    <TouchableOpacity
      style={[isTouchable ? styles.button : styles.buttonDisabled, propStyle]}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    minWidth: 100,
    backgroundColor: Appearance.getColorScheme() === "dark" ? Colors.grey.darken4 : Colors.grey.c,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
    borderRadius: 10
  },
  buttonDisabled: {
    backgroundColor: Colors.grey.lighten3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
  },
});
