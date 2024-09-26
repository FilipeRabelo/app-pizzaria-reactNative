// PAGE ORDER

import React, { useState, useEffect } from "react";
import { api } from "../../services/api";
import { useRoute, RouteProp, useNavigation } from "@react-navigation/native"; // para pegar os dados digitados
import { Feather } from "@expo/vector-icons";
import { ModalPicker } from "../../components/ModalPicker";
import { ListItem } from '../../components/ListItem';
import {
  View,
  Text,
  StyleSheet,
  TouchableOpacity,
  TextInput,
  Alert,
  Modal,
  FlatList
} from "react-native";

import { NativeStackNavigationProp } from '@react-navigation/native-stack'   // para navegar ate a pagina de FinishOrder
import { StackParamsList } from '../../routes/app.routes'                    // trazendo as rotas para trazer a FinihiOrder
// import FinishOrder from '../../pages/FinishOrder'



type RouteDetailParams = {
  Order: {
    number: number | string;
    name: string;
    order_id: string;
  };
};


export type CategoryProps = {
  id: string;
  name: string;
};


type ProductsProps = {
  id: string;
  name: string;
};


type ItemProps = {
  id: string;
  product_id: string;
  name: string;
  amount: string | number;
};


type OrderRouteProps = RouteProp<RouteDetailParams, "Order">;

