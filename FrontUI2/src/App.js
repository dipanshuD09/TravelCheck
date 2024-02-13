/**
 * Sample React Native App
 * https://github.com/facebook/react-native
 *
 * @format
 */

import {View, Text} from 'react-native';
import {Outlet} from 'react-router-native';
import React from 'react';
import AppBar from './components/AppBar';
import NavBar from './components/NavBar';


const App = () => {
  return (
    <View>
      <AppBar />
      <Outlet />
      <NavBar />
    </View>
  );
};

export default App;
