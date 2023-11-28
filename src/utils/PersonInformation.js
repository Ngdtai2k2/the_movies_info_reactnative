import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { IMAGE_POSTER_URL, IMAGE_PERSON } from '../service/config';
import { GET } from '../service/API';
import Styles from '../Styles/Styles';

export const PersonInformation = (props) => {
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

  const InfoDisplay = ({ item, navigation, type }) => {
    const { id, profile_path, name, character, department } = item;
  
    const imageSource = profile_path ? { uri: `${IMAGE_POSTER_URL}${profile_path}` } : { uri: `${IMAGE_PERSON}` };
    const characterOrDepartment = type === 'cast' ? character : department;
  
    const handlePress = () => {
      navigation.push('personDetails', { person_id: id });
    };
  
    return (
      <View style={Styles.actorsContainer}>
        <TouchableOpacity onPress={handlePress}>
          <Image source={imageSource} style={Styles.actorsImage} />
          <Text style={Styles.actorName}>{name}</Text>
          <Text style={Styles.characterName}>{characterOrDepartment}</Text>
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
