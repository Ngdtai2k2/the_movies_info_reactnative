import { EvilIcons, Ionicons } from '@expo/vector-icons';
import Constants from '../constants/Constants';
import { useNavigation } from '@react-navigation/native';

export const headerStyle = {
  headerStyle: { 
    backgroundColor: Constants.barColor,headerTitle: null,  },
  headerTitleStyle: { color: Constants.textColorWhite},
  headerRight: () => {// Lấy đối tượng navigation từ hook useNavigation
    const navigation = useNavigation(); 
    return (
      <EvilIcons name="search" size={35} style={{marginRight:0,}}
        color={Constants.textColorWhite} onPress={() => navigation.navigate('Search')} />);
  },
  headerTintColor: Constants.textColorWhite,
}
export const headerNav = {
  headerStyle: { 
    backgroundColor: Constants.barColor},
  headerTitleStyle: { color: Constants.textColorWhite},
  headerTintColor: Constants.textColorWhite,
  headerRight: () => {// Lấy đối tượng navigation từ hook useNavigation
    const navigation = useNavigation(); 
    return (
      <Ionicons name="home-sharp" size={30} style={{marginRight:0,}}
        color={Constants.textColorWhite} onPress={() => navigation.navigate('Home')} />);
  },
}

export const headerMap = {
  title: 'Cinemas',
  headerStyle: { backgroundColor: Constants.barColor, },
  headerTitleStyle: { color: Constants.textColorWhite, },
  headerTintColor: Constants.textColorWhite,
}