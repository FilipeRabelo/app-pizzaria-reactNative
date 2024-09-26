
import React, { useState, useContext } from "react";
import Modal from "react-native-modal";
import { api } from '../../services/api';
import { useNavigation } from "@react-navigation/native";
import { NativeStackNavigationProp } from "@react-navigation/native-stack";
import { StackParamsList } from "../../routes/app.routes";
import {AuthContext} from '../../contexts/AuthContext'
import { 
  View, 
  SafeAreaView, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  ActivityIndicator,   
} from "react-native";

export default function Dashboard() {

  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();    // para navegar   
  
  const [number, setNumber] = useState('');               
  const [name, setName] = useState('');                                             // o value do textinput vai estar atrelado ao number         
  
  const [loading, setLoading] = useState(false);                                    // LOADING - estado para controlar o icone de carregamento

  // estado que controla o modal de DIGITE UMA MESA
  const [isModalVisible, setModalVisible] = useState(false);
  const [modalMessage, setModalMessage] = useState("");

  // FUNCAO ABRIR PEDIDO
  async function openOrder() {                           // FUNCAO ABRIR PEDIDO     // sempre q abir uma mesa chama essa fucnao

    // modal de DIGITE UMA MESA
    if (number === "") {
      setModalMessage("Digite o número da mesa...");
      setModalVisible(true);
      return;
    }

    setLoading(true);                                    // Começa o carregamento

    try {
      const response = await api.post('/order', {       // requisicao para cadastrar  
              
        table: Number(number),
        name: name
      });

      navigation.navigate('Order', { number: number, name: name, order_id: response.data.id });     // foi tipado em app.routes.tsx

      setNumber('');                                    // Limpa os campos após o envio
      setName('');

    } catch (error) {
      console.error(error);
      alert("Ocorreu um erro ao abrir a mesa.");

    } finally {
      setLoading(false);                                // Para o carregamento
    }
  }

  // butao para sair para o logim
  const [modalLogoutVisible, setModalLogoutVisible] = useState<boolean>(false);

  const { signOut } = useContext(AuthContext);

  // Abre o modal ao pressionar "Sair"
  const handleLogout = () => {
    setModalLogoutVisible(true);
  };

  // Confirmação de logout
  const confirmLogout = async () => {
    await signOut(); // Chama a função de logout
    setModalLogoutVisible(false); // Fecha o modal
  };

  // Cancela o logout
  const cancelLogout = () => {
    setModalLogoutVisible(false); // Apenas fecha o modal
  };


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


      {/* Modal personalizado DIGITE UMA MESA */}
      <Modal
        isVisible={isModalVisible}
        onBackdropPress={() => setModalVisible(false)}
      >
        <View style={styles.modalContent}>

          <Text style={styles.modalText}>{modalMessage}</Text>

          <TouchableOpacity onPress={() => setModalVisible(false)} style={styles.modalButton}>
            <Text style={styles.modalButtonText}>Fechar</Text>
          </TouchableOpacity>

        </View>
      </Modal>

      
      {/* Modal personalizado LOGOUT */}
      <TouchableOpacity style={styles.logoutButton} onPress={handleLogout}>
        <Text style={styles.logoutButtonText}>Sair</Text>
      </TouchableOpacity>

        {/* // Modal de Logout */}
      <Modal
        isVisible={modalLogoutVisible} // Usando isVisible para controle do modal
        onBackdropPress={cancelLogout} // Fecha o modal ao clicar fora
        style={styles.modalLogout} // Estilo do modal
      >
        <View style={styles.modalContentLogout}>
          <Text style={styles.modalTextLogout}>Você realmente deseja sair?</Text>
          <View style={styles.buttonContainerLogout}>
            <TouchableOpacity style={styles.confirmButtonLogout} onPress={confirmLogout}>
              <Text style={styles.buttonTextLogout}>Sim</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.cancelButtonLogout} onPress={cancelLogout}>
              <Text style={styles.buttonTextLogout}>Não</Text>
            </TouchableOpacity>
          </View>
        </View>
      </Modal>

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
  },

  // modal para obraigar a digitar uma mesa
  modalOverlay: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContent: {
    backgroundColor: "#fff",
    padding: 20,
    borderRadius: 6,
    alignItems: "center",
  },

  modalText: {
    fontSize: 20,
    marginBottom: 20,
    fontWeight: "bold",
  },

  modalButton: {
    backgroundColor: "#0bd90b",
    padding: 10,
    borderRadius: 6,
    width: '50%',
    justifyContent: "center",
    alignItems: "center",
  },

  modalButtonText: {
    fontSize: 18,    
    color: "#000",
    fontWeight: "bold",
  },

  // Botão de logout
  logoutButton: {
    width: '90%',
    height: 50,
    padding: 10,
    backgroundColor: '#DC143C', // Cor do botão de logout
    borderRadius: 5,
    marginVertical: 12,
    textAlign: 'center',
    justifyContent: 'center',
  },
  logoutButtonText: {
    fontSize: 20,
    color: '#000',
    fontWeight: 'bold',
    textAlign: 'center',
  },

  // Estilo do modal de logout
  modalLogout: {
    width: '90%',
    justifyContent: 'center',
    alignItems: 'center',
  },

  modalContentLogout: {
    width: '100%',
    padding: 20,
    backgroundColor: '#fff',
    borderRadius: 10,
    alignItems: 'center',
    elevation: 5, // Sombra no Android
    shadowColor: '#000', // Sombra no iOS
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.3,
    shadowRadius: 4,
  },

  modalTextLogout: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },

  buttonContainerLogout: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    width: '100%',
  },

  confirmButtonLogout: {
    backgroundColor: '#0bd90b', // Cor do botão "Sim"
    padding: 10,
    borderRadius: 5,
    flex: 1,
    marginRight: 10,
  },

  cancelButtonLogout: {
    backgroundColor: '#f44336', // Cor do botão "Não"
    padding: 10,
    borderRadius: 5,
    flex: 1,
  },

  buttonTextLogout: {
    textAlign: 'center',
    color: '#000',
    fontWeight: 'bold',
    fontSize: 18
  },
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