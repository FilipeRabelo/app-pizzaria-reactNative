// ROTAS INDEX

// componente q decide qual rota vai mostrar, se tiver logado mostra a de logado
// se nao tiver logado mostra a signIn
// controla as rotas - gerencia as rotas

import React, { useContext } from "react";
import { View, ActivityIndicator } from "react-native";
import { AuthContext } from "../contexts/AuthContext"

import AppRoutes from "./app.routes";                            // se ele esta LOGADO
import AuthRoutes from "./auth.routes";                          // se ele NAO esta logado


function Routes() {                                              // quem vai distribuir e controlar tudo

  const { isAuthenticated, loading } = useContext(AuthContext)   // quem controle o loadin é o context

  if (loading) {
    return (
      <View style={{ flex: 1, backgroundColor: '#1d1d2e', justifyContent: 'center', alignItems: 'center' }}>
        <ActivityIndicator size={"large"} color={'#DC143C'} />
      </View>
    )
  }

  return (
    isAuthenticated ? <AppRoutes /> : <AuthRoutes />
  )
}

export default Routes;