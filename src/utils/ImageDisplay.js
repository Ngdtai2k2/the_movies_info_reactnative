import React from 'react';
import { Image } from 'react-native';
import { POSTER_IMAGE, IMAGE_URL, IMAGE_POSTER_URL } from '../service/config';
import Styles from "../Styles/Styles";

export const ImageDisplay = ({ item }) => {
    return (
        <>
            <Image
                source={{
                    uri:
                        item.poster_path ? `${POSTER_IMAGE}${item.poster_path}` :
                            item.profile_path ? `${POSTER_IMAGE}${item.profile_path}` :
                                item.backdrop_path ? `${POSTER_IMAGE}${item.backdrop_path}` :
                                    `${IMAGE_URL}`
                }}
                style={Styles.posterImage}
            />

        </>
    );
};

export const getImageSource = (details) => {
    return details.backdrop_path
        ? `${IMAGE_POSTER_URL}${details.backdrop_path}`
        : details.poster_path
            ? `${IMAGE_POSTER_URL}${details.poster_path}`
            : `${IMAGE_URL}`;
};