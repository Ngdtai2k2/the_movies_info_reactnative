import * as React from 'react';
import 'react-native-gesture-handler';
import { StatusBar } from 'react-native';
import { NavigationContainer } from '@react-navigation/native';
import { createDrawerNavigator } from '@react-navigation/drawer';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { headerStyle, headerNav, headerMap } from './src/Styles/HeaderOptions';
import MovieDetails from './src/components/MovieDetails';
import TVDetails from './src/components/TVDetails';
import SearchScreen from './src/components/SearchScreen';
import PersonDetails from './src/components/PersonDetails';
import Home from './src/screens/Home';
import Constants from './src/Constants/Constants';
import FindCinema from './src/screens/FindCinema';
import BookTicketWV from './src/screens/BookTicketWV';

const Drawer = createDrawerNavigator();
const Stack = createNativeStackNavigator();

function DrawerMenu() {
  return (
    <Drawer.Navigator useLegacyImplementation
      screenOptions={{
        drawerActiveBackgroundColor: Constants.barColor,
        drawerActiceTintColor: Constants.textColorWhite,
        drawerLabelStyle: {
          fontSize: 18,
        }
      }}>
      <Stack.Screen name="Home" component={Home} options={headerStyle}/>
      <Stack.Screen name="FindCinema" component={FindCinema} options={headerMap} />
    </Drawer.Navigator>
  );
}

function App() {
  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={Constants.barColor} />
      <Stack.Navigator>
        <Stack.Screen name="DrawerMenu" component={DrawerMenu} options={{ headerShown: false }} />
        <Stack.Screen name="Home" component={Home} options={headerStyle} />
        <Stack.Screen name="Search" component={SearchScreen} options={{ ...headerNav, title: 'Search', }} />
        <Stack.Screen name="movieDetails" component={MovieDetails} options={{ ...headerNav, title: 'Overview Movie', }} />
        <Stack.Screen name="tvDetails" component={TVDetails} options={{ ...headerNav, title: 'Overview TV show', }} />
        <Stack.Screen name="personDetails" component={PersonDetails} options={{ ...headerNav, title: 'Overview Person', }} />
        <Stack.Screen name="BookTicketWV" component={BookTicketWV} options={{ ...headerNav, title: 'Buy Ticket', }}  />
      </Stack.Navigator>
    </NavigationContainer>
  );
}

export default App;
