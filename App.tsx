import './src/localization/i18n'
import StatusBar from "./src/components/StatusBar";
import NavigationContainer from "./src/navigators/NavigationContainer";
import ThemeProvider from "./src/utility/theme/ThemeProvider";
import { Provider } from 'react-redux';
import { LogBox } from 'react-native';
import NavigationLoader from './src/navigators/NavigationLoader';
import { GestureHandlerRootView } from 'react-native-gesture-handler';
import { store } from './src/utility/redux/store';
LogBox.ignoreLogs(['Warning: ...']); // Ignore log notification by message
LogBox.ignoreAllLogs();//Ignore all log notifications

export default function App() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <ThemeProvider>
        <NavigationContainer>
          <Provider store={store}>
            <StatusBar />
            <NavigationLoader/>
          </Provider>
        </NavigationContainer>
      </ThemeProvider>
    </GestureHandlerRootView>
  );
}
