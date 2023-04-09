import React, { useState, useEffect } from 'react';
import { View, Image, Text, ScrollView, FlatList } from 'react-native';
import { GET } from '../service/API';
import Styles from "../Styles/Styles";
import { POSTER_IMAGE, IMAGE_PEOPLE} from '../service/config';
import { calculateAge } from '../utils/helper';
import { MoviesDisplay } from '../utils/Display';
import Constants from '../Constants/Constants';

const PersonDetails = (props) => {
    const [details, setDetails] = useState();
    const [movies, setMovies] = useState();
    useEffect(() => {
        const getDetails = async () => {
            const data = await GET(`/person/${props.route.params.person_id}`);
            const dataCredits = await GET(`/person/${props.route.params.person_id}/movie_credits`)

            setDetails(data);
            // console.log(dataCredits.cast);
            setMovies(dataCredits.cast);
        };
        getDetails();
    }, []);

    return (
        <ScrollView style={Styles.sectionBg}>
            <View style={Styles.containerPerson}>
                {/* kiểm tra giá trị details trc khi truy cập */}
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
                                <Text style={Styles.textPerson}>Profession: {details.known_for_department}</Text>

                                <Text style={Styles.textPerson}>
                                    {/* khi giá trị ngày sinh là null thì sẽ báo N/A */}
                                    Birthday: {details.birthday === null ? 'N/A' : details.birthday}
                                    {/* nếu có sẽ tính tuổi và thêm vào bên cạnh */}
                                    {details.deathday === null && details.birthday !== null ? ` (${calculateAge(details.birthday, null)} years old)` : null}
                                </Text>
                                {/* nếu có dữ liệu về ngày mất sẽ hiển thị */}
                                {details.deathday !== null ? (
                                    <Text style={Styles.textPerson}>Deathday: {details.deathday} ({calculateAge(details.birthday, details.deathday)} years old) </Text>
                                ) : null}

                                <Text style={Styles.textPerson}>Place Birth: {details.place_of_birth}</Text>
                                <Text style={Styles.textPerson}>Popularity: {details.popularity}</Text>
                            </View>
                        </View><View style={Styles.hr}></View>
                        <View style={Styles.rowPer}>
                            <View style={Styles.colPer}>
                                <Text style={{ ...Styles.headingLeft, fontWeight: 'bold', color: Constants.secondaryColor }}>OVERVIEW</Text>
                                <Text style={Styles.overview}>{details.biography}</Text>
                                <View style={Styles.hr}></View>
                                <Text style={{ ...Styles.headingLeft, fontWeight: 'bold', color: Constants.secondaryColor }}>Known for</Text>
                            </View>
                        </View>
                        <View style={Styles.rowPer}>
                            <FlatList
                                keyExtractor={item => item.id}
                                data={movies}
                                horizontal
                                renderItem={item => MoviesDisplay(item, props)}
                            />
                        </View><View style={Styles.hr}></View>
                    </>
                )}
            </View>
        </ScrollView>
    );
};

export default PersonDetails;