export default function Order() {

  const route = useRoute<OrderRouteProps>();
  const navigation = useNavigation<NativeStackNavigationProp<StackParamsList>>();   // passando as tipagens

  // estados category
  const [category, setCategory] = useState<CategoryProps[] | []>([]);                       // armazena a lista de todas as categorias - array
  const [categorySelected, setCategorySelected] = useState<CategoryProps | undefined>();    // armazena qual categoria esta selecionada
  const [modalCategoryVisible, setModalCategoryVisible] = useState(false);                  // modal começa fechado ate clicar no botão

  // estados produtos
  const [products, setProducts] = useState<ProductsProps[] | []>([]);
  const [productSelected, setProductSelected] = useState<ProductsProps | undefined>();
  const [modalProductVisible, setModalProductVisible] = useState(false);

  // estado que controla a quantidade escolhida
  const [amount, setAmount] = useState("1");                                              // estado q vai controlar a quantidade escolhida

  // estado que controla os items adicionados [] list
  const [items, setItems] = useState<ItemProps[]>([]);                                    // lista dos produtos selecionados

  // estado que controla o modal de fechamento da mesa
  const [modalCloseOrderVisible, setModalCloseOrderVisible] = useState(false);  // Novo estado para o modal de fechamento
  const [orderIdToClose, setOrderIdToClose] = useState<string | null>(null);    // Armazena o ID da ordem


  // categorias // qndo o app for carregado ele vai executar o que estiver dentro do useEffect
  useEffect(() => {                                                                        // buscar as categorias com o useEffect -                                                                 

    async function loadInfo() {
      const response = await api.get("/category");                                        // requisição para buscar e listar as categoria

      setCategory(response.data);                                                         // passando a requisição para o setState
      setCategorySelected(response.data[0]);                            // pegando a primeira posição do array para ficar selecionada
    }

    loadInfo();
  }, []);                                                              // [] array de dependencias


  useEffect(() => {

    async function loadProduct() {
      const response = await api.get("/category/product", {
        params: {
          category_id: categorySelected?.id,                            // passando o id da categoria selecionada p buscar o id do produto
        },
      });

      setProducts(response.data);
      setProductSelected(response.data[0]);
    }

    loadProduct();
  }, [categorySelected]);                                               // toda vez q a categoria mudar chama esse useEffect



  // Função para abrir o modal de fechamento da mesa
  function handleCloseOrder() {

    setOrderIdToClose(route.params?.order_id);
    setModalCloseOrderVisible(true);
  }

  // Função para confirmar o fechamento da mesa com MODAL
  async function confirmCloseOrder() {

    if (!orderIdToClose) return;        // Protege contra fechamento sem ID

    try {

      await api.delete("/order", {
        params: {
          order_id: orderIdToClose,
        },
      });

      navigation.goBack();

    } catch (err) {
      console.log(err);
      alert("Erro ao deletar mesa");

    } finally {
      setModalCloseOrderVisible(false);
    }
  }



  // o item é o q esta dento do input de categorias
  function handleChangeCategory(item: CategoryProps) {
    setCategorySelected(item);                            // recebe o item e muda a categoria selecionada - passando p o setCategorySelected o item q recebemos
  }


  function handleChangeProduct(item: ProductsProps) {
    setProductSelected(item);
  }



  // funcao para adicionar um produto na mesa
  async function handleAddItem() {

    const response = await api.post('/order/add', {        // adicionando item a mesa
      order_id: route.params?.order_id,                     // recebendo o id da order
      product_id: productSelected?.id,
      amount: Number(amount)
    })

    // console.log(JSON.stringify(response.data, null, 2))

    let data = {                                           // objeto
      id: response.data.id,
      product_id: productSelected?.id as string,
      name: productSelected?.name as string,
      amount: amount
    }

    // passando o objeto para a useState - setItems()
    setItems(oldArray => [...oldArray, data])              // oldArray - pegando tudo que ja tem e adicionando data
  }



  // funcao para deletar um item da lista dentro da mesa aberta
  async function handleDeleteItem(item_id: string) {

    await api.delete('/order/remove', {                   // deletando o item da lista      
      params: {
        item_id: item_id
      }
    });

    // apos remover o item da api, removemos esse item da lista e atualizamos a interface
    let removeItem = items.filter(item => {               // filtrar e remover o item e devolver todos exceto o q removeu      
      return (item.id !== item_id);                       // retorna os item q sao diferentes do id do item q removeu
    })

    // retorna o array sem o item excluido
    setItems(removeItem);                                 // passando p o array de item a nova lista sem o id excluido
  }


  // funcao para ir ate a tela de FinishOrder
  function handleFinishOrder() {

    navigation.navigate('FinishOrder', {
      number: route.params?.number,
      order_id: route.params?.order_id,
      name: route.params?.name
    });
  }


  return (
    <View style={styles.container}>

      <View style={styles.header}>

        <View style={styles.headerName}>
          <Text style={styles.numberTable}>Mesa: {route.params.number}</Text>
          <Text style={styles.nameClient}>{route.params.name ? "|  " + route.params.name : ""} </Text>
        </View>

        {items.length === 0 && (
          <TouchableOpacity onPress={handleCloseOrder}>
            <Feather name="trash-2" size={35} color={"#DC143C"} />
          </TouchableOpacity>
        )}

      </View>


      {category.length !== 0 && (

        <TouchableOpacity
          onPress={() => setModalCategoryVisible(true)}
          style={styles.input}
        >
          <Text style={{ color: "#FFF", fontSize: 18, textTransform: 'capitalize' }}>
            {categorySelected?.name}
          </Text>
        </TouchableOpacity>

      )}


      {products.length !== 0 && ( // qndo o tamanho for diferente de 0 entao && ... mostra o produto

        <TouchableOpacity
          onPress={() => setModalProductVisible(true)}
          style={styles.input}
        >
          <Text style={{ color: "#FFF", fontSize: 18, textTransform: 'capitalize' }}>
            {productSelected?.name}
          </Text>
        </TouchableOpacity>

      )}


      <View style={styles.qtdContainer}>

        <Text style={styles.qtdText}>Quantidade</Text>

        <TextInput
          style={[styles.input, { width: "60%", textAlign: "center" }]}
          placeholderTextColor={"#f0f0f0"}
          keyboardType="numeric"                                                  // teclado numerico
          value={amount}                                                          // useStates para salvar a quantidade
          onChangeText={setAmount}                                                // useStates
        />

      </View>


      <View style={styles.actions}>

        <TouchableOpacity onPress={handleAddItem} style={styles.buttonAdd}>
          <Text style={styles.buttonText}>+</Text>
        </TouchableOpacity>

        <TouchableOpacity
          style={[styles.button, { opacity: items.length === 0 ? 0.3 : 1 }]}  // deixando o botao apagando qndo nao tiver item na lista
          disabled={items.length === 0}
          onPress={handleFinishOrder}
        >
          <Text style={styles.buttonText}>Avançar</Text>
        </TouchableOpacity>

      </View>



      <FlatList

        showsVerticalScrollIndicator={false}
        style={{ flex: 1, marginTop: 24 }}
        data={items}                                                         // lista de itens q esta dentro do useState
        keyExtractor={(item) => item.id}                                    // keyExtractor qual é o id de cada item - propreidade

        // renderizar esse component - recebr a propriedade data com os tipos - ver compoenntes
        renderItem={({ item }) => <ListItem data={item} deleteItem={handleDeleteItem} />}                  // component separado
      />


      <Modal
        transparent={true}
        visible={modalCategoryVisible}
        animationType="fade"
      >
        <ModalPicker                                                         // componente ModalPicker
          options={category}                                                 // lista de categorias
          selectedItem={handleChangeCategory}                                // recebe o item e chama a funcao para selecionar a categoria
          handleCloseModal={() => setModalCategoryVisible(false)}            // para fechar o modal -
        />
      </Modal>


      <Modal
        transparent={true}
        visible={modalProductVisible}
        animationType="fade"
      >
        <ModalPicker                                                          // componente ModalPicker
          options={products}                                                  // lista de categorias
          selectedItem={handleChangeProduct}                                  // recebe o item e chama a funcao para selecionar a categoria
          handleCloseModal={() => setModalProductVisible(false)}              // para fechar o modal -
        />
      </Modal>



      {/* Modal de Confirmação para Fechar a Mesa */}
      <Modal
        transparent={true}
        visible={modalCloseOrderVisible}
        animationType="slide"
      >
        <View style={styles.modalContainerFechamentoMesa}>
          <View style={styles.modalContentFechamentoMesa}>

            <Text style={styles.modalTextFechamentoMesa}>Você tem certeza que deseja fechar esta mesa?</Text>

            <View style={styles.buttonContainerFechamentoMesa}>
              <TouchableOpacity onPress={() => setModalCloseOrderVisible(false)} style={styles.buttonFechamentoMesa}>
                <Text style={styles.buttonTextFechamentoMesa}>Cancelar</Text>
              </TouchableOpacity>

              <TouchableOpacity onPress={confirmCloseOrder} style={styles.buttonFechamentoMesaConfirmar}>
                <Text style={styles.buttonTextFechamentoMesa}>Confirmar</Text>
              </TouchableOpacity>
            </View>

          </View>
        </View>
      </Modal>

    </View>
  );
}

