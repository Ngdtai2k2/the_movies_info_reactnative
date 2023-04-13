import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { GET } from '../service/API';
import Styles from "../Styles/Styles";
import { MoviesDisplay } from '../utils/Display';

const TrendingMovies = (props) => {
    const [movies, setMovies] = useState();

    useEffect(() => {
        const getMovies = async () => {
            const data = await GET(props.url);
            setMovies(data.results);
        };

        getMovies();
    }, []);

    return (
        <View>
            <Text style={Styles.headingLeft}>{props.title}</Text>
            <FlatList
                keyExtractor={item => item.id}
                data={movies}
                horizontal
                renderItem={item => MoviesDisplay(item, props)}
            />
        </View>
    );
};


export default TrendingMovies;
