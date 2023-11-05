import * as React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { MyStack } from "./components/Navigation";
import { Provider as PaperProvider } from "react-native-paper";
import { Provider } from "react-redux";
import store from "./store/store";

if(__DEV__) {
  import('./ReactotronConfig').then(() => console.log('Reactotron Configured'))
}


export default function App() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <NavigationContainer>
          <MyStack />
        </NavigationContainer>
      </PaperProvider>
    </Provider>
  );
}
