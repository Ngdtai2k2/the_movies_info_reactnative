import React, { useEffect, useState } from 'react';
import { View, FlatList, Text, TouchableOpacity, Image } from 'react-native';
import { IMAGE_POSTER_URL, IMAGE_URL  } from '../service/config';
import { GET } from '../service/API';
import Styles from '../Styles/Styles';

const Person = (props) => {
  const [people, setPeople] = useState();

  useEffect(() => {
    const getPeople = async () => {
      const data = await GET(props.url);
      setPeople(data.results);
    };

    getPeople();
  }, []);

  return (
    <View>
      <Text style={Styles.headingLeft}>{props.title}</Text>
      <FlatList
        keyExtractor={item => item.id}
        data={people}
        renderItem={item => PeopleDisplay(item, props)}
        horizontal
      />
    </View>
  );
};

const PeopleDisplay = ({ item }, props) => {
  return (
    <View style={Styles.actorsContainer}>
      <TouchableOpacity onPress={() => { props.navigation.push('personDetails', { person_id: item.id }); }}>
        {item.profile_path ? (
          <Image source={{ uri: `${IMAGE_POSTER_URL}${item.profile_path}` }} style={Styles.actorsImage} />)
          : (
            <Image source={{ uri: `${IMAGE_URL}` }} style={Styles.actorsImage} />
          )
        }
        <Text style={Styles.actorName}>{item.name}</Text>
      </TouchableOpacity>
    </View>
  );
};

export default Person;