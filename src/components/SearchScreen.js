import React, { useRef, useState } from 'react';
import { View, TextInput, TouchableOpacity, FlatList, Text, ScrollView } from 'react-native';
import axios from 'axios';
import Styles from '../Styles/Styles';
import { BASE_URL, API_KEY } from '../service/config';
import Constants from '../Constants/Constants';
import { ImageDisplay } from '../utils/ImageDisplay';
import { EvilIcons } from '@expo/vector-icons';

const SearchScreen = props => {
    const [searchTerm, setSearchTerm] = useState('');
    const [searchResults, setSearchResults] = useState([]);

    const flatListRef = useRef(null);

    const handleSearch = async () => {
        if (searchTerm.trim() === '') {
            //thông báo khi ng dùng chưa nhập kí tự nào
            alert('Please enter a search keyword.');
        } else {
            const response = await axios.get(`${BASE_URL}/search/multi?api_key=${API_KEY}&query=${searchTerm}`);
            if (response.data.results.length === 0) {
                //thông báo khi ko có kết quả
                alert("There are no movies that matched your query.");
            } else {
                setSearchResults(response.data.results);
                flatListRef.current.scrollToOffset({ offset: 0 }); //cuộn lên đầu trang
                // console.log(response.data.results);
            }
        }
    };

    const renderItem = ({ item }) => {
        const handleItemClick = () => {
            // console.log('ID of the item:', item.id);
            item.media_type === 'tv' ?
                props.navigation.navigate('tvDetails', { tv_id: item.id })
                : item.media_type === 'movie' ?
                    props.navigation.navigate('movieDetails', { movieId: item.id })
                    : item.media_type === 'person' ?
                        props.navigation.navigate('personDetails', { person_id: item.id })
                        : null
        };

        return (
            <ScrollView>
                <TouchableOpacity onPress={handleItemClick} style={Styles.container}>
                    <View style={Styles.colRow_1}>
                        <ImageDisplay item={item} />
                    </View>
                    <View style={Styles.hr}></View>

                    <View style={Styles.colRow_2}>
                        {item.original_title ? (
                            <Text style={{ ...Styles.resultsTitle, fontWeight: 'bold', fontSize: 18, marginBottom: 5, }}>
                                {item.original_title}
                            </Text>)
                            : (
                                <Text style={{ ...Styles.resultsTitle, fontWeight: 'bold', fontSize: 18, marginBottom: 5, }}>
                                    {item.original_name}
                                </Text>
                            )
                        }

                        {item.original_language ? (
                            <Text style={{ ...Styles.resultsTitle, color: Constants.fadedColor, marginBottom: 5 }}>
                                {item.release_date} ({item.original_language})
                            </Text>) : (
                            <Text style={{ ...Styles.resultsTitle, color: Constants.fadedColor, marginBottom: 5 }}>
                                {item.known_for_department}
                            </Text>
                        )
                        }
                        <Text
                            style={{ ...Styles.resultsTitle, fontSize: 13, marginBottom: 5 }}
                            numberOfLines={5}
                            ellipsizeMode="tail">
                            {item.overview}
                        </Text>
                        {
                            item.vote_average ? (
                                <Text style={{ ...Styles.resultsTitle, color: Constants.secondaryColor, fontStyle: 'italic' }}>
                                    User Score: {Math.round(item.vote_average * 10)}%</Text>
                            ) : null
                        }
                        {item.vote_count ? (
                            <Text style={{ ...Styles.resultsTitle, color: Constants.secondaryColor, fontStyle: 'italic' }}>
                                Vote Count: {item.vote_count}</Text>)
                            : (
                                <Text style={{ ...Styles.resultsTitle, color: Constants.secondaryColor, fontStyle: 'italic' }}>
                                    Popularity: {item.popularity}</Text>
                            )
                        }

                    </View>
                </TouchableOpacity>
            </ScrollView>
        );
    };

    return (
        <View style={Styles.sectionBg}>
            <View style={Styles.searchContainer}>
                <TextInput
                    style={Styles.input}
                    value={searchTerm}
                    onChangeText={setSearchTerm}
                    placeholder="Search movies..."
                    placeholderTextColor="#333"
                />
                <TouchableOpacity style={Styles.button} onPress={handleSearch}>
                <EvilIcons name="search" style={Styles.buttonText}/>
                </TouchableOpacity>
            </View>

            <FlatList
                ref={flatListRef} // Truyền ref vào FlatList
                data={searchResults}
                keyExtractor={(item) => item.id.toString()}
                renderItem={renderItem}
            />

        </View>
    );
};

export default SearchScreen;
