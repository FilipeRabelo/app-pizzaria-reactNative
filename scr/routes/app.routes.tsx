
// APPROUTES.TSX

// todas as rotas onde qndo so o user logados podem acessar

import React from "react";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

import Dashboard from "../pages/Dashboard";
import Order from "../pages/Order";

export type StackParamsList = {                     // undefined para nao receber parametros

  Dashboard: undefined,
  Order: {
    number: number | string,
    name: string,
    orderId: string
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
        options={{ headerShown: false }}              // para tirar o header
      />
    </Stack.Navigator>
  )
}

export default AppRoutes;