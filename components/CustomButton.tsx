import { Button, Pressable, StyleSheet, View, Text } from "react-native";
import { lightGreen50 } from "react-native-paper/lib/typescript/styles/colors";

const CustomButton = ({children, onPress}) => {
  return <Pressable onPress={onPress} style={styles.customButton}><Text>{children}</Text></Pressable>
}

const styles = StyleSheet.create({
  customButton: {
    backgroundColor: 'lightgreen',
    height: 50,
    width: "90%",
    marginVertical: 20,
    marginHorizontal: 5,
    borderRadius: 10,
    justifyContent: "center",
    alignItems: "center",
  }
})

export default CustomButton
