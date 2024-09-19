
// CRIANDO O CREATECONTEXT    // createContext - para criar o context
// AUTHCONTEXT.TSX            // CONTEXTO DE AUTENTIFICAÇÃO

import React, { useState, createContext, ReactNode } from "react";

// tipagens do createContext

type AuthContextData = {      // informações q o context vai ter como padrão

  user: UserProps,
  isAuthenticated: boolean    // para saber se o user esta logado
  signIn: (credenciais: SignInProps) => Promise<void>;
}

type UserProps = {            // tipando informações do usuário

  id: string,
  name: string,
  email: string,
  token: string
}

type AuthProviderProps = {    // ReactNode pata tipar o children do authProvider

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
  })

  const isAuthenticated = !!user.name;

  async function signIn({email, password}: SignInProps) {         // METODO DE LOGIN
    console.log(email + ' ' + password);
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