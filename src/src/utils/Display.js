import { Text, TouchableOpacity, View } from 'react-native';
import Styles from "../Styles/Styles";
import { ImageDisplay } from './ImageDisplay';

export const MoviesDisplay = ({ item }, props) => {
    return (
        <TouchableOpacity
            onPress={() => { props.navigation.push('movieDetails', { movieId: item.id }); }}
            style={{ marginHorizontal: 10 }}>
            <View style={{ position: 'relative' }}>
                <ImageDisplay item={item} />
                <View style={Styles.circleContainer}>
                    <Text style={Styles.voteAverage}>
                        {/* làm tròn */}
                        {Math.round(item.vote_average * 10)}%
                    </Text>
                </View>
            </View>
            <Text style={Styles.bottomTitle}>{item.original_title}</Text>
            <Text style={Styles.releaseDate}>{item.release_date}</Text>
        </TouchableOpacity>
    );
};

export const TVDisplay = ({ item }, props) => {
    return (
        <TouchableOpacity
            onPress={() => { props.navigation.push('tvDetails', { tv_id: item.id }); }}
            style={{ marginHorizontal: 10 }}>
            <View style={{ position: 'relative' }}>
                <ImageDisplay item={item} />
                <View style={Styles.circleContainer}>
                    <Text style={Styles.voteAverage}>
                        {/* làm tròn */}
                        {Math.round(item.vote_average * 10)}%
                    </Text>
                </View>
            </View>
            <Text style={Styles.bottomTitle}>{item.original_name}</Text>
            <Text style={Styles.releaseDate}>{item.first_air_date}</Text>
        </TouchableOpacity>
    );
};