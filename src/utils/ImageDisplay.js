import React from 'react';
import { Image } from 'react-native';
import { POSTER_IMAGE, IMAGE_URL, IMAGE_POSTER_URL } from '../service/config';
import Styles from "../Styles/Styles";

const getImageUri = (path) => path ? `${POSTER_IMAGE}${path}` : `${IMAGE_URL}`;

export const ImageDisplay = ({ item }) => (
    <Image
        source={{ uri: getImageUri(item.poster_path || item.profile_path || item.backdrop_path) }}
        style={Styles.posterImage}
    />
);

export const getImageSource = (details) => `${IMAGE_POSTER_URL}${details.backdrop_path || details.poster_path || ''}`;
