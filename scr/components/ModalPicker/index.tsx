
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView                                        // caso ocupe mais q o tamanho da tela... SCROLL
} from 'react-native';

import { CategoryProps } from '../../pages/Order';

interface ModalPickerProps {

  options: CategoryProps[],
  handleCloseModal: () => void,               
  selectedItem: (item: CategoryProps) => void       // vai receber o item do tipo categoryProps
};

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');


export function ModalPicker({ options, selectedItem, handleCloseModal }: ModalPickerProps) {

  function onPressItem(item: CategoryProps) {

    // console.log(item)
    selectedItem(item);                              // vai passar p a propriedade selectedItem qual é o item
    handleCloseModal();                              // vai fechar omodal
  };

  const option = options.map((item, index) => (      // map para percorrer a lista

    <TouchableOpacity key={index} onPress={() => onPressItem(item)} style={styles.option}>
      <Text style={styles.item}>
        {item?.name}
      </Text>
    </TouchableOpacity>

  ))

  // {option} mapeia todas as categorias

  return (

    <TouchableOpacity onPress={handleCloseModal} style={styles.container}>
      <View style={styles.content}>
        <ScrollView showsVerticalScrollIndicator={false}>
          {option}
        </ScrollView>
      </View>
    </TouchableOpacity>
  )

};

// showsVerticalScrollIndicator={false} - > para tirar a barra de rolagem

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content: {
    width: WIDTH - 20,
    height: HEIGHT / 2,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#8a8a8a',
    borderRadius: 6
  },

  option:{
    alignItems: 'flex-start',
    borderTopWidth: 0.8,
    borderTopColor: '#8a8a8a'
  },
  
  item:{
    margin: 18,
    fontSize: 14,
    fontWeight: 'bold',
    color: '#101026'
  }

});