// preciso tdoas as categorias q tem
// metodo para fechar o modal
// e qual esta selecionado

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#1d1d2e",
    paddingVertical: "5%",
    paddingEnd: "4%",
    paddingStart: "4%",
  },

  header: {
    paddingEnd: "1%",
    paddingStart: "1%",
    justifyContent: "space-between",
    flexDirection: "row",
    marginBottom: 30,
    alignItems: "center",
    marginTop: 34,
  },

  // view

  headerName: {
    flexDirection: "row",
  },

  numberTable: {
    fontSize: 26,
    color: "#FFF",
    fontWeight: "bold",
  },

  nameClient: {
    fontSize: 26,
    color: "#FFF",
    fontWeight: "bold",
    paddingHorizontal: 15,
  },

  input: {
    backgroundColor: "#101026",
    borderRadius: 6,
    width: "100%",
    height: 50,
    marginBottom: 12,
    justifyContent: "center",
    paddingHorizontal: 8,
    color: "#FFF",
    fontSize: 20,
    fontWeight: "bold",
  },

  // view qtdContainer

  qtdContainer: {
    flexDirection: "row",
    alignItems: "center",
    justifyContent: "space-between",
    paddingStart: "0.5%",
  },

  qtdText: {
    color: "#FFF",
    fontSize: 24,
    fontWeight: "bold",
  },

  // view actions

  actions: {
    marginTop: 6,
    flexDirection: "row",
    width: "100%",
    justifyContent: "space-between",
  },

  buttonAdd: {
    backgroundColor: "#3fd1ff",
    borderRadius: 6,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    width: "20%",
    fontSize: 20,
    fontWeight: "bold",
  },

  button: {
    backgroundColor: "#0bd90b",
    borderRadius: 6,
    height: 45,
    justifyContent: "center",
    alignItems: "center",
    width: "75%",
  },

  buttonText: {
    fontSize: 20,
    fontWeight: "bold",
    color: "#101026",
    borderRadius: 6,
  },


  // estilos do modal fe fechamso da mesa

  modalContainerFechamentoMesa: {
    flex: 1,
    justifyContent: "center",
    alignItems: "center",
    backgroundColor: "rgba(0, 0, 0, 0.5)",
  },

  modalContentFechamentoMesa: {
    width: "92%",
    padding: 20,
    backgroundColor: "white",
    borderRadius: 6,
    alignItems: "center",
  },

  modalTextFechamentoMesa: {
    fontSize: 18,
    marginBottom: 20,
    fontWeight: 'bold',
    textTransform: 'capitalize'
  },

  buttonContainerFechamentoMesa: {
    flexDirection: "row",
    justifyContent: "space-between",
    width: "100%",
  },

  buttonFechamentoMesa: {
    backgroundColor: "#3fd1ff",
    padding: 10,
    borderRadius: 6,
    margin: 5,
    flex: 1,
    alignItems: "center",
  },

  buttonTextFechamentoMesa: {
    fontSize: 18,
    color: "#000",
    fontWeight: "bold",
  },

  buttonFechamentoMesaConfirmar: {
    backgroundColor: "#0bd90b",
    padding: 10,
    borderRadius: 5,
    margin: 5,
    flex: 1,
    alignItems: "center",
  }
});