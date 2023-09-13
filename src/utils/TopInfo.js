import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { IMAGE_POSTER_URL, IMAGE_PEOPLE } from '../service/config';
import { GET } from '../service/API';
import Styles from '../Styles/Styles';

export const TopInfo = (props) => {
  const [info, setInfo] = useState();

  useEffect(() => {
    const getInfo = async () => {
      const data = await GET(props.url);
      const deleteId = data[props.type].filter((item, index, self) =>
        index === self.findIndex((t) => t.id === item.id)
      );
      setInfo(deleteId);
    };

    getInfo();
  }, []);

  const InfoDisplay = ({ item }) => {
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
          {props.type === 'cast' ? (
            <Text style={Styles.characterName}>{item.character}</Text>
          ) : (
            <Text style={Styles.characterName}>{item.department}</Text>
          )}
        </TouchableOpacity>
      </View>
    );
  };

  return (
    <View>
      <Text style={Styles.headingLeft}>{props.title}</Text>
      <FlatList
        keyExtractor={item => item.id}
        data={info}
        renderItem={item => <InfoDisplay item={item.item} />}
        horizontal
      />
    </View>
  );
};
