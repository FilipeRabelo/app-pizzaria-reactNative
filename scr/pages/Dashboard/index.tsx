
import React, { useContext } from "react";
import { View, Text, StyleSheet, Button } from "react-native"

import { AuthContext } from "../../contexts/AuthContext"


export default function Dashboard() {

  const { signOut } = useContext(AuthContext)

  return (
    
    <View style={styles.container}>
      <Text style={styles.text}>Seja bem vindo</Text>
      <Text style={styles.text}>Tela de Dashboard</Text>

      <Button
        title="Sair do App"
        onPress={signOut}
      />
    </View>
  )
}





const styles = StyleSheet.create({
  container: {
    backgroundColor: "#1d1d2e",
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
  },
  text: {
    color: '#FF7300',
    fontSize: 24,
    fontWeight: "bold",
    marginVertical: 16,
    paddingVertical: 16,
    width: '90%',
    backgroundColor: "#101026",
    textAlign: "center",
    borderRadius: 8
  },
})