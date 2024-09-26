
import React, { useState } from "react";
import { View, Text, StyleSheet, TouchableOpacity, Modal } from 'react-native';
import { Feather } from '@expo/vector-icons'

import { useNavigation, useRoute, RouteProp } from '@react-navigation/native';    // para receber os parametros
import { NativeStackNavigationProp } from '@react-navigation/native-stack'
import { StackParamsList } from '../../routes/app.routes'

import { api } from '../../services/api';

type RouterDetailParams = {

  FinishOrder: {
    number: string | number,
    order_id: string,
    name: string
  }
}

// tipagem do UseRoute()  // propriedade do RouteProps recebendo a tipagem
type FinishOrderRouterProps = RouteProp<RouterDetailParams, 'FinishOrder'>


export default function FinishOrder() {

  const route = useRoute<FinishOrderRouterProps>()      // route recebe esse tipo - FinishOrderRouterProps
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();

  // modal de finalizao do pedido
  const [modalVisible, setModalVisible] = useState(false); // Estado para controlar a visibilidade do modal


  async function handleFinish() {

    try {

      await api.put('/order/send', {
        order_id: route.params?.order_id
      })

      setModalVisible(true); // Exibe o modal de sucesso
      // navigation.popToTop();                            // popToTop() - volta la no inicio da tela

    } catch (err) {
      console.log('erro ao finalizar' + err)
    }
  }


  return (
    <View style={styles.container}>

      <Text style={styles.alert}>Você Deseja Finalizar esse Pedido?</Text>
      <Text style={styles.title}>
        Mesa: {route.params?.number}
      </Text>

      <TouchableOpacity onPress={handleFinish} style={styles.button}>
        <Text style={styles.textButton}>Finalizar Pedido</Text>
        <Feather
          name='shopping-cart' size={20} color='#1d1d2e'
        />
      </TouchableOpacity>



      {/* Modal de Sucesso */}
      <Modal
        transparent={true}
        visible={modalVisible}
        animationType="fade"
      >
        <View style={styles.modalContainer}>
          <View style={styles.modalContent}>

            <Text style={styles.modalText}>Pedido Finalizado com Sucesso!</Text>

            <TouchableOpacity 
              onPress={() => navigation.popToTop()} 
              style={styles.closeButton}
            > 
              <Text style={styles.closeButtonText}>Fechar</Text>
            </TouchableOpacity>

          </View>
        </View>

      </Modal>

    </View>

    // popToTop() - volta la no inicio da tela
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d1d2e',
    paddingHorizontal: '4%',
    paddingVertical: '5%',
  },

  alert: {
    color: '#FFF',
    padding: 16,
    backgroundColor: '#101026',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 32,
    borderStyle: 'solid',
    borderWidth: 1,
    borderColor: '#848484',
    borderRadius: 8,
  },

  title: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 16,
    textTransform: 'capitalize'
  },

  button: {
    backgroundColor: '#0bd90b',
    flexDirection: 'row',               // para ficar um item ao lado do outro
    width: '65%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },

  textButton: {
    fontSize: 18,
    marginRight: 20,
    fontWeight: 'bold',
    color: '#1d1d2e',
  },

  // modal finalizacao

  modalContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Fundo semitransparente
  },
  modalContent: {
    width: '80%',
    backgroundColor: '#fff',
    padding: 20,
    borderRadius: 6,
    alignItems: 'center',
  },
  modalText: {
    fontSize: 20,
    marginBottom: 20,
    textAlign: 'center',
    fontWeight: 'bold'
  },
  closeButton: {
    backgroundColor: '#0bd90b',
    padding: 10,
    borderRadius: 6,
    width: '40%',
    alignItems: 'center',
    justifyContent: 'center',
  },

  closeButtonText: {
    fontSize: 18,
    color: '#000',
    fontWeight: 'bold',
  },
})