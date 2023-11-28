import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { GET } from '../service/API';
import Styles from '../Styles/Styles';
import { Display } from '../utils/Display';

const TiviShow = (props) => {
    const [tv, setTV] = useState();

    useEffect(() => {
        const getTV = async () => {
            const data = await GET(props.url);
            setTV(data.results);
        };

        getTV();
    }, []);


    return (
        <View>
            <Text style={Styles.headingLeft}>{props.title}</Text>
            <FlatList
                keyExtractor={item => item.id}
                data={tv}
                horizontal
                renderItem={({ item }) => (
                  <Display
                    item={item}
                    type="tv"
                    navigation={props.navigation}
                  />
                )}
            />
        </View>
    );
};

export default TiviShow;