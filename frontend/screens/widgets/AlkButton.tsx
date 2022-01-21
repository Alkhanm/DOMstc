import React from "react";
import { Appearance, StyleSheet, TouchableOpacity, TouchableOpacityProps } from "react-native";
import Colors from "../../constants/Colors.css";

interface MvButtonProps extends TouchableOpacityProps {
  children: React.ReactNode;
  disabled?: boolean;
}

export const AlkButton = ({ disabled, children, ...rest }: MvButtonProps) => {
  return (
    <TouchableOpacity  {...rest} style={[styles.button, rest.style]} >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  button: {
    width: 100,
    height: 50,
    backgroundColor: Appearance.getColorScheme() === "dark" ? Colors.grey.darken4 : Colors.grey.c,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
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
