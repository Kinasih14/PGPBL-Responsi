import * as React from 'react';
import { Text, View } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createBottomTabNavigator } from '@react-navigation/bottom-tabs';
import Home from './home';
import List from './List';
import Edit from './Editdata';
import Map from './Map';
import { FontAwesomeIcon } from '@fortawesome/react-native-fontawesome';
import {faUserPen,  faHouse, faCarrot, faMapLocationDot, faUser,} from '@fortawesome/free-solid-svg-icons';
import { WebView } from 'react-native-webview';
function HomeScreen() {
  return (
    <Home />
  );
}

function ListScreen() {
  return (
    <List />
  );
}
function EditScreen() {
  return (
    <Edit/>
  );
}
function MapScreen() {
  return (
    <Map/>
  );
}


const Tab = createBottomTabNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Tab.Navigator>
        <Tab.Screen name="Home" component={HomeScreen} 
      options={{ headerShown: false,
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faHouse} color={color} size={20} />
        ),}}/>
        <Tab.Screen name="Toko Sayur" component={ListScreen}  options={{ headerShown: true,
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faCarrot} color={color} size={20} />
        ),}}/>
        <Tab.Screen name="Edit" component={EditScreen}  options={{ 
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faUserPen} color={color} size={20} />
        ),}}/>
      <Tab.Screen name="Map" component={MapScreen}  options={{ 
        tabBarIcon: ({ color }) => (
          <FontAwesomeIcon icon={faMapLocationDot} color={color} size={20} />
        ),}}/>
    

      

      </Tab.Navigator>
    </NavigationContainer>
  );
}