/**
 * @format
 */

import * as React from 'react';
import {AppRegistry} from 'react-native';
import {
  createMemoryRouter,
  createRoutesFromElements,
  Route,
  RouterProvider,
} from 'react-router-native';
import {PaperProvider} from 'react-native-paper';
import {Provider} from 'react-redux';
import store from './src/store.js';
import {name as appName} from './app.json';
import PrivateRoute from './src/components/PrivateRoute';
import ListScreen from './src/screens/ListScreen';
import LoginScreen from './src/screens/LoginScreen';

const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route path="/" element={<LoginScreen />} />
      <Route path="/register" element={<RegisterScreen />} />

      <Route path="" element={<PrivateRoute />}>
        <Route path="/lists" element={<ListScreen />} />
        <Route path="/tasks/:id" element={<TaskScreen />} />
      </Route>
    </Route>
  )
);

export default function Main() {
  return (
    <Provider store={store}>
      <PaperProvider>
        <RouterProvider router={router} />
      </PaperProvider>
    </Provider>
  );
}

AppRegistry.registerComponent(appName, () => Main);
