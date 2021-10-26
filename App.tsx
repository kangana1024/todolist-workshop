import React, { useState } from 'react';
import {
  ActivityIndicator,
  StyleSheet,
  View,
} from 'react-native'

import { Provider as PaperProvider } from 'react-native-paper'
import Todo from './src/pages/todo'
import { NavigationContainer } from '@react-navigation/native'
import { createNativeStackNavigator } from '@react-navigation/native-stack'
import { navigationRef } from './src/components/navigation';
import { TodoSettingProvider } from './src/components/context';
import CreateTodo from './src/pages/create';

const Stack = createNativeStackNavigator()
const styles = StyleSheet.create({
  loading: {
    position: 'absolute',
    left: 0,
    right: 0,
    top: 0,
    bottom: 0,
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: 'black',
    opacity:.8
  }
})
const App = () => {
  // const isDarkMode = useColorScheme() === 'dark';
  // const backgroundStyle = {
  //   backgroundColor: isDarkMode ? Colors.darker : Colors.lighter,
  // }
  const [version, setVersion] = useState<number>((new Date()).getTime())
  const [loading, setLoading] = useState<boolean>(false)
  return (
    <PaperProvider>
      <TodoSettingProvider value={{
        version: {
          version,
          setVersion
        },
        loading: {
          loading,
          setLoading
        }
      }}>
        <NavigationContainer ref={navigationRef}>

          <Stack.Navigator>
            <Stack.Screen name="Todo" component={Todo} options={{
              headerShown: false,
            }} />
            <Stack.Screen name="Create" component={CreateTodo} options={{
              headerShown: false,
            }} />
          </Stack.Navigator>
        </NavigationContainer>
        {loading ? <View style={styles.loading}>
          <ActivityIndicator size='large' />
        </View> : null}
      </TodoSettingProvider>
    </PaperProvider>
  );
};


export default App
