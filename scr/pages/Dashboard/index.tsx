
import React, { useState } from "react";
import { SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import { api } from '../../services/api';



export default function Dashboard() {

  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();    // para navegar 

  const [number, setNumber] = useState('');               
  const [name, setName] = useState('');                                             // o value do textinput vai estar atrelado ao number         
  const [loading, setLoading] = useState(false);                                    // LOADING - estado para controlar o icone de carregamento




  async function openOrder() {                    // FUNCAO ABRIR PEDIDO            // sempre q abir uma mesa chama essa fucnao

    if (number === '') {
      alert("Digite o numero da mesa...");
      return;
    }

    setLoading(true); // Começa o carregamento

    try {

      const response = await api.post('/order', {
        table: Number(number),
        name: name
      });

      console.log(response.data);
      navigation.navigate('Order', { number: number, name: name, orderId: response.data.id });     // foi tipado em app.routes.tsx

      // Limpa os campos após o envio
      setNumber('');
      setName('');

    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao abrir a mesa.");

    } finally {
      setLoading(false);                        // Para o carregamento
    }
  }



  return (
    <SafeAreaView style={styles.container}>
      <Text style={styles.title}>Novo pedido</Text>

      <TextInput
        style={styles.input}
        placeholder="Numero da mesa"
        placeholderTextColor={'#848484'}
        keyboardType="numeric"
        value={number}                                                          // o value do textinput vai estar atrelado ao setState number
        onChangeText={setNumber}                                                // toda ves q digitar o number vai estar atrelado a setNumber
      />

      <TextInput
        style={styles.input}
        placeholder="Nome Cliente (Opcional)"
        placeholderTextColor={'#848484'}
        value={name}                              
        onChangeText={setName}
      />

      <TouchableOpacity onPress={openOrder} style={styles.button} disabled={loading}>
        {loading ? (
          <ActivityIndicator size="large" color="#DC143C" />
        ) : (
          <Text style={styles.buttonText}>Abrir Mesa</Text>
        )}
      </TouchableOpacity>
    </SafeAreaView>
  );
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
});




// import React, { useState, useContext } from "react";
// import { SafeAreaView, Text, StyleSheet, TouchableOpacity, TextInput, ActivityIndicator } from "react-native";   // SafeAreaView é utilizado pelo iPhone
// import { useNavigation } from "@react-navigation/native";                                     // para navegar na pagina  
// import { NativeStackNavigationProp } from "@react-navigation/native-stack";
// import { StackParamsList } from "../../routes/app.routes";
// import { api } from '../../services/api';




// export default function Dashboard() {

//   const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();  // para navegar na pagina         

//   const [number, setNumber] = useState('');                                        // o value do textinput vai estar atrelado ao number
//   const [name, setName] = useState('');                                            // opicional


//   const [loading, setLoading] = useState(false); // Novo estado para controlar o carregamento


//   async function openOrder() {                   // FUNCAO ABRIR PEDIDO            // sempre q abir uma mesa chama essa fucnao

//     if (number === '') {
//       alert("Digite o numero da mesa...")
//       return;                                                                      // return para parar 
//     }
    
//     const response = await api.post('/order', {  // post - cadastrar  // antes de enviar para a outra tela, precisa fazer requisicao http
//       table: Number(number),                                          // transformando string em number
//       name: name
//     })

//     console.log(response.data)

//     // precisar fazer a requisição e abrir a mesa e navegar para a próxima tela (order)
//     navigation.navigate('Order', { number: number, nameClient: name, orderId: response.data.id }); // precisa tipar o parametro para o type script

//     setNumber('')                                                     // para limpar o campo apos o envio - post - cadastro
//     setName('')
//   }



//   return (

//     <SafeAreaView style={styles.container}>

//       <Text style={styles.title}>Novo pedido</Text>

//       <TextInput
//         style={styles.input}
//         placeholder="Numero da mesa"
//         placeholderTextColor={'#848484'}
//         keyboardType="numeric"
//         value={number}                                                         // o value do textinput vai estar atrelado ao setState number
//         onChangeText={setNumber}                                               // toda ves q digitar o number vai estar atrelado a setNumber
//       />

//       <TextInput
//         style={styles.input}
//         placeholder="Nome Cliente (Opcional)"
//         placeholderTextColor={'#848484'}
//         value={name}
//         onChangeText={setName}
//       />

//       <TouchableOpacity onPress={openOrder} style={styles.button} >
//         <Text style={styles.buttonText}>Abrir Mesa</Text>
//       </TouchableOpacity>

//     </SafeAreaView>

//     /* sempre q clicar no botao chama a funcao  openOrder */
//   )
// }




// const styles = StyleSheet.create({

//   container: {
//     flex: 1,
//     justifyContent: "center",
//     alignItems: "center",
//     paddingVertical: 15,
//     backgroundColor: "#1d1d2e",
//   },

//   title: {
//     fontSize: 34,
//     fontWeight: "bold",
//     color: '#fff',
//     marginBottom: 24,
//     textAlign: "center",
//   },

//   input: {
//     width: '90%',
//     height: 60,
//     backgroundColor: '#101026',
//     borderRadius: 6,
//     marginVertical: 8,
//     paddingHorizontal: 8,
//     textAlign: 'center',
//     color: '#fff',
//     fontSize: 22,

//   },

//   button: {
//     width: '90%',
//     height: 50,
//     color: '#fff',
//     backgroundColor: '#0bd90b',
//     borderRadius: 6,
//     marginVertical: 12,
//     justifyContent: 'center',
//     alignItems: 'center',
//   },

//   buttonText: {
//     fontSize: 20,
//     color: "#101026",
//     fontWeight: 'bold',
//   }

// })