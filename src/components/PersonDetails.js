import React, { useState, useEffect } from "react";
import { View, Image, Text, ScrollView, FlatList } from "react-native";
import { GET } from "../service/API";
import Styles from "../Styles/Styles";
import { POSTER_IMAGE, IMAGE_PERSON } from "../service/config";
import { calculateAge } from "../utils/Helper";
import { Display } from "../utils/Display";
import Constants from "../constants/Constants";
import { translateEnglishToVietnamese } from "../utils/Helper";
import Loading from "./Loading";

const PersonDetails = (props) => {
  const [details, setDetails] = useState();
  const [movies, setMovies] = useState();
  const [tv, setTV] = useState();
  const [translated, setTranslated] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const getDetails = async () => {
      try {
        setLoading(true);

        const [data, dataCredits, tvCredits] = await Promise.all([
          GET(`/person/${props.route.params.person_id}`),
          GET(`/person/${props.route.params.person_id}/movie_credits`),
          GET(`/person/${props.route.params.person_id}/tv_credits`),
        ]);

        const uniqueMovies = removeDuplicates(dataCredits.cast, "id");
        const uniqueTV = removeDuplicates(tvCredits.cast, "id");

        setMovies(uniqueMovies);
        setDetails(data);

        if (data.biography) {
          translateEnglishToVietnamese(data.biography, setTranslated);
        } else {
          setTranslated("Xin lỗi chúng tôi chưa có thông tin!");
        }
        setTV(uniqueTV);
      } catch (error) {
        alert("Có lỗi xảy ra. Vui lòng thử lại sau.");
      } finally {
        setLoading(false);
      }
    };
    getDetails();
  }, [props.route.params.person_id]);

  const removeDuplicates = (array, key) => {
    return array.filter(
      (item, index, self) =>
        index === self.findIndex((t) => t[key] === item[key])
    );
  };

  if (loading) {
    return <Loading></Loading>;
  }

  return (
    <ScrollView style={Styles.sectionBg}>
      <View style={Styles.containerPerson}>
        {details && (
          <>
            <View style={Styles.rowPer}>
              <View style={Styles.colPer}>
                {details.profile_path ? (
                  <Image
                    source={{ uri: `${POSTER_IMAGE}${details.profile_path}` }}
                    style={Styles.posterImage}
                  />
                ) : (
                  <Image
                    source={{ uri: `${IMAGE_PERSON}` }}
                    style={Styles.posterImage}
                  />
                )}
              </View>
              <View style={Styles.colPer}>
                <Text style={Styles.namePerson}>{details.name}</Text>
                <View style={Styles.hr}></View>
                <Text style={Styles.textPerson}>
                  Nghề nghiệp: {details.known_for_department}
                </Text>

                <Text style={Styles.textPerson}>
                  Ngày sinh:{" "}
                  {details.birthday === null ? "N/A" : details.birthday}
                  {details.deathday === null && details.birthday !== null
                    ? ` (${calculateAge(details.birthday, null)} tuổi)`
                    : null}
                </Text>
                {details.deathday !== null ? (
                  <Text style={Styles.textPerson}>
                    Ngày mất: {details.deathday}(
                    {calculateAge(details.birthday, details.deathday)} tuổi)
                  </Text>
                ) : null}

                <Text style={Styles.textPerson}>
                  Nơi sinh: {details.place_of_birth}
                </Text>
                <Text style={Styles.textPerson}>
                  Điểm phổ biến: {details.popularity}
                </Text>
              </View>
            </View>
            <View style={Styles.hr}></View>
            <View style={Styles.rowPer}>
              <View style={Styles.colPer}>
                <Text
                  style={{
                    ...Styles.headingLeft,
                    fontWeight: "bold",
                    color: Constants.textColor,
                  }}
                >
                  TIỂU SỬ
                </Text>
                <Text style={Styles.overview}>{translated}</Text>
              </View>
            </View>

            <View style={Styles.hr}></View>
            <Text
              style={{
                ...Styles.headingLeft,
                fontWeight: "bold",
                color: Constants.textColor,
              }}
            >
              Tham gia vào
            </Text>

            <View style={Styles.rowPer}>
              <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={movies}
                horizontal
                renderItem={({ item }) => (
                  <Display
                    item={item}
                    type="movie"
                    navigation={props.navigation}
                  />
                )}
              />
            </View>

            <View style={Styles.hr}></View>
            <View style={Styles.rowPer}>
              <FlatList
                keyExtractor={(item) => item.id.toString()}
                data={tv}
                horizontal
                renderItem={({ item }) => (
                  <Display
                    item={item}
                    type="tv"
                    navigation={props.navigation}
                  />
                )}
              />
            </View>
            <View style={Styles.hr}></View>
          </>
        )}
      </View>
    </ScrollView>
  );
};

export default PersonDetails;
