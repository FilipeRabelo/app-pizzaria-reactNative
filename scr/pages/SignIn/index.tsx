
import React, { useState, useContext } from "react";
import { View, Text, StyleSheet, Image, TextInput, TouchableOpacity, ActivityIndicator } from 'react-native';

import { AuthContext } from '../../contexts/AuthContext'

// component

export default function SignIn() {

  const { signIn, loadingAuth } = useContext(AuthContext);

  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  

  async function handleLogin() {                        // função para renderizar a porra toda

    if (email === '' || password === '') {
      return;
    }

    await signIn({ email, password });
  }
  

  return (
    <View style={styles.container}>

      <Image
        style={styles.logo}
        source={require('../../assets/logoBrasa.png')}
      />

      <View style={styles.inputContainer}>
        <TextInput
          placeholder="Digite seu e-mail"
          value={email}                                 // TODA VEZ Q DIGITAR ALGO NO INPUT CHAMA O onChargeText
          onChangeText={setEmail}                       // onChargeText pega e coloca dentro do useState
          // onChangeText={(text) => setEmail}  
          style={styles.input}
          placeholderTextColor={'#848484'}
        />

        <TextInput
          placeholder="Digite sua senha"
          secureTextEntry={true}                        // PARA MASCARAR A SENHA
          value={password}                              // TODA VEZ Q DIGITAR ALGO NO INPUT CHAMA O onChargeText
          onChangeText={setPassword}                    // onChargeText pega e coloca dentro do useState
          // onChangeText={(text) => setPassword}
          style={styles.input}
          placeholderTextColor={'#848484'}
        />

        <TouchableOpacity style={styles.button} onPress={handleLogin}>

          {loadingAuth? (
            <ActivityIndicator size={"large"} color={'#DC143C'}/>
          ) : (

          <Text style={styles.buttonText}>Acessar</Text>
          )}

        </TouchableOpacity>

      </View>

    </View>
  )
}


const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#1d1d2e'
  },

  logo: {
    marginBottom: -15,
    height: 80
  },

  inputContainer: {
    width: '90%',
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 34,
    paddingHorizontal: 14,

    // borderWidth: 1,
    // borderColor: "red",
    // borderStyle: "solid",
  },

  input: {
    width: '95%',
    height: 45,
    backgroundColor: '#101026',
    marginBottom: 10,
    borderRadius: 8,
    paddingHorizontal: 8,
    color: '#fff',
    fontWeight: 'bold',
  },

  button: {
    width: '95%',
    height: 40,
    // backgroundColor: "#3fffa3",
    borderRadius: 8,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    backgroundColor: "#39FF14",
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#101026'
  }
})