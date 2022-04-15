import { MaterialCommunityIcons } from "@expo/vector-icons";
import React, { useState } from "react";
import { KeyboardAvoidingView, StyleSheet, TextInput, TextInputProps, ViewStyle } from "react-native";
import Icon from "react-native-vector-icons/MaterialCommunityIcons";
import Colors from "../../constants/Colors.css";
import Layout from "../../constants/Layout.css";
import { Text, View } from "./Themed";

interface AlkInputProps extends TextInputProps {
  value: string;
  placeholder: string;
  icon: React.ComponentProps<typeof MaterialCommunityIcons>["name"];
  editable?: boolean;
  iconSize?: number;
  style?: ViewStyle | ViewStyle[];
}

const isDarkTheme = Layout.isDarkTheme

export const AlkInput: React.FC<AlkInputProps> = ({
  value,
  placeholder,
  icon,
  style,
  editable = true,
  iconSize,
  children,
  ...rest
}) => {

  const [isTyping, setIsTyping] = useState<boolean>(false);

  const iconColor = (): string => {
    if (isDarkTheme) return isTyping ? "white" : Colors.grey.c;
    return isTyping ? Colors.blue.c : Colors.grey.darken;
  };

  return (
    <KeyboardAvoidingView behavior="height" style={[styles.container, isTyping ? styles.containerFocus : {}, style]}>
      <View style={styles.cardIcon}>
        <Icon name={icon} size={iconSize || 25} color={iconColor()} style={styles.icon} />
      </View>
      <View style={styles.cardInput}>
        <View>
          {(isTyping || Boolean(value)) && (
            <Text style={[styles.placeholderInfo, isTyping && styles.placeholderSelected]}>{placeholder.toUpperCase()}</Text>
          )}
        </View>
        <TextInput
          value={value}
          editable={editable}
          onFocus={() => setIsTyping(true)}
          onBlur={() => setIsTyping(false)}
          style={styles.input}
          placeholderTextColor={"#E0E0E060"}
          placeholder={isTyping ? "" : placeholder}
          {...rest}
        />
      </View>
      <View style={styles.cardIcon}>{children}</View>
    </KeyboardAvoidingView>
  );
};

const styles = StyleSheet.create({
  container: {
    alignSelf: "center",
    marginBottom: 8,
    flexDirection: "row",
    height: 60,
    padding: 5,
    borderBottomWidth: 0.2,
    borderColor: isDarkTheme ? "#eee" : Colors.grey.lighten2,
  },
  icon: {
    marginHorizontal: 5,
  },
  placeholderInfo: {
    opacity: 0.9,
    fontSize: 12,
    fontWeight: "bold",
    color: isDarkTheme ? "white" : Colors.blue.darken2,
  },
  placeholderSelected: {
    fontSize: 14,
  },
  input: {
    fontSize: 15,
    color: isDarkTheme ? "white" : "black",
    width: "95%",
  },
  cardInput: {
    flex: 1,
    justifyContent: "space-between",
  },
  cardIcon: {
    justifyContent: "flex-end",
  },
  containerFocus: {
    elevation: 1,
    shadowRadius: 10,
    shadowColor: Colors.grey.lighten,
    backgroundColor: isDarkTheme ? Colors.grey.darken4 : "#fff",
    borderBottomWidth: 2.5,
    borderColor: isDarkTheme ? Colors.grey.darken : Colors.blue.lighten2,
  },
});