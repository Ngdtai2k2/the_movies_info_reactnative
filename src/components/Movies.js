import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { GET } from '../service/API';
import Styles from '../Styles/Styles';
import { Display } from '../utils/Display';

const Movies = (props) => {
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
                renderItem={({ item }) => (
                  <Display
                    item={item}
                    type="movie"
                    navigation={props.navigation}
                  />
                )}
            />
        </View>
    );
};


export default Movies;
