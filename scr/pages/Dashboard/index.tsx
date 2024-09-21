
import React, { useState, useContext } from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput } from "react-native";   // SafeAreaView é utilizado pelo iPhone
import { useNavigation } from "@react-navigation/native"                                      // para navegar na pagina  
import { NativeStackNavigationProp } from "@react-navigation/native-stack"
import { StackParamsList } from "../../routes/app.routes"



export default function Dashboard() {

  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();  // para navegar na pagina         
 
  const [number, setNumber] = useState('');                                        // o value do textinput vai estar atrelado ao number
  const [nameClient, setNameClient] = useState('');                                // opicional



  async function openOrder() {                                                     // sempre q abir uma mesa chama essa fucnao

    if (number === '') {
      alert("Digite o numero da mesa...")
      return;                                                                       // return para parar 
    }

    // precisar fazer a requisição e abrir a mesa e navegar para a próxima tela (order)

    navigation.navigate('Order', { number: number, nameClient: nameClient, orderId: '5fe33002-369e-4e13-b69a-6163ec90380d' }); // precisa tipar o parametro para o type script
  }

  return (

    <SafeAreaView style={styles.container}>

      <Text style={styles.title}>Novo pedido</Text>

      <TextInput
        style={styles.input}
        placeholder="Numero da mesa"
        placeholderTextColor={'#848484'}
        keyboardType="numeric"
        value={number}                                                         // o value do textinput vai estar atrelado ao setState number
        onChangeText={setNumber}                                               // toda ves q digitar o number vai estar atrelado a setNumber
      />

      <TextInput
        style={styles.input}
        placeholder="Nome Cliente (Opcional)"
        placeholderTextColor={'#848484'}
        value={nameClient}
        onChangeText={setNameClient}
      />

      <TouchableOpacity onPress={openOrder} style={styles.button} >
        <Text style={styles.buttonText}>Abrir Mesa</Text>
      </TouchableOpacity>

    </SafeAreaView>

    /* sempre q clicar no botao chama a funcao  openOrder */
  )
}




const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    paddingVertical: 15,
    backgroundColor: "#1d1d2e",
  },

  title: {
    fontSize: 34,
    fontWeight: "bold",
    color: '#fff',
    marginBottom: 24,
    textAlign: "center",
  },

  input: {
    width: '90%',
    height: 60,
    backgroundColor: '#101026',
    borderRadius: 6,
    marginVertical: 8,
    paddingHorizontal: 8,
    textAlign: 'center',
    color: '#fff',
    fontSize: 22,

  },

  button: {
    width: '90%',
    height: 50,
    color: '#fff',
    backgroundColor: '#0bd90b',
    borderRadius: 6,
    marginVertical: 12,
    justifyContent: 'center',
    alignItems: 'center',
  },

  buttonText: {
    fontSize: 20,
    color: "#101026",
    fontWeight: 'bold',
  }

})