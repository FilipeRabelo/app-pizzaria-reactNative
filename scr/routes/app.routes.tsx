
// APPROUTES.TSX

// todas as rotas onde qndo so o user logados podem acessar

import React     from "react";
import Dashboard from "../pages/Dashboard";
import { createNativeStackNavigator } from "@react-navigation/native-stack";

const Stack = createNativeStackNavigator();

// user LOGADOS podem acessar

function AppRoutes(){
  return(
    <Stack.Navigator>
      <Stack.Screen name="Dashboard" component={Dashboard} options={{ headerShown: false }} />    
    </Stack.Navigator>
  )
}

export default AppRoutes;