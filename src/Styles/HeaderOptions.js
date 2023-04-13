import { EvilIcons } from '@expo/vector-icons';
import { MaterialCommunityIcons } from '@expo/vector-icons';
import Constants from '../Constants/Constants';
import { useNavigation } from '@react-navigation/native';

export const headerStyle = {
  title: 'Home',
  headerStyle: { backgroundColor: Constants.barColor, },
  headerTitleStyle: { color: Constants.textColorWhite, },
  headerRight: () => {// Lấy đối tượng navigation từ hook useNavigation
    const navigation = useNavigation(); 
    return (
      <EvilIcons name="search" size={35} style={{marginRight:10,}}
        color={Constants.textColorWhite} onPress={() => navigation.navigate('Search')} />);
  },
  headerTintColor: Constants.textColorWhite,
}
 
export const headerNav ={
  headerStyle: { backgroundColor: Constants.barColor, },
  headerTitleStyle: { color: Constants.textColorWhite, },
  headerTintColor: Constants.textColorWhite,
  headerRight: () => {// Lấy đối tượng navigation từ hook useNavigation
    const navigation = useNavigation(); 
    return (
      <MaterialCommunityIcons name="home-export-outline" size={25}
        color={Constants.textColorWhite} onPress={() => navigation.navigate('DrawerMenu')} />);
  },
}

export const headerMap = {
  title: 'Cinemas',
  headerStyle: { backgroundColor: Constants.barColor, },
  headerTitleStyle: { color: Constants.textColorWhite, },
  headerTintColor: Constants.textColorWhite,
}