
// PAGE ORDER

import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, TextInput } from 'react-native';
import { useRoute, RouteProp } from "@react-navigation/native"                           // para pegar os dados digitados 
import { Feather } from '@expo/vector-icons'

type RouteDetailParams = {

  Order: {
    number: number | string,
    nameClient: string,
    orderId: string
  }
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;

export default function Order() {

  const route = useRoute<OrderRouteProps>();

  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <View style={styles.headerName}>
          <Text style={styles.numberTable}>Mesa:  {route.params.number}</Text>
          <Text style={styles.nameClient}>{route.params.nameClient ? '|  ' + route.params.nameClient : ''}</Text>
        </View>

        <TouchableOpacity>
          <Feather name={'trash-2'} size={28} color={'#DC143C'} />
        </TouchableOpacity>

      </View>


      <TouchableOpacity style={styles.input} >
        <Text style={{ color: '#FFF', fontSize: 18 }}>Pizzas</Text>
      </TouchableOpacity>

      <TouchableOpacity style={styles.input}>
        <Text style={{ color: '#FFF', fontSize: 18 }}>Pizza de calabresa</Text>
      </TouchableOpacity>


      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>

        <TextInput
          style={[styles.input, {width: '60%', textAlign: 'center'}]}
          placeholderTextColor={'#f0f0f0'}
          keyboardType='numeric'                                           // teclado numerico
          value='1'
        />
      </View>


      <View style={styles.actions}>

        <TouchableOpacity style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity style={styles.button}>
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>

      </View>

    </View>
  )
}

const styles = StyleSheet.create({

  container: {
    flex: 1,
    backgroundColor: '#1d1d2e',
    paddingVertical: '5%',
    paddingEnd: '4%',
    paddingStart: '4%',
  },

  header: {
    paddingEnd: '1%',
    paddingStart: '1%',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 30,
    alignItems: 'center',
    marginTop: 34,
  },

  // view

  headerName: {
    flexDirection: 'row',
  },

  numberTable: {
    fontSize: 26,
    color: '#FFF',
    fontWeight: 'bold',
  },

  nameClient: {
    fontSize: 26,
    color: '#FFF',
    fontWeight: 'bold',
    paddingHorizontal: 15
  },

  input: {
    backgroundColor: "#101026",
    borderRadius: 6,
    width: '100%',
    height: 50,
    marginBottom: 12,
    justifyContent: 'center',
    paddingHorizontal: 8,
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold'
  },

  // view qtdContainer

  qtdContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingStart: '0.5%',
  },

  qtdText: {
    color: '#FFF',
    fontSize: 24,
    fontWeight: 'bold',
  },

  // view actions

  actions:{
    marginTop: 6,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },

  buttonAdd:{
    backgroundColor: "#3fd1ff",
    borderRadius: 6,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    fontSize: 20,
    fontWeight: 'bold',
  },

  button:{
    backgroundColor: "#0bd90b",
    borderRadius: 6,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: '75%',
    
  },

  buttonText: {
    fontSize: 20,
    fontWeight: 'bold',
    color: '#101026',
    borderRadius: 6,
  }
  
})

// essa pagina precisa ser colcoada dentro do app.routes onde somente user logados podem acessar