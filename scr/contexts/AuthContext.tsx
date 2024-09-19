
// CRIANDO O CREATECONTEXT    // createContext - para criar o context
// AUTHCONTEXT.TSX            // CONTEXTO DE AUTENTIFICAÇÃO

import React, { useState, createContext, ReactNode } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";  // para gravar os dados do login so store do navegador
import { api } from '../services/api';

// tipagens do createContext

type AuthContextData = {                                          // informações q o context vai ter como padrão
  user: UserProps,
  isAuthenticated: boolean                                        // para saber se o user esta logado
  signIn: (credenciais: SignInProps) => Promise<void>;
}

type UserProps = {                                                // tipando informações do usuário
  id: string,
  name: string,
  email: string,
  token: string
}

type AuthProviderProps = {                                        // ReactNode pata tipar o children do authProvider

  children: ReactNode;
}

type SignInProps = {
  email: string,
  password: string
}


// CRIANDO O componente CREATECONTEXT
export const AuthContext = createContext({} as AuthContextData)   // AuthContext vai (as) respeitar o AuthContextData


// CRIANDO O component PROVIDER DO CONTEXTO
export function AuthProvider({ children }: AuthProviderProps) {   // AuthProvider vai (as) respeitar o AuthProviderProps

  const [user, setUser] = useState<UserProps>({                   // informações do usuário
    
    id: '',
    name: '',
    email: '',
    token: ''
  });

  const [loadingAuth, setLoadingAuth] = useState(false);          // para controlar o acesso

  const isAuthenticated = !!user.name;

  async function signIn({email, password}: SignInProps) {         // METODO DE LOGIN

    setLoadingAuth(true);
  
    try {                                                         // requisição a API
      const response = await api.post('/session', {
        email,
        password
      })

      console.log(response.data)

      const { id, name, token } = response.data;                  // desconstruindo

      const data = {
        ...response.data,     // passando do objeto data para a variavel data ser transformada em string
      }
      
      // transformando em objeto em string para ser salva no AsyncStorage- JSON.stringify(data)
      await AsyncStorage.setItem('@pizzariabrasa', JSON.stringify(data))  

      api.defaults.headers.common['Authorization'] = `Bearer ${token}`

      setUser({
        id,
        name,
        email,
        token
      })

      setLoadingAuth(false);

    } catch (err) {
      console.log('Erro ao acessar', err);
      setLoadingAuth(false);                                       // para parar pq deu erro
    }
  }



  return (
    // aqui ficar todas as paginas - AuthContext.Provider
    <AuthContext.Provider value={{ user, isAuthenticated, signIn }}>
      {children}
    </AuthContext.Provider>
    // todo o projeto vai estar dentro do Contexto
  )
}




// se variável isAuthenticated tiver vazia !!user.name sera FALSE
// !!user.name = convertendo a variável para Boolean
// componente provider compartilha dados ou funções entre partes da app
// value dele sempre respeita as informações do AuthContextData