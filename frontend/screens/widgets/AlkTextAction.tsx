import React from "react";
import { StyleSheet, Text, TextStyle, TouchableHighlight, View, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialIcons";
import { appCss } from '../../constants/App.css';
import Colors from "../../constants/Colors.css";

export const AlkTextAction = ({
  text,
  action,
  showIcon = true,
  propStyle,
  propStyleIcon,
}: {
  text: string;
  action: Function;
  showIcon?: boolean;
  propStyle?: ViewStyle;
  propStyleIcon?: TextStyle;
}) => {
  return (
    <TouchableHighlight onPress={() => action()} underlayColor={Colors.grey.lighten4}>
      <View style={[styles.container, propStyle]}>
        <Text style={appCss.subtitle}>{text}</Text>
        {showIcon && (
          <Icon style={propStyleIcon} name="arrow-right" size={35} color={Colors.grey.darken} />
        )}
      </View>
    </TouchableHighlight>
  );
};

const styles = StyleSheet.create({
  container: {
    paddingTop: 10,
    paddingBottom: 10,
    flexDirection: "row",
    justifyContent: "space-between",
    alignItems: "center",
  },
});
