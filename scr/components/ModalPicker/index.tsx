
import React from "react";
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  Dimensions,
  ScrollView                     // caso ocupe mais q o tamanho da tela... SCROLL
} from 'react-native';

import { CategoryProps } from '../../pages/Order';

interface ModalPickerProps {

  options: CategoryProps[],
  handleCloseModal: () => void,
  selectedItem: () => void
};

const { width: WIDTH, height: HEIGHT } = Dimensions.get('window');

export function ModalPicker({ options, selectedItem, handleCloseModal }: ModalPickerProps) {

  return (

    <TouchableOpacity onPress={handleCloseModal} style={styles.container}>
      <View style={styles.content}>
        
      </View>
    </TouchableOpacity> 
  )
};

const styles = StyleSheet.create({

  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },

  content:{
    width: WIDTH - 20,
    height: HEIGHT / 2,
    backgroundColor: '#FFF',
    borderWidth: 1,
    borderColor: '#8a8a8a',
    borderRadius: 6
  }
});