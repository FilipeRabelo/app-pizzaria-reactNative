
// PAGE ORDER

import React, { useState, useEffect } from 'react';
import { 
  View, 
  Text, 
  StyleSheet, 
  TouchableOpacity, 
  TextInput, 
  Alert, 
  Modal 
} from 'react-native';

import { useRoute, RouteProp, useNavigation } from "@react-navigation/native" ;      // para pegar os dados digitados 
import { Feather } from '@expo/vector-icons';
import { api } from '../../services/api';
import { ModalPicker } from '../../components/ModalPicker'


type RouteDetailParams = {
  Order: {
    number: number | string,
    name: string,
    orderId: string
  }
}

export type CategoryProps = {
  id: string,
  name: string,
}

type ProductsProps = {
  id: string,
  name: string
}

type OrderRouteProps = RouteProp<RouteDetailParams, 'Order'>;


export default function Order() {

  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation();

  const [amount, setAmount] = useState('1');                                             // estado q vai controlar a quantidade escolhida

  // estados category

  const [category, setCategory] = useState<CategoryProps[] | []>([]);                    // armazena a lista de todas as categorias - array
  const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>()  // armazena qual categoria esta selecionada 
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false)                // modal começa fechado ate clicar no botão

  // estados produtos

  const [products, setProducts] = useState<ProductsProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<ProductsProps | undefined>();
  const [modalProductVisible, setModalProductVisible] = useState(false)
  

  // qndo o app for carregado ele vai executar o que estiver dentro do useEffect
  // categorias
  useEffect(() => {                               // requisicao http         // buscar as categorias com o useEffect - 

    async function loadInfo() {                                              // Código a ser executado

      const response = await api.get('/category');                           // requisição para buscar e listar as categoria
     
      setCategory(response.data)                                             // passando a requisição para o setState
      setCategorySelected(response.data[0])                                  // pegando a primeira posição do array para ficar selecionada
      // console.log(response.data)
    }

    loadInfo();

  }, [])                                                                     // [] array de dependencias


  useEffect(() => {

    async function loadProduct(){

      const response = await api.get('/category/product', {
        params:{
          category_id: categorySelected?.id                                  // passando o id da categoria selecionada p buscar o id do produto
        }
      })

      setProducts(response.data);
      setProductSelected(response.data[0])

    }
    
    loadProduct()

  }, [categorySelected])    // toda vez q a categoria mudar chama esse useEffect


  // função para deletar
  async function handleCloseOrder() {                                        

    Alert.alert(
      "Confirmar Exclusão",
      "Você tem certeza que deseja apagar este pedido?",
      [
        {
          text: "Cancelar",
          onPress: () => console.log("Cancelado"),
          style: "cancel"
        },
        {
          text: "Sim",          
          onPress: async () => {

            try {

              await api.delete('/order', {                         // requisicao para deletar
                params: {
                  order_id: route.params?.orderId
                }
              });

              navigation.goBack();                                 // Voltar para a tela anterior
                                            
            } catch (err) {
              console.log(err);
              alert('Erro ao deletar mesa')
            }
          }
        }
      ]
    );

  }

  // o item é o q esta dento do input de categorias
  function handleChangeCategory(item: CategoryProps){

    setCategorySelected(item);                              // recebe o item e muda a categoria selecionada - passando p o setCategorySelected o item q recebemos
  }

  function handleChangeProduct(item: ProductsProps){

    setProductSelected(item)
  }


  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <View style={styles.headerName}>
          <Text style={styles.numberTable}>Mesa:  {route.params.number}</Text>
          <Text style={styles.nameClient}>{route.params.name ? '|  ' + route.params.name : ''}</Text>
        </View>

        <TouchableOpacity onPress={handleCloseOrder}>
          <Feather name='trash-2' size={35} color={'#DC143C'} />
        </TouchableOpacity>

      </View>


     
      {category.length !== 0 && (

        <TouchableOpacity onPress={() => setModalCategoryVisible(true)} style={styles.input}>
          <Text style={{ color: '#FFF', fontSize: 18 }}>
            {categorySelected?.name}
          </Text>
        </TouchableOpacity>

      )}


      {products.length !== 0 &&(    // qndo o tamanho for diferente de 0 entao && ... mostra o produto

        <TouchableOpacity onPress={() => setModalProductVisible(true)} style={styles.input}>
          <Text style={{ color: '#FFF', fontSize: 18 }}>
            {productSelected?.name}
          </Text>
        </TouchableOpacity>

      )}
      


      <View style={styles.qtdContainer}>
        <Text style={styles.qtdText}>Quantidade</Text>

        <TextInput
          style={[styles.input, { width: '60%', textAlign: 'center' }]}
          placeholderTextColor={'#f0f0f0'}
          keyboardType='numeric'                                                  // teclado numerico
          value={amount}                                                          // useStates para salvar a quantidade
          onChangeText={setAmount}                                                // useStates
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

      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType='fade'
      >
        
        <ModalPicker                                                  // componente ModalPicker
          options={category}                                          // lista de categorias
          selectedItem={ handleChangeCategory }                       // recebe o item e chama a funcao para selecionar a categoria
          handleCloseModal={ () => setModalCategoryVisible(false) }   // para fechar o modal - 
        />
      </Modal>

      <Modal 
        transparent={true}
        visible={modalProductVisible}
        animationType='fade'
      >

        <ModalPicker                                                  // componente ModalPicker
          options={products}                                          // lista de categorias
          selectedItem={handleChangeProduct}                       // recebe o item e chama a funcao para selecionar a categoria
          handleCloseModal={() => setModalProductVisible(false)}   // para fechar o modal - 
        />

      </Modal>

    </View>
  )
}

// preciso tdoas as categorias q tem
// metodo para fechar o modal
// e qual esta selecionado


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

  actions: {
    marginTop: 6,
    flexDirection: 'row',
    width: '100%',
    justifyContent: 'space-between'
  },

  buttonAdd: {
    backgroundColor: "#3fd1ff",
    borderRadius: 6,
    height: 45,
    justifyContent: 'center',
    alignItems: 'center',
    width: '20%',
    fontSize: 20,
    fontWeight: 'bold',
  },

  button: {
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




// async function handleCloseOrder() {                          // funcao para deletar

//   try {
//     await api.delete('/order', {
//       params:{
//         order_id: route.params?.orderId
//       }
//     })

//     navigation.goBack()                                      // para voltar uma tela, caso tenha deletado a order
    
//   } catch (err) {
//     console.log(err)
//   }

// }
