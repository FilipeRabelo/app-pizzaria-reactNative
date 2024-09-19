// usuarios NAO logados podem acessar

import React  from "react";
import SignIn from "../pages/SignIn";
import { createNativeStackNavigator } from '@react-navigation/native-stack';

const Stack = createNativeStackNavigator();   // criando o STACK

// <Stack.Screen/> CADA TELA
function AuthRoutes(){                        // rotas de pssoas nao logados podem acessar
  return(
    <Stack.Navigator>                         
      <Stack.Screen name="SignIn" component={SignIn} options={{headerShown: false}}/>
    </Stack.Navigator>
  )
}

export default AuthRoutes;