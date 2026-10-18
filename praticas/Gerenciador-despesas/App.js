import { Pressable, Text } from 'react-native';
import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Ionicons } from '@expo/vector-icons';

import DespesasProvider from './src/store/despesas-context';
import TodasDespesas from './src/screens/TodasDespesas';
import DespesasRecentes from './src/screens/DespesasRecentes';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const Tabs = createBottomTabNavigator();

const ROSA = '#d6336c';

function IconeAba({ nome, color, size }) {
  return <Ionicons name={nome} size={size} color={color} />;
}

function TelasPrincipais() {
  return (
    <Tabs.Navigator
      screenOptions={({ navigation }) => ({
        tabBarActiveTintColor: ROSA,
        tabBarInactiveTintColor: '#999',
        headerRight: () => (
          <Pressable
            onPress={() => navigation.navigate('GerenciarDespesa')}
            style={{ marginRight: 16 }}
          >
            <Text style={{ fontSize: 28, color: ROSA }}>+</Text>
          </Pressable>
        ),
      })}
    >
      <Tabs.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Gerenciador de Despesas',
          tabBarIcon: ({ color, size }) => (
            <IconeAba nome="time" color={color} size={size} />
          ),
        }}
      />
      <Tabs.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas',
          tabBarIcon: ({ color, size }) => (
            <IconeAba nome="list" color={color} size={size} />
          ),
        }}
      />
    </Tabs.Navigator>
  );
}

export default function App() {
  return (
    <DespesasProvider>
      <StatusBar style="dark" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Principal"
            component={TelasPrincipais}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GerenciarDespesa"
            component={GerenciarDespesa}
            options={{ presentation: 'modal' }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </DespesasProvider>
  );
}