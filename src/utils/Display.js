import { Text, TouchableOpacity } from 'react-native';
import Styles from "../Styles/Styles";
import { ImageDisplay } from './ImageDisplay';

export const MoviesDisplay = ({ item }, props) => {
    return (
        <TouchableOpacity
            onPress={() => { props.navigation.push('movieDetails', { movieId: item.id }); }}
            style={{ marginHorizontal: 10 }}>
            <ImageDisplay item={item} />
            <Text style={Styles.bottomTitle}>{item.original_title}</Text>
        </TouchableOpacity>
    );
};

export const TVDisplay = ({ item }, props) => {
    return (
        <TouchableOpacity
            onPress={() => {props.navigation.push('tvDetails', { tv_id: item.id });}}
            style={{ marginHorizontal: 10 }}>
           <ImageDisplay item={item} />
            <Text style={Styles.bottomTitle}>{item.original_name}</Text>
        </TouchableOpacity>
    );
};