import React, { useEffect, useState } from 'react';
import { View, FlatList, Text } from 'react-native';
import { GET } from '../service/API';
import Styles from "../Styles/Styles";
import { TVDisplay } from '../utils/Display';

const TrendingTV = (props) => {
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
                renderItem={item => TVDisplay(item, props)}
            />
        </View>
    );
};


export default TrendingTV;