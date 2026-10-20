import { DarkTheme, DefaultTheme, NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import { Alert, Pressable, View } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { StatusBar } from 'expo-status-bar';
import { getTheme } from './src/constants/theme';
import { ThemeContextProvider, useAppTheme } from './src/context/theme-context';
import { ExpensesContextProvider, useExpenses } from './src/store/expenses-context';
import DespesasRecentes from './src/screens/DespesasRecentes';
import TodasDespesas from './src/screens/TodasDespesas';
import GerenciarDespesa from './src/screens/GerenciarDespesa';

const Stack = createNativeStackNavigator();
const Tab = createBottomTabNavigator();

function buildNavTheme(scheme) {
  const base = scheme === 'dark' ? DarkTheme : DefaultTheme;
  const c = getTheme(scheme);
  return {
    ...base,
    colors: {
      ...base.colors,
      primary: c.primary,
      background: c.background,
      card: c.card,
      text: c.text,
      border: c.border,
    },
  };
}

function Tabs() {
  const { colors, isDark, toggleTheme } = useAppTheme();
  const { expenses, clearExpenses } = useExpenses();

  function handleClearAll() {
    Alert.alert('Apagar tudo', 'Isso vai remover todas as despesas. Deseja continuar?', [
      { text: 'Cancelar', style: 'cancel' },
      { text: 'Apagar tudo', style: 'destructive', onPress: clearExpenses },
    ]);
  }

  return (
    <Tab.Navigator
      screenOptions={({ navigation }) => ({
        headerLeft: () => (
          <Pressable onPress={toggleTheme} hitSlop={10} style={{ marginLeft: 16 }}>
            <Ionicons name={isDark ? 'sunny-outline' : 'moon-outline'} size={24} color={colors.primary} />
          </Pressable>
        ),
        headerRight: () => (
          <View style={{ flexDirection: 'row', alignItems: 'center', gap: 16, marginRight: 16 }}>
            {expenses.length > 0 && (
              <Pressable onPress={handleClearAll} hitSlop={10}>
                <Ionicons name="trash-outline" size={24} color={colors.error} />
              </Pressable>
            )}
            <Pressable onPress={() => navigation.navigate('GerenciarDespesa')} hitSlop={10}>
              <Ionicons name="add" size={28} color={colors.primary} />
            </Pressable>
          </View>
        ),
      })}
    >
      <Tab.Screen
        name="DespesasRecentes"
        component={DespesasRecentes}
        options={{
          title: 'Recentes',
          tabBarIcon: ({ color, size }) => <Ionicons name="time-outline" color={color} size={size} />,
        }}
      />
      <Tab.Screen
        name="TodasDespesas"
        component={TodasDespesas}
        options={{
          title: 'Todas',
          tabBarIcon: ({ color, size }) => <Ionicons name="list-outline" color={color} size={size} />,
        }}
      />
    </Tab.Navigator>
  );
}

function AppContent() {
  const { scheme, isDark } = useAppTheme();

  return (
    <NavigationContainer theme={buildNavTheme(scheme)}>
      <StatusBar style={isDark ? 'light' : 'dark'} />
      <Stack.Navigator>
        <Stack.Screen name="Tabs" component={Tabs} options={{ headerShown: false }} />
        <Stack.Screen name="GerenciarDespesa" component={GerenciarDespesa} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default function App() {
  return (
    <ThemeContextProvider>
      <ExpensesContextProvider>
        <AppContent />
      </ExpensesContextProvider>
    </ThemeContextProvider>
  );
}