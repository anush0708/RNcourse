import { StatusBar } from 'expo-status-bar';
import {NavigationContainer} from '@react-navigation/native'
import {createBottomTabNavigator} from'@react-navigation/bottom-tabs'
import {createNativeStackNavigator } from '@react-navigation/native-stack'
import {useState} from 'react'
import { StyleSheet, Text, View,Button ,TextInput,FlatList} from 'react-native';
import ManageExpense from './screens/ManageExpense';
import AllExpenses from './screens/AllExpenses';
import RecentExpenses from './screens/RecentExpenses';
import { GlobalStyles } from './constants/styles';
import {Ionicons} from '@expo/vector-icons'
import IconButton from './components/UI/IconButton';
import { Provider } from 'react-redux';
import { store } from './redux/store';
const Stack=createNativeStackNavigator();
const BottomTabs=createBottomTabNavigator();

function ExpensesOverview(){
  return (<BottomTabs.Navigator screenOptions={({navigation})=>({
    headerStyle:{backgroundColor:GlobalStyles.colors.primary500 },
    headerTintColor:'white',
    tabBarStyle:{ backgroundColor:GlobalStyles.colors.primary500},
    tabBarActiveTintColor:GlobalStyles.colors.accent500,
      headerRight:({tintColor})=>(
      <IconButton 
      icon="add" 
      size={24} 
      color={tintColor} 
      onPress={()=>{
        navigation.navigate('manageExpense')
      }} 
      />
  )})} 
  >

    <BottomTabs.Screen name='RecentExpenses' component={RecentExpenses} options={{
      title:'Recent Expenses',
      tabBarLabel:'Recent',
      tabBarIcon:({color,size})=><Ionicons name='hourglass' size={size} color={color} />
     }}/>
    <BottomTabs.Screen name='AllExpenses' component={AllExpenses} options={{
      title:'All Expenses',
      tabBarLabel:'ALL Expenses',
      tabBarIcon:({color,size})=><Ionicons name='calendar' size={size} color={color} />
     }} />
  </BottomTabs.Navigator>);
}

export default function App() {
  
  return (
    <>
      <StatusBar style='auto'/>
      <Provider store={store}>
      <NavigationContainer>
      <Stack.Navigator
        screenOptions={{
          headerStyle:{ backgroundColor:GlobalStyles.colors.primary500 },
          headerTintColor:'white'
        }}
      >
        <Stack.Screen 
        name="ExpensesOverview" 
        component={ExpensesOverview} 
        options={{headerShown:false   }}
        />
        <Stack.Screen 
        name="manageExpense" 
        component={ManageExpense}
        options={{
          presentation:'modal',
        }}
        />
      </Stack.Navigator>
      </NavigationContainer>
      </Provider>
    </>
  );
}

const styles = StyleSheet.create({
  appContainer: {
    flex:1,
   backgroundColor:'#fff',
   alignItems:'center',
   justifyContent:'center',
  },
 
 
});
