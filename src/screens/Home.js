import React from 'react';
import { Ionicons } from '@expo/vector-icons';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SliderMovies from '../components/SliderMovies';
import Person from '../components/Person';
import Movies from '../components/Movies';
import TiviShow from '../components/TiviShow';
import Styles from '../Styles/Styles';

const Home = (props) => {
  const navigation = useNavigation();
  React.useLayoutEffect(() => {
    navigation.setOptions({
      headerLeft: () => (
        <Ionicons name="menu-outline" size={35} color="white" style={{ marginLeft: 0 }}
          onPress={() => navigation.navigate('Menu')} />
      ),
    });
  }, [navigation]);

  return (
    <ScrollView style={Styles.sectionBg}>
      <SliderMovies url="/discover/movie" navigation={props.navigation}></SliderMovies>
      <Person title="Người nổi tiếng" url="/trending/person/day" navigation={props.navigation}></Person>
      <View style={Styles.hr}></View>
      <Movies title="Phim thịnh hành" url="/trending/movie/day" navigation={props.navigation}></Movies>
      <View style={Styles.hr}></View>
      <TiviShow title="Chương trình thịnh hành" url="/trending/tv/day" navigation={props.navigation}></TiviShow>
      <View style={Styles.hr}></View>
    </ScrollView>
  );
}

export default Home;
