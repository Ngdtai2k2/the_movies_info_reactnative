import { Ionicons } from '@expo/vector-icons';
import { EvilIcons } from '@expo/vector-icons';
import Constants from '../Constants/Constants';
import { useNavigation } from '@react-navigation/native';

export const headerStyle = {
  title: 'Movies',
  headerStyle: { backgroundColor: Constants.baseColor, },
  headerTitleStyle: { color: Constants.textColor, },
  headerLeft: () => <Ionicons name="menu" size={35}
    color={Constants.textColor} />,
  headerRight: () => {
    const navigation = useNavigation(); // Lấy đối tượng navigation từ hook useNavigation
    return (
      <EvilIcons name="search" size={35}
        color={Constants.textColor} onPress={() => navigation.navigate('Search')} />);
  },
}

export const headerMovieDetails = {
  title: 'Movie Details',
  headerStyle: { backgroundColor: Constants.baseColor, },
  headerTitleStyle: { color: Constants.textColor, },
  headerTintColor: 'white',
 
}

export const headerTVDetails = {
  title: 'TV Details',
  headerStyle: { backgroundColor: Constants.baseColor, },
  headerTitleStyle: { color: Constants.textColor, },
  headerTintColor: 'white',
}

export const searchStyles = {
  title: 'Search',
  headerStyle: { backgroundColor: Constants.baseColor, },
  headerTitleStyle: { color: Constants.textColor, },
  headerLeft: () => {
    const navigation = useNavigation();
    return (
      <Ionicons name="arrow-back" size={30}
        color={Constants.textColor} onPress={() => navigation.navigate('Home')} />
    );
  },
}

export const headerPersonDetails = {
  title: 'Person Details',
  headerStyle: { backgroundColor: Constants.baseColor, },
  headerTitleStyle: { color: Constants.textColor,},
  headerTintColor: 'white',
}