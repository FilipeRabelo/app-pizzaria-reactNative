
// APPROUTES.TSX

// todas as rotas onde qndo so o user logados podem acessar

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";
import FinishOrder from "../pages/FinishOrder";

export type StackParamsList = {                     

  Dashboard: undefined,                             // undefined para nao receber parametros

  Order: {
    number: number | string,                        // componentes chamados - pages chamadas
    name: string,
    order_id: string
  },

  FinishOrder: {
    number: number | string,                        // numero da mesa
    order_id: string,
    name: string 
  }
}

const Stack = createNativeStackNavigator<StackParamsList>();   // <> generic - forma de definir tipos que podem ser usados de forma flexível

// user LOGADOS podem acessar

function AppRoutes() {

  return (
    <Stack.Navigator>

      <Stack.Screen
        name="Dashboard"
        component={Dashboard}
        options={{ headerShown: false }}                // para tirar o header
      />

      <Stack.Screen
        name="Order"
        component={Order}
        options={{ headerShown: false }}               // para tirar o header
      />

      <Stack.Screen
        name="FinishOrder"
        component={FinishOrder}
        options={{
          title: 'Finalizando',
          headerStyle: {
            backgroundColor: '#1d1d2e'
          },
          headerTintColor: '#FFF',
          headerBackTitle: 'Voltar',                    // Título que aparece na seta de voltar
          headerBackTitleVisible: true,                 // Exibe o título na seta (em iOS)
        }}             
      />

    </Stack.Navigator>
  )

}

export default AppRoutes;