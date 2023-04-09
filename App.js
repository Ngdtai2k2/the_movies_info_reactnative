import * as React from 'react';
import Constants from './src/Constants/Constants';
import Home from './src/screens/Home';
import { NavigationContainer } from '@react-navigation/native';
import { createNativeStackNavigator } from '@react-navigation/native-stack';
import { headerStyle, headerMovieDetails, headerTVDetails, searchStyles, headerPersonDetails} from './src/Styles/HeaderOptions';
import MovieDetails from './src/components/MovieDetails';
import { StatusBar } from 'react-native';
import TVDetails from './src/components/TVDetails';
import SearchScreen from './src/components/SearchScreen';
import PersonDetails from './src/components/PersonDetails';
import VideoWebView from './src/components/VideoWebView';

const Stack = createNativeStackNavigator();

function App() {

  return (
    <NavigationContainer>
      <StatusBar barStyle="light-content" backgroundColor={Constants.baseColor}/>

      <Stack.Navigator screenOptions={{ headerTitleAlign: 'center' }}>
        <Stack.Screen name="Home" component={Home} options={headerStyle} />
        <Stack.Screen name="Search" component={SearchScreen} options={searchStyles} />
        <Stack.Screen name="movieDetails" component={MovieDetails} options={headerMovieDetails} />
        <Stack.Screen name="tvDetails" component={TVDetails} options={headerTVDetails} />
        <Stack.Screen name="personDetails" component={PersonDetails} options={headerPersonDetails}/>
        <Stack.Screen name="WebView" component={VideoWebView} />
      </Stack.Navigator> 
      
    </NavigationContainer>
  );
}

export default App;