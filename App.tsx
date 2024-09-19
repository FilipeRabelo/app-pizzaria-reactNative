
import { StyleSheet, Text, View, StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';     // NavigationContainer gerencia a navegação de paginas 
import { AuthProvider } from './scr/contexts/AuthContext';
import Routes from './scr/routes';

export default function App() {

  return (
    // sempre que usar rotas o NavigationContainer precisar estar enter elas

    <NavigationContainer>
      <AuthProvider>
        <StatusBar backgroundColor='#1d1d2e' barStyle='light-content' translucent={false} />
        <Routes />
      </AuthProvider>
    </NavigationContainer>
  );
}

// todas as rotas estao dentro do AuthProviderr