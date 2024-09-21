
// CONTEXTO DE AUTENTIFICAÇÃO

// CRIANDO O CREATECONTEXT    // createContext - para criar o context
// AUTHCONTEXT.TSX            

import React, { ReactNode, createContext, useState, useEffect } from "react";
import AsyncStorage from "@react-native-async-storage/async-storage";  // para gravar os dados do login so store do navegador
import { api } from '../services/api';

// tipagens do createContext

type AuthContextData = {                                          // informações q o context vai ter como padrão
  user: UserProps,
  isAuthenticated: boolean,                                       // para saber se o user esta logado
  loadingAuth: boolean,                                           // useState
  loading: boolean,                                               // useState   
  signIn: (credenciais: SignInProps) => Promise<void>,
  signOut: () => Promise<void>,
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

  // useState

  const [loadingAuth, setLoadingAuth] = useState(false);          // para controlar o acesso
  const [loading, setLoading] = useState(true);

  const isAuthenticated = !!user.name;

  // useEffect

  useEffect(() => {

    async function getUser() {                                        // buscando as informações salvas do usuario

      const userInfo = await AsyncStorage.getItem('@pizzariabrasa')
      let verificarUser: UserProps = JSON.parse(userInfo || '{}')     //  caso o user nao tenha fieto login o objeto ira vim vazio '{}'


      if (Object.keys(verificarUser).length > 0) {                    // verificar se recebemos as informações dele       

        api.defaults.headers.common['Authorization'] = `Bearer ${verificarUser.token}`;

        setUser({                                                     // devolvendo as informações ao setState setUser    
          id: verificarUser.id,
          name: verificarUser.name,
          email: verificarUser.email,
          token: verificarUser.token
        })
      }

      setLoading(false);

    }

    getUser();

  }, [])
  // array de dependências - qndo app for carregado ele executa o que esta dentro do useEffetc



  // SIGN IN  --  // METODO DE LOGIN

  async function signIn({ email, password }: SignInProps) {

    setLoadingAuth(true);

    try {                                                         // requisição a API
      const response = await api.post('/session', {
        email,
        password
      })

      console.log(response.data)

      const { id, name, token } = response.data;                  // desconstruindo

      const data = {
        ...response.data,                                         // passando do objeto data para a variavel data ser transformada em string
      }


      await AsyncStorage.setItem('@pizzariabrasa', JSON.stringify(data)) // transformando em objeto em string para ser salva no AsyncStorage- JSON.stringify(data)

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




  // SIGN OUT  --  MÉTODO DE LOGOUT 

  async function signOut() {

    await AsyncStorage.clear()         // PROMISSE -- para limpar o AsyncStorage

      .then(() => {                    // tudo volta a ser vazio e desloga o user

        setUser({
          id: '',
          name: '',
          email: '',
          token: ''
        })
      })
  }



  return (

    // aqui ficar todas as paginas - AuthContext.Provider
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loadingAuth,
        loading,
        signIn,
        signOut
      }}>

      {children}

    </AuthContext.Provider>
    // todo o projeto vai estar dentro do Contexto
  )
}


// se variável isAuthenticated tiver vazia !!user.name sera FALSE
// !!user.name = convertendo a variável para Boolean
// componente provider compartilha dados ou funções entre partes da app
// value dele sempre respeita as informações do AuthContextData