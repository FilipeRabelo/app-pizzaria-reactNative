import React from "react";
import {View, Text, StyleSheet} from "react-native"

export default function Dashboard(){
  return(
    <View style={styles.container}>
      <Text>Tela de Dashboard</Text>
    </View>
  )
}

const styles = StyleSheet.create({
  container:{
    backgroundColor: "#1d1d2e",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  }
})