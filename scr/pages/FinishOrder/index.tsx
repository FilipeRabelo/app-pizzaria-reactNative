
import React from "react";
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

import { Feather } from '@expo/vector-icons'

export default function FinishOrder() {

  return (    
    <View style={styles.container}>
      <Text style={styles.alert}>Você Deseja Finalizar esse Pedido?</Text>
      <Text style={styles.title}>Mesa 30</Text>

      <TouchableOpacity style={styles.button}>
        <Text style={styles.textButton}>Finalizar Pedido</Text>
        <Feather
          name='shopping-cart' size={20} color='#1d1d2e'
        />
      </TouchableOpacity>
    </View>
  )
}



const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#1d1d2e',
    paddingHorizontal: '4%',
    paddingVertical: '5%'
  },

  alert: {
    color: '#FFF',
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 12
  },

  title: {
    color: '#FFF',
    fontSize: 30,
    fontWeight: 'bold',
    marginBottom: 12,
    textTransform: 'capitalize'
  },

  button:{
    backgroundColor: '#0bd90b',
    flexDirection: 'row',               // para ficar um item ao lado do outro
    width: '65%',
    height: 45,
    alignItems: 'center',
    justifyContent: 'center',
    borderRadius: 6,
  },

  textButton:{
    fontSize: 18,
    marginRight: 8,
    fontWeight: 'bold',
    color: '#1d1d2e',
    
  }

})