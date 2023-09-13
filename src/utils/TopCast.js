import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { IMAGE_POSTER_URL, IMAGE_PEOPLE} from '../service/config';
import { GET } from '../service/API';
import Styles from '../Styles/Styles';

const TopCast = (props) => {
  const [cast, setCast] = useState();

  useEffect(() => {
    const getCast = async () => {
      const data = await GET(props.url);
      setCast(data.cast);
      // console.log(cast);
    };

    getCast();
  }, []);


  
  return (
    <View>
      <Text style={Styles.headingLeft}>{props.title}</Text>
      <FlatList
        keyExtractor={item => item.id}
        data={cast}
        renderItem={item => CastDisplay(item, props)}
        horizontal
      />
    </View>
  );
}
const CastDisplay = ({ item }, props) => {
  return (
    <View style={Styles.actorsContainer}>
      <TouchableOpacity onPress={() => { props.navigation.push('personDetails', { person_id: item.id }); }}>
        {
          item.profile_path ? (
            <Image source={{ uri: `${IMAGE_POSTER_URL}${item.profile_path}` }} style={Styles.actorsImage} />
          ) : (
            <Image source={{ uri: `${IMAGE_PEOPLE}` }} style={Styles.actorsImage} />
          )
        }
        <Text style={Styles.actorName}>{item.name}</Text>
        <Text style={Styles.characterName}>{item.character}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default TopCast;
