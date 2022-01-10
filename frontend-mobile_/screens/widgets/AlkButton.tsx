import React from "react";
import { StyleSheet, TouchableOpacity, TouchableOpacityProps, ViewStyle } from "react-native";
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
    width: 100,
    backgroundColor: Colors.blue.c,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
  },
  mvButtonDisabled: {
    backgroundColor: Colors.grey.lighten3,
    justifyContent: "center",
    alignItems: "center",
    alignSelf: "center",
    padding: 5,
  },
});
