import React from 'react';
import { Text, TouchableOpacity, View } from 'react-native';
import Styles from "../Styles/Styles";
import { ImageDisplay } from './ImageDisplay';

export const Display = ({ item, type, navigation }) => {
    const onPressHandler = () => {
        const route = type === 'movie' ? 'movieDetails' : 'tvDetails';
        const params = type === 'movie' ? { movieId: item.id } : { tv_id: item.id };
        navigation.push(route, params);
    };

    return (
        <TouchableOpacity onPress={onPressHandler} style={{ marginHorizontal: 10 }}>
            <View style={{ position: 'relative' }}>
                <ImageDisplay item={item} />
                <View style={Styles.circleContainer}>
                    <Text style={Styles.voteAverage}>
                        {Math.round(item.vote_average * 10)}%
                    </Text>
                </View>
            </View>
            <Text style={Styles.bottomTitle}>{type === 'movie' ? item.original_title : item.original_name}</Text>
            <Text style={Styles.releaseDate}>{type === 'movie' ? item.release_date : item.first_air_date}</Text>
        </TouchableOpacity>
    );
};
