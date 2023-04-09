import React from 'react';
import { ScrollView, View } from 'react-native';
import SliderMovies from '../components/SliderMovies';
import Styles from '../Styles/Styles';
import TrendingPeople from '../components/TrendingPeople';
import TrendingMovies from '../components/TrendingMovies';
import TrendingTV from '../components/TrendingTV';

const Home = (props) => {

  return (
    <ScrollView style={Styles.sectionBg}>
      <SliderMovies url="/discover/movie" navigation={props.navigation}></SliderMovies>
      <TrendingPeople title="Popular Peoples" url="/trending/person/day" navigation={props.navigation}></TrendingPeople>
      <View style={Styles.hr}></View>
      <TrendingMovies title="Popular Movies" url="/movie/upcoming" navigation={props.navigation}></TrendingMovies>
      <View style={Styles.hr}></View>
      <TrendingTV title="Popuplar TV" url="/tv/popular" navigation={props.navigation}></TrendingTV>
      <View style={Styles.hr}></View>
    </ScrollView>
  );
}

export default Home;
