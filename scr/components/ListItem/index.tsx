import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Feather } from '@expo/vector-icons';
import { api } from '../../services/api'

interface ItemProps {

  data: {
    id: string;
    product_id: string;
    name: string;
    amount: string | number;
  };

  deleteItem: (item_id: string) => void;

}

export function ListItem({ data, deleteItem }: ItemProps) {

  function handleDeleteItem() {                               // passa para a pagina de order

    deleteItem(data.id)
  }

  return (

    <View style={styles.container}>
      <Text style={styles.itemList}>Qtd: {data.amount} - {data.name}</Text>

      <TouchableOpacity onPress={handleDeleteItem}>
        <Feather name='trash-2' color='#FF3F4b' size={25} />
      </TouchableOpacity>
    </View>

  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#101026',
    alignItems: 'center',
    justifyContent: 'space-between',
    flexDirection: 'row',
    marginBottom: 12,
    paddingVertical: 12,
    paddingHorizontal: 12,
    borderRadius: 6,
    borderWidth: 0.3,
    borderColor: '#8a8a8a'
  },

  itemList: {
    color: '#FFF',
    fontWeight: 'bold',
    textTransform: 'capitalize'
  }
})