import React from 'react';
import { ScrollView, View } from 'react-native';
import { useNavigation } from '@react-navigation/native';
import SliderMovies from '../components/SliderMovies';
import TrendingPeople from '../components/TrendingPeople';
import TrendingMovies from '../components/TrendingMovies';
import TrendingTV from '../components/TrendingTV';
import { Ionicons } from '@expo/vector-icons';
import Styles from '../Styles/Styles';

// Props là cách truyền dữ liệu từ component cha xuống component con.
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
      <TrendingPeople title="Người nổi tiếng" url="/trending/person/day" navigation={props.navigation}></TrendingPeople>
      <View style={Styles.hr}></View>
      <TrendingMovies title="Phim thịnh hành" url="/trending/movie/day" navigation={props.navigation}></TrendingMovies>
      <View style={Styles.hr}></View>
      <TrendingTV title="Chương trình thịnh hành" url="/trending/tv/day" navigation={props.navigation}></TrendingTV>
      <View style={Styles.hr}></View>
    </ScrollView>
  );
}

export default Home;
