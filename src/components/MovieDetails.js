import { View, Text, Image, ScrollView, TouchableOpacity, Linking } from "react-native";
import React, { useEffect, useState } from "react";
import { GET } from "../service/API";
import Styles from "../Styles/Styles";
import { VIDEO_YOUTUBE } from "../service/config";
import { AntDesign } from "@expo/vector-icons";
import TrendingMovies from './TrendingMovies';
import Constants from '../Constants/Constants';
import { getRandomKey } from '../utils/helper';
import TopCast from '../utils/TopCast'
import { getImageSource } from "../utils/ImageDisplay";

const MovieDetails = (props) => {
  const [details, setDetails] = useState();
  //
  const [keyTrailer, setTrailer] = useState();
  const [keyClip, setClip] = useState();
  const [keyTeaser, setTeaser] = useState();
  const [keyFeaturette, setFeaturette] = useState();
  //

  useEffect(() => {
    const getDetails = async () => {
      const data = await GET(`/movie/${props.route.params.movieId}`);
      const dataVideo = await GET(`/movie/${props.route.params.movieId}/videos`);

      setDetails(data);

      getRandomKey(dataVideo, "Trailer", setTrailer);
      getRandomKey(dataVideo, "Clip", setClip);
      getRandomKey(dataVideo, "Teaser", setTeaser);
      getRandomKey(dataVideo, "Featurette", setFeaturette);
    };
    getDetails();
  }, []);
  //  console.log(language)

  // lấy thể loại phim
  const genres = () => {
    // map sẽ thực hiện lặp qua từng phần tử của mảng
    // trả về một mảng mới chứa các giá trị mới
    return details.genres.map((genres, index) => (
      <View key={index} style={Styles.genreContainer}>
        <Text style={Styles.genre}>{genres.name}</Text>
      </View>
    ));
  };
  // lấy ngôn ngữ
  const language = () => {
    return details.spoken_languages.map((spoken_language, index) => (
      <View key={index}>
        <Text style={{ ...Styles.textDetails, fontSize: 15, }}>
          {spoken_language.english_name}
        </Text>
      </View>
    ));
  };

  const handlePressTrailer = () => {
    props.navigation.navigate("WebView", {
      url: `${VIDEO_YOUTUBE}${keyTrailer}`,
    });
  };
  const handlePressClip = () => {
    props.navigation.navigate("WebView", {
      url: `${VIDEO_YOUTUBE}${keyClip}`
    });
  };
  const handlePressTeaser = () => {
    props.navigation.navigate("WebView", {
      url: `${VIDEO_YOUTUBE}${keyTeaser}`,
    });
  };
  const handlePressKeyFea = () => {
    props.navigation.navigate("WebView", {
      url: `${VIDEO_YOUTUBE}${keyFeaturette}`,
    });
  };

  return (
    <ScrollView style={Styles.sectionBg}>
      <View>
        {/* kiểm tra giá trị details trc khi truy cập */}
        {details && (
          <>
            <Image
              source={{ uri: getImageSource(details) }}
              style={Styles.imageBg}/>
            <Text style={Styles.detailsTitle}>{details.original_title}</Text>

            {/* kiểm tra detail.homepage */}
            {details.homepage ? (
              <View style={Styles.linkContainer}>
                <TouchableOpacity
                  onPress={() => {
                    Linking.openURL(details.homepage);
                  }}>
                  <AntDesign name="link" size={20} color="black" style={{ marginLeft: 3 }} />
                </TouchableOpacity>
              </View>
            ) : null}
            {/* tagline */}
            <Text style={Styles.tagLine}>{details.tagline}</Text>

            {/* tổng quan */}
            <Text style={Styles.headingLeft}>OVERVIEW</Text>
            <Text style={Styles.overview}>{details.overview}</Text>
            <View style={Styles.hr}></View>
            {/* row 1 */}
            <View style={Styles.detailsContainer}>
              <View>
                {/* Ngôn ngữ */}
                <Text style={Styles.headingLeft}>Score</Text>
                <Text style={{ ...Styles.textDetails, fontSize: 15 }}>
                  {Math.round(details.vote_average * 10)}%
                </Text>
              </View>
              <View>
                <Text style={Styles.headingLeft}>Duration</Text>
                <Text style={Styles.textDetails}>
                  {details.runtime} minutes
                </Text>
              </View>
              {/* trạng thái phát hành */}
              {/* nếu trạng thái trả về là Released sẽ hiển thị thêm ngày */}
              <View>
                <Text style={Styles.headingLeft}>Status</Text>
                <Text style={Styles.textDetails}>
                  {details.status === "Released"
                    ? `Released: ${details.release_date}`
                    : details.status}
                </Text>
              </View>
            </View>
            <View style={Styles.hr}></View>
            {/* row 2 */}
            <View style={Styles.detailsContainer}>
              <View>
                {/* ngân sách */}
                <Text style={Styles.headingLeft}>Budget</Text>
                <Text style={Styles.textDetails}>
                  {/* kiểm tra ngân sách và hiển thị null khi =0 */}
                  {details.budget > 0
                    ? details.budget.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                    : "unknown"}
                </Text>
              </View>
              <View>
                {/* doanh thu */}
                <Text style={Styles.headingLeft}>Revenue</Text>
                <Text style={Styles.textDetails}>
                  {/* kiểm tra doanh thu và hiển thị null khi =0 */}
                  {details.revenue > 0
                    ? details.revenue.toLocaleString("en-US", {
                      style: "currency",
                      currency: "USD",
                    })
                    : "unknown"}
                </Text>
              </View>
            </View>

            {/* row 3 */}
            {/* Ngôn ngữ */}
            <View style={Styles.hr}></View>
            <Text style={Styles.headingLeft}>Language</Text>
            <Text style={{ display: "flex", flexDirection: "row", }}>
              {language()}
            </Text>

            {/* row 4 */}
            <View style={Styles.hr}></View>
            <Text style={Styles.headingLeft}>Genres</Text>
            <Text style={{ display: "flex", flexDirection: "row", }}>
              {genres()}
            </Text>

            {/* row 5 video  */}
            <View style={Styles.hr}></View>
            <Text style={Styles.headingLeft}>Video</Text>
            <Text style={{ fontSize: 13, color: Constants.textColor, marginLeft: 15, marginBottom: 10, }}>Click to view</Text>
            <View style={{ display: "flex", flexDirection: "row" }}>
              <TouchableOpacity onPress={handlePressTrailer}>
                <Text style={Styles.textDetails}>Trailer</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressTeaser}>
                <Text style={Styles.textDetails}>Teaser</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressKeyFea}>
                <Text style={Styles.textDetails}>Featurette</Text>
              </TouchableOpacity>
              <TouchableOpacity onPress={handlePressClip}>
                <Text style={Styles.textDetails}>Clip</Text>
              </TouchableOpacity>
            </View>
            {/* row 6 */}
            <View style={Styles.hr}></View>
            <View>
              <TopCast navigation={props.navigation}
                title="Top Billed Cast"
                url={`/movie/${props.route.params.movieId}/credits`} />
            </View>
            {/* row 7 */}
            <View style={Styles.hr}></View>
            <TrendingMovies
              navigation={props.navigation}
              title="Similar Movies"
              url={`/movie/${props.route.params.movieId}/similar`} />
            <View style={Styles.hr}></View>
          </>
        )}
      </View>
    </ScrollView>
  );
};
export default MovieDetails;