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
      style={[isTouchable ? styles.mvButton : styles.mvButtonDisabled, propStyle]}
      {...rest}
    >
      {children}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  mvButton: {
    minWidth: 100,
    backgroundColor: Appearance.getColorScheme() === "dark" ? "rgba(255,255,255,0.1)" : Colors.grey.lighten3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
    borderRadius: 10
  },
  mvButtonDisabled: {
    backgroundColor: Colors.grey.lighten3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
  },
});
