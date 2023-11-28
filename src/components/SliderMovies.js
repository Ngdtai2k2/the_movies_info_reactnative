import React, { useEffect, useState } from 'react';
import { SliderBox } from 'react-native-image-slider-box';
import { View } from 'react-native';
import { GET } from '../service/API';
import { IMAGE_POSTER_URL } from '../service/config'
import Constants from '../constants/Constants';

const DiscoverMovies = (props) => {
    const [movies, setMovies] = useState([]);
    const [images, setImage] = useState([]);
    
    useEffect(() => {
        const getMovies = async () => {
            const response = await GET(props.url);
            setMovies(response.results);
            const images = response.results.map((data) => `${IMAGE_POSTER_URL}${data.backdrop_path}`);

            let backImages = [];
            for (let i = 0; i < 20; ++i) {
                backImages = [...backImages, images[i]];
            }
            setImage(backImages);
        };

        getMovies();
    }, []);

    return (
        <View>
            <SliderBox
                images={images}
                dotColor={Constants.baseColor}
                onCurrentImagePressed=
                {index=> props.navigation.navigate('movieDetails', {movieId: movies[index].id})}
                dotStyle={{width: 0,height: 0,}}
                autoplayInterval={8000} autoplay circleLoop />
        </View>
    );
};

export default DiscoverMovies;
