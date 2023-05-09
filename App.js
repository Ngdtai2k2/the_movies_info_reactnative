import * as React from 'react';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { headerStyle, headerNav } from './src/Styles/HeaderOptions';
import MovieDetails from './src/components/MovieDetails';
import TVDetails from './src/components/TVDetails';
import SearchScreen from './src/components/SearchScreen';
import PersonDetails from './src/components/PersonDetails';
import Home from './src/screens/Home';
import Constants from './src/constants/Constants';
import BookTicketWV from './src/screens/BookTicketWV';
import Login from './src/screens/Login';
import Menu from './src/screens/Menu';
import SignUp from './src/screens/SignUp';

const Stack = createNativeStackNavigator();

function App() {
  return (
    // điều hướng
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={Constants.barColor} />
      <Stack.Navigator initialRouteName="Login" >
        <Stack.Screen name="Login" component={Login} options={{ headerShown: false }} />
        <Stack.Screen name="SignUp" component={SignUp} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={headerStyle} />
        <Stack.Screen name="Menu" component={Menu} options={headerStyle} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ ...headerNav, title: 'Tìm kiếm', }} />
        <Stack.Screen name="movieDetails" component={MovieDetails} options={{ ...headerNav, title: 'Tổng quan', }} />
        <Stack.Screen name="tvDetails" component={TVDetails} options={{ ...headerNav, title: 'Tổng quan', }} />
        <Stack.Screen name="personDetails" component={PersonDetails} options={{ ...headerNav, title: 'Tiểu sử', }} />
        <Stack.Screen name="BookTicketWV" component={BookTicketWV} options={{ ...headerNav, title: 'Đặt vé', }} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
