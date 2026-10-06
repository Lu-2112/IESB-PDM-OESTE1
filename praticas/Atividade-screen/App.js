import { StatusBar } from 'expo-status-bar';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { Ionicons } from '@expo/vector-icons';

import DespesasRecentes from './screens/DespesasRecentes';
import TodasDespesas from './screens/TodasDespesas';
import GerenciarDespesa from './screens/GerenciarDespesa';
import IconButton from './components/IconButton';

const Tab = createBottomTabNavigator();
const Stack = createNativeStackNavigator();

const ROSA_FUNDO = '#ffe4ec';
const ROSA_BARRA = '#ffb6c9';
const ROSA_FORTE = '#d63384';

function BottomTabScreen() {
  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        tabBarLabelStyle: { fontSize: 12 },
        headerStyle: { backgroundColor: ROSA_BARRA },
        headerTintColor: ROSA_FORTE,
        headerTitleStyle: { fontWeight: 'bold' },
        tabBarStyle: { backgroundColor: ROSA_BARRA },
        tabBarActiveTintColor: ROSA_FORTE,
        tabBarInactiveTintColor: '#fff',
        sceneStyle: { backgroundColor: ROSA_FUNDO },
        headerRight: ({ tintColor }) => (
          <IconButton
            icon="add"
            size={24}
            color={tintColor}
            onPress={() => navigation.navigate('GerenciarDespesa')}
          />
        ),
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Despesas Recentes',
          tabBarLabel: 'Recentes',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="hourglass" size={size} color={color} />
          ),
        }}
      />
      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas as Despesas',
          tabBarLabel: 'Todas',
          tabBarIcon: ({ color, size }) => (
            <Ionicons name="wallet-outline" size={size} color={color} />
          ),
        }}
      />
    </Tab.Navigator>
  );
}

export default function App() {
  return (
    <>
      <StatusBar style="auto" />
      <NavigationContainer>
        <Stack.Navigator>
          <Stack.Screen
            name="Despesas"
            component={BottomTabScreen}
            options={{ headerShown: false }}
          />
          <Stack.Screen
            name="GerenciarDespesa"
            component={GerenciarDespesa}
            options={{
              title: 'Gerenciar Despesa',
              headerStyle: { backgroundColor: ROSA_BARRA },
              headerTintColor: ROSA_FORTE,
              contentStyle: { backgroundColor: ROSA_FUNDO },
            }}
          />
        </Stack.Navigator>
      </NavigationContainer>
    </>
  );
}