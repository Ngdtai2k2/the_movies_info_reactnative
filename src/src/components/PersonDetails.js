import React, { useState, useEffect } from 'react';
import { View, Image, Text, ScrollView, FlatList } from 'react-native';
import { GET } from '../service/API';
import Styles from '../Styles/Styles';
import { POSTER_IMAGE, IMAGE_PEOPLE } from '../service/config';
import { calculateAge } from '../utils/Helper';
import { MoviesDisplay, TVDisplay } from '../utils/Display';
import Constants from '../constants/Constants';
import { translateEnglishToVietnamese } from '../utils/Helper';

const PersonDetails = (props) => {
    const [details, setDetails] = useState();
    const [movies, setMovies] = useState();
    const [tv, setTV] = useState();
    const [translated, setTranslated] = useState('');

    useEffect(() => {
        const getDetails = async () => {
            const data = await GET(`/person/${props.route.params.person_id}`);
            const dataCredits = await GET(`/person/${props.route.params.person_id}/movie_credits`);
            const tvCredits = await GET(`/person/${props.route.params.person_id}/tv_credits`);
            setMovies(dataCredits.cast);
            setDetails(data);
            const deleteIdTV = tvCredits.cast.filter((item, index, self) =>
                index === self.findIndex((t) => t.id === item.id)
            );
            if (data.biography) {
                translateEnglishToVietnamese(data.biography, setTranslated);
              } else {
                setTranslated('Xin lỗi chúng tôi chưa có thông tin!');
              }
            setTV(deleteIdTV);
            // setTranslated(data.biography)
        };
        getDetails();
    }, []);

    return (
        <ScrollView style={Styles.sectionBg}>
            <View style={Styles.containerPerson}>
                {details && (
                    <>
                        <View style={Styles.rowPer}>
                            <View style={Styles.colPer}>
                                {details.profile_path ? (
                                    <Image source={{ uri: `${POSTER_IMAGE}${details.profile_path}` }} style={Styles.posterImage} />
                                ) : (
                                    <Image source={{ uri: `${IMAGE_PEOPLE}` }} style={Styles.posterImage} />
                                )
                                }

                            </View>
                            <View style={Styles.colPer}>
                                <Text style={Styles.namePerson}>{details.name}</Text>
                                <View style={Styles.hr}></View>
                                <Text style={Styles.textPerson}>Nghề nghiệp: {details.known_for_department}</Text>

                                <Text style={Styles.textPerson}>
                                    Ngày sinh: {details.birthday === null ? 'N/A' : details.birthday}
                                    {details.deathday === null && details.birthday !== null ? ` (${calculateAge(details.birthday, null)} tuổi)` : null}
                                </Text>
                                {details.deathday !== null ? (
                                    <Text style={Styles.textPerson}>
                                        Ngày mất: {details.deathday}
                                        ({calculateAge(details.birthday, details.deathday)} tuổi)
                                    </Text>
                                ) : null}

                                <Text style={Styles.textPerson}>Nơi sinh: {details.place_of_birth}</Text>
                                <Text style={Styles.textPerson}>Điểm phổ biến: {details.popularity}</Text>
                            </View>
                        </View><View style={Styles.hr}></View>
                        <View style={Styles.rowPer}>
                            <View style={Styles.colPer}>
                                <Text style={{ ...Styles.headingLeft, fontWeight: 'bold', color: Constants.textColor }}>TIỂU SỬ</Text>
                                <Text style={Styles.overview}>{translated}</Text>
                            </View>
                        </View>

                        <View style={Styles.hr}></View>
                        <Text style={{ ...Styles.headingLeft, fontWeight: 'bold', color: Constants.textColor }}>Tham gia vào</Text>

                        <View style={Styles.rowPer}>
                            <FlatList
                                keyExtractor={item => item.id.toString()}
                                data={movies}
                                horizontal
                                renderItem={item => MoviesDisplay(item, props)}
                            />
                        </View>

                        <View style={Styles.hr}></View>
                        <View style={Styles.rowPer}>
                            <FlatList
                                keyExtractor={item => item.id.toString()}
                                data={tv}
                                horizontal
                                renderItem={item => TVDisplay(item, props)}
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